import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  publicPath: '/public/',
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
});
