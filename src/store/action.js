import api from '../plugin/api'

export default {
    async loadSession(context) {
        let session, accessToken;
        if (window.localStorage)
        {
            session = window.localStorage.getItem('session');
            accessToken = window.localStorage.getItem('accessToken');
        }

        await context.dispatch('setSession', {session, accessToken});
    },

    async setSession(context, data) {
        if (data.session === undefined || data.session === null) {
            context.commit('clearSession');
            return;
        }
        // let r = await api.get({url: 'profile', showError: false, header: {authorization: data.session}});
        // if (!r.meta.success) {
        //     context.commit('clearSession');
        //     return;
        // }

        context.commit('setSession', {
            session: data.session,
            profile: data,
        });
    },
}