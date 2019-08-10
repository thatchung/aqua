import moment from 'moment'

async function convert(value, type, mode, converter) {
    if (mode === 'read' && value.toString().trim() === '')
        return null;

    if (converter)
        return await converter.bind(this)(value, mode);

    if (type === 'number') {
        if (mode === 'read')
            return Number(value);
        return value.toString();
    }

    if (type === 'boolean') {
        if (mode === 'read') {
            if (typeof value === 'string')
                return value.trim().toLowerCase() === 'true';
            return value === true || value === 1
        }
        return value.toString();
    }

    if (type === 'datetime') {
        let m;

        if (mode === 'read')
        {
            m = moment.unix(value);
            if (!m.isValid())
                return null;
            return m.toDate();
        }

        m = moment(value);
        if (!m.isValid())
            return null;
        return m.unix();
    }

    return value;
}

export default {
    install(Vue) {
        Vue.options = Vue.util.mergeOptions(Vue.options, this.mixin);
    },

    mixin: {
        mounted: async function () {
            this._urlSyncs = [];
            let tasks = [];

            let params = this.$options.url;
            if (typeof params === 'function')
                params = params();
            if (!params || typeof params !== 'object') {
                if (this.$options.loaded)
                    await this.$options.loaded.bind(this)();
                return;
            }

            for (let key in params) {
                if (typeof params[key] === 'string')
                    params[key] = {type: params[key]};
                else if (typeof params[key] === 'function')
                    params[key] = {converter: params[key]};

                if (typeof params[key].addHistory !== 'boolean')
                    params[key].addHistory = false;
                if (typeof params[key].readOnly !== 'boolean')
                    params[key].readOnly = false;
                if (!params[key].type || !['string', 'number', 'boolean', 'datetime', 'custom'].includes(params[key].type))
                    params[key].type = 'string';
                if (!params[key].hasOwnProperty('name'))
                    params[key].name = key;

                if (this.$route.query.hasOwnProperty(params[key].name)) {
                    let task = convert.bind(this)(this.$route.query[params[key].name], params[key].type, 'read', params[key].converter);
                    tasks.push(task);
                    task.then(val => {
                        if (val) this[key] = val;
                    });
                }

                this.$root.$on(`url_${params[key].name}_changed`, async val => {
                    if (val === await convert.bind(this)(this[key], params[key].type, 'write', params[key].converter))
                        return;
                    this[key] = await convert.bind(this)(val, params[key].type, 'read', params[key].converter);
                });

                if (!params[key].readOnly) {
                    this._urlSyncs.push(this.$watch(key, async (newValue, oldValue) => {
                        let newVal = await convert.bind(this)(newValue, params[key].type, 'write', params[key].converter);
                        let oldVal = await convert.bind(this)(oldValue, params[key].type, 'write', params[key].converter);

                        let query = this.$route.query;
                        query[params[key].name] = newVal;
                        query = $.param(query);
                        query = `${this.$route.path}?${query}`;

                        if (params[key].addHistory)
                            history.pushState(null, null, query);
                        else
                            history.replaceState(null, null, query);

                        if (oldVal !== newVal)
                            this.$root.$emit(`url_${params[key].name}_changed`, newVal);

                        if (this.$route.meta.state)
                            this.$store.commit('setPageState', {id: this.$route.name, data: this.$route.query});
                    }));
                }
            }

            await Promise.all(tasks);
            if (this.$options.loaded)
            {
                if (this.$route.meta.state)
                {
                    if (this.$route.query.hasOwnProperty('clearState'))
                        this.$store.commit('clearPageState', this.$route.name);
                    else
                    {
                        tasks = [];
                        let state = this.$store.state.pageState[this.$route.name];
                        for (let key in state)
                        {
                            let task = convert.bind(this)(state[key], params[key].type, 'read', params[key].converter);
                            tasks.push(task);
                            task.then(val => {
                                if (val) this[key] = val;
                            });
                        }
                        await Promise.all(tasks);
                    }
                }

                await this.$options.loaded.bind(this)();
            }
        },

        destroyed: function () {
            for (let stopWatcher of this._urlSyncs)
                stopWatcher();
        },
    },
}