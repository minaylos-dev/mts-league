<template>
  <CTagDetect
    class="c-button"
    :class="[`c-button--theme--${theme}`, { 'c-button--without-paddings': disablePaddings }]"
    :to="to"
    :href="href"
    :target="target"
    :type="type"
    :disabled="disabled"
    @click="emitClick"
  >
    <div class="c-button__container">
      <slot name="icon-left" />

      <slot>
        <span class="c-button__font">
          {{ text }}
        </span>
      </slot>

      <slot name="icon-right" />
    </div>
  </CTagDetect>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    to: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    download: {
      type: [Boolean, String],
      default: false,
    },

    theme: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'white',
          'black',
          'outlined',
          'outlined-bold',
          'outlined-black',
          'white-red',
          'red-white',
          'grey',
          'bordered-grey',
          'light-grey',
        ].includes(value);
      },
    },
    text: {
      type: String,
      default: undefined,
    },

    isStaticByDefault: {
      type: Boolean,
      default: false,
    },
    staticTag: {
      type: String,
      default: undefined,
    },

    disablePaddings: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: undefined,
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
  },
};
</script>

<style scoped lang="scss">
.c-button {
  $parent: &;

  transition: opacity $trans-time;

  @include hover {
    opacity: 0.8;
  }

  &:not(#{$parent}--without-paddings) {
    padding: em(13) em(30);
  }

  &:disabled {
    pointer-events: none;
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__font {
    text-transform: uppercase;
    font-weight: 500;
  }

  &--theme {
    &--primary {
      background-color: $color-red;
      color: $color-white;
      border-radius: em(16);

      &:active {
        background-color: $color-button-active;
      }
    }

    &--white {
      background-color: rgba($color-white, 0.2);
      color: $color-white;
      border-radius: em(16);
    }

    &--white-red {
      background-color: $color-white;
      color: $color-red;
      border-radius: em(16);
    }

    &--white-black {
      background-color: $color-white;
      color: $color-black;
      border-radius: em(16);
    }

    &--grey {
      background-color: $color-button-grey;
      color: $color-grey;
      border-radius: em(16);
    }

    &--black {
      background-color: $color-black;
      color: $color-white;
      border-radius: em(16);
    }

    &--light-grey {
      background-color: $color-light-grey;
      color: $color-red;
      border-radius: em(27);
    }

    &--red-white {
      background-color: $color-red;
      color: $color-white;
      border-radius: em(27);
    }

    &--bordered-grey {
      background-color: transparent;
      color: $color-grey;
      border-radius: em(16);
      border: em(2) solid $color-grey;
    }

    &--outlined {
      background-color: $color-white;
      color: $color-red;
      border: 1px solid $color-red;
      border-radius: em(16);
    }

    &--outlined-bold {
      background-color: $color-white;
      color: $color-black;
      border: em(2) solid $color-black;
      border-radius: em(16);
    }

    &--outlined-black {
      color: $color-black-new;
      border: em(2) solid $color-black-new;
      border-radius: em(16);
    }
  }
}
</style>
