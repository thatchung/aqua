<template>
    <form class="box box-default" @submit.prevent="submit">
        <div class="box-header with-border" data-widget="collapse">
            <i class="fa fa-minus"></i>
            <h3 class="box-title">
                <b>{{Object.keys(filter).filter(key => filter[key].isValued).length | number}}</b>
                <span>Filter Option</span>
            </h3>
            <div class="filter-list">
                <span class="label label-danger" v-for="item in filter" v-if="item.isValued">
                    {{item.title}}: {{item.display}}
                </span>
            </div>
        </div>

        <div class="box-body">
            <div class="row">
                <slot></slot>
            </div>
        </div>

        <div class="box-footer">
            <div class="pull-right">
                <el-button type="default" @click="reset">Cancel</el-button>
                <el-button type="primary" native-type="submit">Submit</el-button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'FilterPanel',

        props: {
            value: null,
            'first-load': {
                type: Boolean,
                default: true,
            },
        },

        data: () => ({
            filter: {},
        }),

        methods: {
            reset: function () {
                for (let key in this.value) {
                    if (key === '$meta')
                        continue;
                    this.value[key].value = this.filter[key].value;
                }
            },

            submit: async function () {
                let oldFilter = this.filter;
                this.filter = {};

                for (let key in this.value) {
                    let field = this.value[key];
                    let filter = {
                        value: field.value,
                        title: field.title,
                    };

                    if (Array.isArray(filter.value) && filter.value.length === 0)
                        filter.isValued = false;
                    else
                        filter.isValued = filter.value !== undefined && filter.value !== null && filter.value !== '';

                    if (!filter.isValued)
                        filter.display = null;
                    else if (field.display)
                        filter.display = field.display.bind(this)(filter.value);
                    else if (field.labelType) {
                        if (Array.isArray(field.labelType))
                            filter.display = this.$filter[field.labelType[0]](filter.value, ...field.labelType.slice(1));
                        else
                            filter.display = this.$filter[field.labelType](filter.value);
                    }
                    else if (field.value.name){
                        filter.display = filter.value.name;
                    }
                    else
                        filter.display = filter.value;

                    this.filter[key] = filter;
                }

                let isChanged = false;
                if (Object.keys(oldFilter).length !== Object.keys(this.filter).length)
                    isChanged = true;
                else {
                    for (let key in oldFilter) {
                        let oldField = oldFilter[key];
                        let newField = this.filter[key];

                        if (newField === undefined || oldField.value !== newField.value) {
                            isChanged = true;
                            break;
                        }
                    }
                }

                this.$emit('input', Object.assign(this.value, {$meta: {isChanged: isChanged}}));
                await this.$emit('submit');
                this.$emit('input', Object.assign(this.value, {$meta: {isChanged: false}}));
            },
        },

        loaded: function () {
            if (typeof this.firstLoad === 'undefined' || this.firstLoad === true)
                this.submit();
        }
    }
</script>

<style lang="scss" scoped>
    .filter-list {
        > span {
            float: left;
            margin: 2px;
        }
    }
</style>