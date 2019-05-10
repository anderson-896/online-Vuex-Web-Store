// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto';
import flexPolyfill from 'flex-polyfill';
import { grid } from 'bootstrap-css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

Vue.use(grid);

const options = {
    elem: document.documentElement,
    src: '//j1.58cdn.com.cn/git/flex-polyfill/lib/flexibility.js'
};

flexPolyfill(options);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
