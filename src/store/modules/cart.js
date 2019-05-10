import { ADD_CART_PRODUCT, REMOVE_CART_PRODUCT } from '../actions';
import { SET_CART } from '../mutations';

export default {
    state: {
        items: []
    },
    actions: {
        [ADD_CART_PRODUCT]({ commit, state }, product) {
            const items = [...state.items, product];
            return new Promise((resolve) => {
                commit(SET_CART, items);
                resolve(items);
            });
        },
        [REMOVE_CART_PRODUCT]({ commit, state }, index) {
            const current = [...state.items];
            current.splice(index, 1);
            return new Promise((resolve) => {
                commit(SET_CART, current);
                resolve(current);
            });
        }
    },
    mutations: {
        [SET_CART](state, payload) {
            state.items = payload;
        }
    }
};
