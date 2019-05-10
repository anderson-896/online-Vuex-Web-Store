import { LOAD_PRODUCTS } from '../actions';
import { SET_PRODUCTS } from '../mutations';
import products from '../../mock/products';

export default {
    state: {
        items: []
    },
    actions: {
        [LOAD_PRODUCTS]({ commit }) {
            return new Promise((resolve) => {
                commit(SET_PRODUCTS, products);
                resolve(products);
            });
        }
    },
    mutations: {
        [SET_PRODUCTS](state, payload) {
            state.items = payload;
        }
    }
};
