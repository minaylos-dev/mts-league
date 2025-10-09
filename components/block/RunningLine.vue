<template>
  <div class="block-running-line">
    <div v-for="index in 2" :key="index" class="block-running-line__line">
      <span class="block-running-line__font">
        {{ text }}
      </span>

      <CIcon
        class="block-running-line__icon block-running-line__icon--desktop"
        name="circle-arrow-right"
      />
      <CIcon
        class="block-running-line__icon block-running-line__icon--mobile"
        name="circle-arrow-right-mobile"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockRunningLine',
  props: {
    text: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped lang="scss">
.block-running-line {
  display: flex;
  user-select: none;

  &__line {
    color: $color-white;
    flex-shrink: 0;
    margin: 0;
    min-width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: running-line linear infinite;
    animation-duration: 15s;

    @include media-breakpoint-down(lg) {
      animation-duration: 10s;
    }

    @include media-breakpoint-down(lg) {
      animation-duration: 8s;
    }
  }

  &__icon {
    width: em(110);
    height: em(110);
    margin: 0 em(64);
    flex-shrink: 0;

    @include media-breakpoint-down(lg) {
      width: em(56);
      height: em(56);
      margin: 0 em(40);
    }

    @include media-breakpoint-down(md) {
      width: em(40);
      height: em(40);
      margin: 0 em(20);
    }

    &--desktop {
      @include media-breakpoint-down(lg) {
        display: none;
      }
    }

    &--mobile {
      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }

  &__font {
    font-size: em(140);
    line-height: 1;

    @include media-breakpoint-down(lg) {
      font-size: em(64);
    }

    @include media-breakpoint-down(md) {
      font-size: em(36);
    }
  }
}
</style>
