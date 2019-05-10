<template>
    <div class="cr-frame" @click="handleClick">
        <cr-item-frame><slot name="image" /></cr-item-frame>
        <div class="cr-frame-title">
            <div class="cr-frame-title-name">{{itemName}}</div>
            <div class="cr-frame-title-price">{{formatedPrice}}</div>
        </div>
        <div class="cr-frame-action">
            adicionar ao carrinho
        </div>
    </div>
</template>
<script>
import CurrencyFormatter from 'currency-formatter';
import CrItemFrame from '@/components/CrItemFrame';

export default {
    name: 'CrHomeProduct',
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
    methods: {
        handleClick(e) {
            this.$emit('click', e);
        }
    },
    computed: {
        formatedPrice() {
            return CurrencyFormatter.format(this.itemPrice, { locale: 'pt-BR' });
        }
    },
    components: { CrItemFrame }
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.cr-frame {
    margin-bottom:  48px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    overflow: hidden;

    &-title, &-action {
        font-size: 16px;
        text-align: center;
        padding: 8px 0;
        &-name {
            color: $frame-text-color;
        }
        &-price {
            color: $frame-price-color;
            font-weight: bold;
        }
    }

    &-action {
        display: none;
    }

    &:hover {
        .cr-frame-title {
            display: none;
        }
        .cr-frame-action {
            display: block;
            color: $frame-price-color;
            line-height: 48px;
        }
    }

}
</style>
