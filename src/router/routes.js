import groups from './groups'
import views from './views'

import Layout from '../vue/layout.vue';
import Login from '../vue/login.vue';
import NotFound from '../vue/404.vue';
import AccessDenied from '../vue/403.vue';

const viewRoutes = [];
for (let viewName in views) {
    let view = views[viewName];
    if (!view.routing || view.routing.disabled === true)
        continue;

    let meta = {
        title: view.routing.title,
        permission: view.routing.permission || [],
    };

    for (let group of groups) {
        if (!view.routing.group || !view.routing.group.includes(group.name))
            continue;

        if (group.permission && group.permission.length > 0)
            for (let permission of group.permission)
            {
                if (meta.permission.includes(permission))
                    continue;
                meta.permission.push(permission);
            }
    }

    viewRoutes.push({
        alias: view.routing.isDefault ? '' : undefined,
        name: viewName,
        path: view.routing.path,
        component: view,
        meta: meta,
    })
}

export default [
    {
        name: 'layout',
        path: '/',
        component: Layout,
        meta: {title: 'Layout'},
        children: viewRoutes,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {title: 'Login'},
    },
    {
        name: 'access-denied',
        path: '/403',
        component: AccessDenied,
        meta: {title: '403'},
    },
    {
        name: 'not-found',
        path: '*',
        component: NotFound,
        meta: {title: '404'},
    },
];
