<template>
    <span class="cr-filter">
        <select ref="select" class="cr-filter-select" @change="handleChange">
           <slot></slot>
        </select>
    </span>
</template>
<script>
export default {
    name: 'CrSortFilter',
    data() {
        return {
            selected: null
        };
    },
    mounted() {
        this.$emit('change', this.$refs.select.value);
    },
    methods: {
        handleChange(e) {
            this.$emit('change', e.target.value);
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.cr-filter-select {
    border: 1px solid $select-border-color;
    color: $select-color;
    border-radius: 4px;
    padding: 5px 18px;
    padding-right: 36px;
    font-size: 14px;
    appearance: none;
    width: 100%;
    height: 40px;
    line-height: 18px;
    display: inline-block;
    &::-ms-expand {
        display: none;
    }
}

.cr-filter{
    position: relative;
    display: flex;
    &:after {
        content: "";
        position: absolute;
        right: 14px;
        display: block;
        height: 4.94px;
        bottom: 17px;
        width: 8px;
        background-repeat: no-repeat;
        background-image: url('/static/arrow-down-icon.svg');
    }
}
</style>

