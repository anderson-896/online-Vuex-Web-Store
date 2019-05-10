<template>
    <main class="container-fluid row col justify-content-center no-gutters">
        <div class="row page-content">
            <div class="col-md-8 col-lg-9">
                <header class="main-header">
                    <div class="row">
                        <div class="col-8 col-md-6 col-lg-8">
                            <span class="main-header-title">Games</span>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="main-header-menu">
                                <cr-select @change="sortList">
                                    <option v-for="(item, index) in options" :key="index"
                                    :value="item.id">{{item.name}}</option>
                                </cr-select>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="row products-list">
                    <div class="col-12 col-md-6 col-lg-4"
                    v-for="(item, index) in sortedItems" :key="index">
                        <cr-home-product-item :itemName="item.name" :itemPrice="item.price"
                        @click="addToCart(item)">
                            <img slot="image" :src="require(`../assets/${item.image}`)" />
                        </cr-home-product-item>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg-3">
                <cr-cart></cr-cart>
            </div>
        </div>
    </main>
</template>

<script>
import _ from 'lodash';
import CrHomeProductItem from '@/components/CrHomeProductItem';
import CrSelect from '@/components/CrSelect';
import CrCart from '@/components/CrCart';
import { LOAD_PRODUCTS, ADD_CART_PRODUCT } from '@/store/actions';

export default {
    name: 'Home',
    data() {
        return {
            sortMode: 1,
            options: [
                {
                    id: 1,
                    name: 'Mais populares',
                    field: 'score',
                    sort: 'desc'
                },
                {
                    id: 2,
                    name: 'Menor preço',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    id: 3,
                    name: 'Maior preço',
                    field: 'price',
                    sort: 'desc'
                },
                {
                    id: 4,
                    name: 'Ordem Alfabética',
                    field: 'name',
                    sort: 'asc'
                }
            ]
        };
    },
    mounted() {
        this.$store.dispatch(LOAD_PRODUCTS);
    },
    computed: {
        selectedOption() {
            return _.find(this.options, o => o.id.toString() === this.sortMode) || {};
        },
        sortedItems() {
            const field = this.selectedOption.field;
            const optionSort = this.selectedOption.sort;
            return _.orderBy(
                this.$store.state.products.items,
                [field],
                [optionSort]
            );
        }
    },
    methods: {
        sortList(value) {
            this.sortMode = value;
        },
        addToCart(item) {
            this.$store.dispatch(ADD_CART_PRODUCT, item);
        }
    },
    components: { CrHomeProductItem, CrSelect, CrCart }
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';
.main-header {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 55px;
  color: $header-color;
      height: 38px;
    line-height: 38px;
  &-menu{
        line-height: 50px;
  }
}
.page-content {
  margin: 55px 40px;
  max-width: 1216px;
  width: 100%;
}
@media screen and (max-width: 767px){
    .main-header {
        height: auto;
        &-menu {
            margin: 20px 0;
        }
    }
}
</style>
