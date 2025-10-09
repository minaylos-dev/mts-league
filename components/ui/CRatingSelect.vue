<template>
  <div class="c-rating-select">
    <button
      v-for="index in maxValue"
      :key="index"
      class="c-rating-select__button"
      :class="{ 'c-rating-select__button--active': index === value }"
      @click="setValue(index)"
    >
      <span class="c-rating-select__font">
        {{ index }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CRatingSelect',
  props: {
    maxValue: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped lang="scss">
.c-rating-select {
  display: flex;
  align-items: center;

  @include media-breakpoint-down(md) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  &__button {
    width: em(66);
    height: em(50);
    border-radius: em(80);
    border: em(2) solid $color-inputs;
    color: $color-inputs;
    transition: $trans-time;
    transition-property: color, background-color;

    &:not(:last-child) {
      margin-right: em(10);

      @include media-breakpoint-down(md) {
        margin-right: 0;
      }
    }

    &:not(:nth-child(5n)) {
      @include media-breakpoint-down(md) {
        margin-right: em(10);
      }
    }

    @include media-breakpoint-down(lg) {
      width: em(49);
      height: em(49);
    }

    @include media-breakpoint-down(md) {
      width: em(42);
      height: em(42);
      margin-bottom: em(15);
      border-width: 1.3px;
    }

    @include hover {
      background-color: $color-inputs;
      color: $color-white;
    }

    &:active {
      background-color: $color-inputs;
      color: $color-white;
    }

    &--active {
      background-color: $color-inputs;
      color: $color-white;
    }
  }

  &__font {
    font-size: em(20);
    line-height: 100%;
    font-weight: 700;
  }
}
</style>
