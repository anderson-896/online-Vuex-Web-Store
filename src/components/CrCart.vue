<template>
    <div class="cr-cart">
        <header class="cr-cart-header">
            <span class="cr-cart-header-title">Carrinho</span>
            <span class="cr-cart-header-count"  v-if="$store.state.cart.items.length > 0">
                ({{itensCountLabel}})
            </span>
        </header>
        <div class="cr-cart-body">
            <cr-cart-item :itemName="item.name" :itemPrice="item.price" class="cr-cart-body-item"
            v-for="(item, index) in $store.state.cart.items" :key="index"
            @remove="removeItem(index)">
                <img slot="image" :src="require(`../assets/${item.image}`)" />
            </cr-cart-item>
            <div class="cr-cart-body-resume" v-if="$store.state.cart.items.length > 0">
                <div class="cr-cart-body-resume-item">
                    <div class="cr-cart-body-resume-item-title">subtotal</div>
                    <div class="cr-cart-body-resume-item-total">{{formattedSubTotal}}</div>
                </div>
                <div class="cr-cart-body-resume-item">
                    <div class="cr-cart-body-resume-item-title">frete</div>
                    <div class="cr-cart-body-resume-item-total">{{formattedShipping}}</div>
                </div>
                <div class="cr-cart-body-resume-item">
                    <div class="cr-cart-body-resume-item-title">total</div>
                    <div class="cr-cart-body-resume-item-total grand-total">{{formattedtotal}}</div>
                </div>
            </div>
            <button class="cr-cart-body-finalize-btn"  v-if="$store.state.cart.items.length > 0">
                finalizar compra
            </button>
            <div class="cr-cart-body-placeholder" v-else>
                Até o momento, o seu carrinho está vazio
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import CurrencyFormatter from 'currency-formatter';
import CrCartItem from '@/components/CrCartItem';
import { REMOVE_CART_PRODUCT } from '@/store/actions';

export default {
    name: 'CrCart',
    data() {
        return {
            shippingPrice: 10,
            FreeShippingPrice: 250
        };
    },
    computed: {
        itensCountLabel() {
            const lng = this.$store.state.cart.items.length;
            return `${lng} ${lng > 1 ? 'itens' : 'item'}`;
        },
        subtotal() {
            return _.sumBy(this.$store.state.cart.items, 'price');
        },
        formattedSubTotal() {
            return CurrencyFormatter.format(
                this.subtotal, { locale: 'pt-BR' }
            );
        },
        shipping() {
            const { shippingPrice, FreeShippingPrice } = this;
            if (this.subtotal > FreeShippingPrice) return 0;
            return this.$store.state.cart.items.length * shippingPrice;
        },
        formattedShipping() {
            return CurrencyFormatter.format(
                this.shipping, { locale: 'pt-BR' }
            );
        },
        total() {
            return this.subtotal + this.shipping;
        },
        formattedtotal() {
            return CurrencyFormatter.format(
                this.total, { locale: 'pt-BR' }
            );
        }
    },
    methods: {
        removeItem(index) {
            this.$store.dispatch(REMOVE_CART_PRODUCT, index);
        }
    },
    components: { CrCartItem }
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.cr-cart {
    border: 1px solid $cart-border-color;
    border-radius: 4px;

    &-header {
        margin: 20px 25.5px;

        &-title{
            font-size: 18px;
            font-weight: bold;
            color: $cart-header-title-color;
        }

        &-count{
            font-size: 14px;
            font-weight: normal;
            color: $cart-header-title-count-color;
        }
    }

    &-body {
        padding: 0 20px;
        padding-bottom: 10px;
        &-item {
            margin-bottom: 20px;
        }
        &-resume {
            margin-top: 5px;
            &-item {
                display: flex;
                margin-bottom: 20px;
                &-title {
                    flex: 1;
                    font-size: 14px;
                    color: $cart-resume-title-color;
                }
                &-total {
                    color: $cart-resume-total-color;
                    font-size: 16px;
                    font-weight: bold;

                    &.grand-total {
                        font-size: 20px;
                    }
                }
            }
        }
        &-finalize-btn {
            background-color: $cart-finalize-btn-bg-color;
            height: 50px;
            width: 100%;
            color: $cart-finalize-btn-color;
            font-size: 14px;
            font-weight: bold;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 5px;
            margin-bottom: 3px;
        }
        &-placeholder {
            font-size: 14px;
            color: $cart-placeholder-text-color;
            text-align: center;
            padding: 130px 30px 98px 30px;
            background-image: url('../assets/cart-icon.svg');
            background-repeat: no-repeat;
            background-position: center 20%;
        }
    }
}
</style>

