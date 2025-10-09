<template>
  <div
    class="c-points-button"
    @mouseenter="setShowDropdown(true)"
    @mouseleave="setShowDropdown(false)"
  >
    <div class="c-points-button__container">
      <button type="button" class="c-points-button__button">
        <span class="c-points-button__font c-points-button__font--button"> Оценено </span>
      </button>

      <Transition name="fade">
        <div v-if="showDropdown" class="c-points-button__dropdown">
          <div class="c-points-button__wrapper">
            <div v-for="(item, index) in assessments" :key="index" class="c-points-button__item">
              <span class="c-points-button__font c-points-button__font--text">
                {{ item.title }}
              </span>

              <span class="c-points-button__font c-points-button__font--points">
                {{ item.points }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CPointsButton',
  props: {
    assessments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },

  methods: {
    setShowDropdown(value) {
      this.showDropdown = value;
    },
  },
};
</script>

<style scoped lang="scss">
.c-points-button {
  &__container {
    position: relative;
  }

  &__button {
    background-color: $color-black-grey;
    color: $color-white;
    padding: em(11) em(20);
    border-radius: em(80);
    width: 100%;
    height: 100%;

    @include media-breakpoint-down(lg) {
      padding: em(5) em(10);
      border-radius: em(40);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: em(20);
    z-index: $zLevel3;
    padding-top: em(4);

    @include media-breakpoint-down(md) {
      right: 0;
    }
  }

  &__wrapper {
    width: em(372);
    padding: em(40);
    background-color: $color-white;
    border-radius: em(40) 0 em(40) em(40);

    @include media-breakpoint-down(md) {
      width: em(240);
      padding: em(20);
      border-radius: em(20) 0 em(20) em(20);
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    gap: em(10);

    &:not(:last-child) {
      padding-bottom: em(10);
      margin-bottom: em(10);
      border-bottom: 1px solid rgba($color-grey, 0.2);
    }
  }

  &__font {
    display: block;

    &--button {
      font-family: $font-family-mts-wide;
      font-size: em(20);
      font-weight: 700;
      line-height: em(28, 20);
      text-align: center;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
        line-height: em(18, 16);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(16);
      font-weight: 400;
      line-height: em(24, 16);
      color: $color-grey;

      @include media-breakpoint-down(md) {
        font-size: em(12);
        line-height: em(14, 12);
      }
    }

    &--points {
      font-family: $font-family-mts-text;
      font-size: em(16);
      font-weight: 700;
      line-height: em(24, 16);
      text-align: center;
      color: $color-black-grey;
    }
  }
}
</style>
