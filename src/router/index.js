import Vue from 'vue'
import VueRouter from 'vue-router'
import VuexRouter from 'vuex-router-sync'
import store from '../store'
import routes from './routes'
// import VueWebsocket from "vue-websocket";


Vue.use(VueRouter);
// Vue.use(VueWebsocket, "ws://112.78.12.117:1101");

// load route
const router = new VueRouter({
    routes: routes,
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => savedPosition || {x: 0, y: 0}
});

// redirect login
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && (router.app.$store.state.session === undefined || router.app.$store.state.session === null)) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
        return;
    }

    // if (to.meta.requireRoot && !router.app.$store.state.profile.is_root) {
    //     next({
    //         path: '/403',
    //     });
    //     return;
    // }

    // if (Array.isArray(to.meta.permission) && to.meta.permission.length > 0)
    //     for (let permission of to.meta.permission) {
    //         if (router.app.$store.state.profile.permission.includes(permission))
    //             continue;
    //         next({
    //             path: '/403',
    //         });
    //         return;
    //     }

    next();
});

// sync route to store
VuexRouter.sync(store, router);

export default router;