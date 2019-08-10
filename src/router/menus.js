import groups from './groups';
import views from './views';

const menus = [];

for (let group of groups) {
    let groupMenu = {
        name: group.name,
        title: group.title,
        priority: group.priority || 0,
        permission: group.permission || [],
        requireRoot: group.requireRoot || false,
        children: [],
    };

    for (let viewName in views) {
        let viewRouting = views[viewName].routing;
        if (!viewRouting || !viewRouting.group || !viewRouting.group.includes(group.name))
            continue;

        let child = {
            name: viewName,
            title: viewRouting.title,
            path: viewRouting.path,
            priority: viewRouting.priority || 0,
            isDefault: viewRouting.isDefault || false,
            permission: viewRouting.permission || [],
            requireRoot: groupMenu.requireRoot || viewRouting.requireRoot || false,
        };

        if (group.permission && group.permission.length > 0)
            for (let permission of group.permission) {
                if (child.permission.includes(permission))
                    continue;
                child.permission.push(permission);
            }

        groupMenu.children.push(child);
    }

    if (groupMenu.children.length === 0)
        continue;

    groupMenu.children.sort((x, y) => {
        if (x.isDefault !== y.isDefault)
            return y.isDefault - x.isDefault;
        if (x.priority !== y.priority)
            return y.priority - x.priority;
        return x.title.localeCompare(y.title);
    });

    menus.push(groupMenu)
}

menus.sort((x, y) => {
    if (x.priority !== y.priority)
        return y.priority - x.priority;
    return x.title.localeCompare(y.title);
});

export default menus;
