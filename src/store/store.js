import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import cart from './modules/cart';
import products from './modules/products';


Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    modules: { cart, products },
    strict: process.env.NODE_ENV !== 'production'
});
