import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {color: '#39dda0', thickness: '4px'});
let progress;

export default {
    install(Vue) {
        Vue.prototype.$progress = this;
        Vue.options = Vue.util.mergeOptions(Vue.options, this.mixin);
    },

    mixin: {
        created: function () {
            if (!progress)
                progress = this.$Progress;
        }
    },

    start() {
        progress.start();
    },

    finish() {
        progress.finish();
    },
}