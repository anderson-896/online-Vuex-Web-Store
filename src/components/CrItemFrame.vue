<template>
    <div class="cr-frame-thumbnail">
        <div class="cr-frame-thumbnail-image">
            <div class="cr-frame-thumbnail-image-container">
                <slot />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../style/colors.scss';
.cr-frame {
     &-thumbnail {
        background-color: $thumbnail-background-color;
        flex: 0 1 auto;
        &-image {
            display: flex;
            justify-content: center;
            width: auto;
            flex-direction: column;
            height: 100%;
            &-container {
                margin: 10% 0;
                display: flex;
                justify-content: center;
                height: 100%;
                img {
                    width: 70%;
                    height: 100%;
                }
            }
        }
    }
}
</style>

