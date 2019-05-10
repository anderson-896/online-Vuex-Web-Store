<template>
    <div class="cr-item">
        <cr-item-frame class="cr-item-frame"><slot name="image" />
        </cr-item-frame>
        <div class="cr-item-body">
            <div class="cr-item-body-title">{{itemName}}</div>
            <div class="cr-item-body-price">{{formatedPrice}}</div>
        </div>
        <div class="cr-item-remove-btn" @click="removeBtnClick">x</div>
    </div>
</template>
<script>
import CurrencyFormatter from 'currency-formatter';
import CrItemFrame from '@/components/CrItemFrame';

export default {
    name: 'CrCartItem',
    props: {
        itemName: {
            type: String,
            default: ''
        },
        itemPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        formatedPrice() {
            return CurrencyFormatter.format(this.itemPrice, { locale: 'pt-BR' });
        }
    },
    methods: {
        removeBtnClick() {
            const { itemName, itemPrice } = this.$props;
            this.$emit('remove', { itemName, itemPrice });
        }
    },
    components: { CrItemFrame }
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.cr-item {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    position: relative;

    &-frame {
        flex: none;
            width: 60px;
            height: 53px;
    }

    &-body {
        margin: 0 10px;
        font-size: 14px;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        &-title {
            color: $cart-item-title-color;
        }
        &-price {
            color: $cart-item-price-color;
            font-weight: bold;
        }
    }

    &-remove-btn {
        display: none;
        user-select: none;
        background-color: $cart-remove-item-bg-color;
        position: absolute;
        color: $cart-remove-item-color;
        width: 15px;
        height: 15px;
        line-height: 13px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        border-radius: 50%;
        right: 0;
        top: calc(50% - 14px);
    }

    &:hover {
        .cr-item-remove-btn {
            display: block;
        }
    }
}
</style>
