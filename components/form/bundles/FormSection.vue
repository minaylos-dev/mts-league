<template>
  <section class="form-section">
    <h2 class="form-section__title">
      <span class="form-section__font form-section__font--title">{{ title }}</span>
    </h2>

    <slot theme="black" />
  </section>
</template>

<script>
export default {
  name: 'FormSection',
  props: {
    title: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-section {
  &__title {
    font-size: inherit;
    color: $color-black-grey;
    margin-bottom: em(28);

    @include media-breakpoint-up(md) {
      margin-bottom: em(40);
    }
  }

  &__font {
    &--title {
      font-family: $font-family-mts-wide;
      font-size: em(18);
      line-height: em(30, 18);
      font-weight: 500;
      text-transform: uppercase;

      @include media-breakpoint-up(md) {
        font-size: em(26);
        line-height: em(30, 26);
      }
      @include media-breakpoint-up(lg) {
        font-size: em(30);
        line-height: 1;
      }
    }
  }
}
</style>
