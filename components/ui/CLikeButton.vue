<template>
  <CButton
    :theme="isLiked ? 'red-white' : 'light-grey'"
    class="like-button"
    @click="$emit('click')"
  >
    <span class="like-button__font">{{ count }}</span>

    <template #icon-right>
      <CIcon name="heart" path="tags" class="like-button__icon" />
    </template>
  </CButton>
</template>

<script>
export default {
  name: 'CLikeButton',
  props: {
    count: {
      type: [String, Number],
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.like-button {
  &__icon {
    width: em(20);
    margin-left: em(10);
  }

  &__font {
    font-family: $font-family-mts-text;
    font-variant-numeric: tabular-nums;
    font-size: em(16);
    line-height: em(24, 16);
    font-weight: 500;
  }
}
</style>
