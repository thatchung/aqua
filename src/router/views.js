const viewFiles = require.context('../vue/view', false, /\.vue$/).keys().map(x => x.substring(2, x.length - 4));

const viewRoutes = {};
for (let fileName of viewFiles) {
    viewRoutes[fileName] = require(`../vue/view/${fileName}.vue`).default;
}

export default viewRoutes;