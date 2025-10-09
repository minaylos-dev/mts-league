<template>
  <button
    class="c-vote-button"
    :class="`c-vote-button--theme--${theme}`"
    :disabled="disabled"
    @click="emitClick"
    @mouseenter="emitMouseEnter"
    @mouseleave="emitMouseLeave"
  >
    <span class="c-vote-button__text">
      <span class="c-vote-button__font">
        {{ text }}
      </span>
    </span>

    <CIcon class="c-vote-button__icon" :name="icon" :path="iconPath" />
  </button>
</template>

<script>
export default {
  name: 'CVoteButton',
  props: {
    text: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconPath: {
      type: String,
      default: 'vote',
    },

    theme: {
      type: String,
      default: 'white',
      validator(value) {
        return ['white', 'red'].includes(value);
      },
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick() {
      this.$emit('click');
    },
    emitMouseEnter() {
      this.$emit('mouseenter');
    },
    emitMouseLeave() {
      this.$emit('mouseleave');
    },
  },
};
</script>

<style scoped lang="scss">
.c-vote-button {
  $parent: &;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &:disabled {
    pointer-events: none;
  }

  &__text {
    display: block;
    text-transform: uppercase;
    margin-bottom: em(18);
    position: relative;
    top: em(5);

    @include media-breakpoint-down(lg) {
      margin-bottom: em(8);
    }
  }

  &__icon {
    width: em(56);
    height: em(45);
    position: relative;
    top: em(5);

    @include media-breakpoint-down(lg) {
      width: em(38);
      height: em(30);
    }
  }

  &__font {
    font-size: em(18);
    font-weight: 700;
    line-height: em(26, 18);

    @include media-breakpoint-down(lg) {
      font-size: em(11);
      line-height: em(26, 11);
    }
  }

  &--theme {
    &--red {
      background-color: $color-red;

      #{$parent} {
        &__text,
        &__icon {
          color: $color-white;
        }
      }
    }

    &--white {
      background-color: $color-white;

      #{$parent} {
        &__text,
        &__icon {
          color: $color-red;
        }
      }
    }
  }
}
</style>
