<template>
  <div class="form-input-tooltip">
    <span v-typograph class="form-input-tooltip__font">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'FormInputTooltip',
};
</script>

<style scoped lang="scss">
.form-input-tooltip {
  padding: em(20) em(40);
  background-color: $color-black-grey;
  border-radius: em(40) em(40) em(40) 0;
  color: $color-white;

  @include media-breakpoint-down(xl) {
    padding: em(12) em(30);
  }

  &__font {
    font-family: $font-family-mts-text;

    @include media-breakpoint-down(xl) {
      display: block;
      font-size: em(11);
      line-height: 155%;
    }
  }
}
</style>
