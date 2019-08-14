import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import ElementUILocale from 'element-ui/lib/locale'
import ElementUILang from 'element-ui/lib/locale/lang/vi'

import Vue from 'vue'
import ElementUI from 'element-ui'
import Clipboard from 'vue-clipboard2'
import DataTables from 'vue-data-tables'
import VueJsonPretty from 'vue-json-pretty'
import VueTimePicker from 'vue-timepicker'
import VueNumeric from 'vue-numeric'
import Modal from 'vue-js-modal'
import Multiselect from 'vue-multiselect'
import State from './plugin/state'
import Util from './plugin/util'
import Filter from './plugin/filter'
import Api from './plugin/api'
import Progress from './plugin/progress'
import Router from './router'
import Store from './store'
import app from './vue/app.vue'
import moment from 'moment'
import VueAnalytics from  'vue-analytics'
import WebPush from  'web-push'
// import VueSocket from 'vue-socket.io'
import injector from 'vue-inject'
import VueCarousel from 'vue-carousel'
import {Tabs, Tab} from 'vue-tabs-component'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSocketIO from 'vue-socket.io'
import {VueTabs} from 'vue-nav-tabs'
import { Carousel, Slide } from 'vue-carousel'


import Box from './vue/component/box'
import FilterPanel from './vue/component/filter-panel'
import FilterItem from './vue/component/filter-item'

import RemoteSelect from './vue/component/remote-select'
import SelectList from './vue/component/select-list'

import ImageList from './vue/component/image-list'
import ImageSingle from './vue/component/image-single'
import TableView from './vue/component/table-view-component'
import ModalInput from './vue/component/modal-input'
import ChartLine from './vue/component/chart-line'
import ChartLineFail from './vue/component/chart-line-fail'
import ChartBar from './vue/component/chart-bar'
import ChartBarHorizontal from './vue/component/chart-bar-horizontal'
import VueAWN from "vue-awesome-notifications"


moment.locale('vi');
Vue.config.productionTip = false;
ElementUILocale.use(ElementUILang);

// Vue.use(VueSocket, process.env.socket, Store);
Vue.use(Api);
Vue.use(Clipboard);
Vue.use(Modal, {dynamic: true, dialog: true});
Vue.use(Progress);
Vue.use(State);
Vue.use(Util);
Vue.use(Filter);
Vue.use(VueAWN)
Vue.use(ElementUI);
Vue.use(DataTables);
Vue.use(WebPush);
// Vue.use(VueAnalytics, {
//     id: 'UA-97234343-1',
//     Router
// });
Vue.use(VueCarousel);

require('./vue/service/injector-register');
Vue.use(injector);
Vue.use(Tabs);
Vue.use(VueTabs);
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAfxluMz7e0E1jdulRlUuABzFP3PX0h2Lk',
      libraries: 'places', 
    },
});
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://127.0.0.1:8101',
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   },
//   options: { path: "/log_aqua/live" } //Optional options
// }));

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
Vue.component('vue-tabs', VueTabs);
Vue.component('carousel', Carousel);
Vue.component('slide', Slide);
Vue.component('box', Box);
Vue.component('vue-json-pretty', VueJsonPretty);
Vue.component('vue-timepicker', VueTimePicker);
Vue.component('multiselect', Multiselect);
Vue.component('filter-panel', FilterPanel);
Vue.component('filter-item', FilterItem);
Vue.component('remote-select', RemoteSelect);
Vue.component('select-list', SelectList);
Vue.component('image-list', ImageList);
Vue.component('image-single', ImageSingle);
Vue.component('table-view', TableView);
Vue.component('modal-input', ModalInput);
Vue.component('numeric', VueNumeric);
Vue.component('chart-line',ChartLine);
Vue.component('chart-line-fail',ChartLineFail);
Vue.component('chart-bar',ChartBar);
Vue.component('chart-bar-horizontal',ChartBarHorizontal);

Vue.app = new Vue({
    el: '#root',
    store: Store,
    router: Router,
    render: h => h(app),
});