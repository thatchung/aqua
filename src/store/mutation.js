export default {
    toggleLoader(state, val) {
        if (typeof val === 'boolean')
            state.loader = val;
        else
            state.loader = !state.loader;
    },

    toggleView(state, val) {
        if (typeof val === 'boolean')
            state.view = val;
        else
            state.view = !state.view;
    },

    setSession(state, data) {
        if (window.localStorage) {
            window.localStorage.setItem('session', data.session);
        }

        data.profile.avatar = '/static/img/logo.png';

        state.session = data.session;
        state.profile = data.profile;
    },

    clearSession(state) {
        if (window.localStorage) {
            window.localStorage.removeItem('session');
        }

        state.session = null;
        state.profile = null;
    },

    setPageState(state, data) {
        if (typeof data.id !== 'string')
            throw 'id is not defined';

        state.pageState[data.id] = data.data;
    },

    clearPageState(state, id) {
        state.pageState[id] = undefined;
    },
}