<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="c-input"
    :vid="name"
    :name="localizedName"
    :rules="rules"
    :mode="validationMode"
  >
    <div v-if="label" class="c-input__title">
      <span class="c-input__font c-input__font--label">
        {{ label }}
      </span>
    </div>

    <label class="c-input__label" :class="{ 'c-input__label--error': errors && errors.length }">
      <input
        v-model="localValue"
        class="c-input__field"
        :name="name"
        :placeholder="placeholder"
        :type="type"
      />

      <span
        v-if="hint"
        class="c-input__hint"
        @mouseleave="hideHint"
        @click.prevent="() => openHint()"
      >
        <CIcon class="c-input__icon c-input__icon--hint" name="question" />
      </span>

      <Transition name="fade">
        <FormInputTooltip
          v-if="showHint || error"
          class="c-input__tooltip"
          :class="{ [`c-input__tooltip--${tooltipMode}`]: tooltipMode }"
        >
          {{ error || hint }}
        </FormInputTooltip>
      </Transition>
    </label>

    <span v-if="error && showMobileError" class="c-input__error">
      <span class="c-input__font c-input__font--error">
        {{ error }}
      </span>
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

import breakpoints from '@/config/breakpoints';

const FormInputTooltip = () => import('@/components/form/FormInputTooltip.vue');

export default {
  name: 'CInput',
  components: { FormInputTooltip, ValidationProvider },
  props: {
    name: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },

    label: {
      type: String,
      default: undefined,
    },
    hint: {
      type: String,
      default: undefined,
    },

    localizedName: {
      type: String,
      default: undefined,
    },
    rules: {
      type: String,
      default: undefined,
    },
    validationMode: {
      type: String,
      default: 'aggressive',
    },
    error: {
      type: String,
      default: undefined,
    },
    tooltipMode: {
      type: String,
      default: undefined,
      validator(value) {
        return ['vertical'].includes(value);
      },
    },
    disablePopupOnMobile: {
      type: Boolean,
      default: false,
    },
    showMobileError: {
      type: Boolean,
      default: false,
    },

    value: {
      type: [String, Number],
      default: undefined,
    },
  },
  data() {
    return {
      showHint: false,
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  watch: {
    error(value) {
      if (!value) return (this.showHint = false);

      this.openHint(value);
    },
  },
  methods: {
    hideHint() {
      this.showHint = false;
    },
    openHint(text = this.hint) {
      if (window.innerWidth >= breakpoints.mobile) {
        this.showHint = true;
      } else {
        this.openHintModal(text);
      }
    },

    openHintModal(text) {
      if (this.disablePopupOnMobile) return;

      this.$popup.open('MobileInfoPopup', {
        text: text,
        disableBackground: true,
        transitionName: 'slide-bottom',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.c-input {
  $parent: &;

  position: relative;
  display: block;

  &__title {
    color: $color-inputs;
    margin-bottom: em(8);

    @include media-breakpoint-down(md) {
      margin-bottom: em(12);
    }
  }

  &__label {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid $color-border;
    padding: em(13) em(12);
    background-color: $color-white;
    border-radius: em(16);

    @include media-breakpoint-down(md) {
      padding: em(10) em(12);
    }

    &--error {
      border-color: $color-error;

      #{$parent} {
        &__icon {
          &--hint {
            color: $color-grey;
          }
        }
      }
    }
  }

  &__field {
    width: 100%;
    height: 100%;
    border: none;
    font-family: $font-family-mts-compact;
    font-size: em(17);
    line-height: 130%;
    color: $color-black-grey;
    letter-spacing: em(0.4);

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 em(20) white inset !important;
    }
    @include media-breakpoint-down(xl) {
      font-size: em(16);
    }

    @include media-breakpoint-down(md) {
      font-size: em(14);
    }
  }

  &__hint {
    position: relative;
    display: block;
    width: em(24);
    height: em(24);
    flex-shrink: 0;
    margin-left: em(10);
  }

  &__icon {
    &--hint {
      color: $color-grey;
      cursor: pointer;
    }
  }

  &__error {
    position: absolute;
    top: calc(100% + #{em(8)});
    left: 0;
    display: block;
    color: $color-error;

    @include media-breakpoint-up(md) {
      display: none;
    }
  }

  &__tooltip {
    position: absolute;
    bottom: 0;
    min-width: em(250);
    left: calc(100% + #{em(20)});
    z-index: $zLevel8;

    @include media-breakpoint-down(md) {
      display: none;
    }

    &--vertical {
      bottom: em(25);
      left: calc(100% + #{em(20)});

      @include media-breakpoint-down(lg) {
        left: 100%;
        translate: -50%;
        bottom: calc(100% + #{em(20)});
      }
    }
  }

  &__font {
    &--label {
      font-family: $font-family-mts-compact;
      font-size: em(14);
      line-height: 130%;
    }

    &--error {
      display: block;
      font-family: $font-family-mts-text;
      font-size: em(11);
      font-weight: 400;
      line-height: em(15, 11);
    }
  }
}
</style>
