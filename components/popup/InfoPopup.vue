<template>
  <PopupSkeletonDefault class="info-popup" @close="onClose">
    <template #icon>
      <CIcon class="info-popup__icon" name="cross" />
    </template>

    <template #default>
      <div class="info-popup__title">
        <span v-typograph class="info-popup__font info-popup__font--title" v-html="data.title" />
      </div>

      <div class="info-popup__text">
        <span v-typograph class="info-popup__font info-popup__font--text" v-html="data.text" />
      </div>
    </template>
  </PopupSkeletonDefault>
</template>

<script>
const PopupSkeletonDefault = () => import('@/components/popup/skeleton/PopupSkeletonDefault.vue');

export default {
  name: 'InfoPopup',
  components: { PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onClose() {
      this.$emit('onClose');

      if (!this.data.callback) return;
      this.data.callback();
    },
  },
};
</script>

<style scoped lang="scss">
.info-popup {
  &__icon {
    width: em(40);
    height: em(40);
    color: $color-black-default;

    @include media-breakpoint-down(xl) {
      width: em(30);
      height: em(30);
    }
  }

  &__title {
    margin-bottom: em(20);
  }

  &__text {
    color: $color-black;
  }

  &__font {
    &--title {
      font-size: em(40);
      font-weight: 500;
      line-height: 110%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(xl) {
        font-size: em(16);
      }
    }
  }
}
</style>
