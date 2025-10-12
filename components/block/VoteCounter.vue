<template>
  <div class="vote-counter">
    <CIcon v-if="icon" class="vote-counter__icon" :name="icon" :path="iconPath" />

    <div class="vote-counter__wrapper">
      <div class="vote-counter__text">
        <span class="vote-counter__font vote-counter__font--text">
          {{ text }}
        </span>
      </div>

      <div class="vote-counter__counter">
        <span class="vote-counter__font vote-counter__font--counter">
          {{ currentCount }}/{{ totalCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockVoteCounter',
  props: {
    icon: {
      type: String,
      default: undefined,
    },
    iconPath: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    currentCount: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped lang="scss">
.vote-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: em(80);
  padding: em(20) em(30);
  border: em(2) solid $color-white;
  background-color: $color-white;

  @include media-breakpoint-down(md) {
    padding: em(9) em(30);
  }

  &__icon {
    width: em(30);
    height: em(30);
    color: $color-red;
  }

  &__wrapper {
    display: flex;
    align-items: baseline;
  }

  &__text {
    color: $color-red;
    margin: 0 em(10);
  }

  &__counter {
    color: rgba($color-red, 0.65);
  }

  &__font {
    display: block;

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(24);
      font-weight: 500;
      line-height: em(30, 24);

      @include media-breakpoint-down(md) {
        font-size: em(16);
        line-height: 1;
      }
    }

    &--counter {
      font-family: $font-family-mts-text;
      font-size: em(18);
      font-weight: 500;
      line-height: em(30, 18);

      @include media-breakpoint-down(md) {
        font-size: em(14);
        line-height: 1;
      }
    }
  }
}
</style>
