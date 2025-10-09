<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="c-textarea"
    :vid="name"
    :name="localizedName"
    :rules="rules"
  >
    <div v-if="label" class="c-textarea__title">
      <span class="c-textarea__font">
        {{ label }}
      </span>
    </div>

    <label
      class="c-textarea__label"
      :class="{ 'c-textarea__label--error': errors && errors.length }"
    >
      <textarea
        v-model="localValue"
        class="c-textarea__field"
        :class="fieldClass"
        :name="name"
        :placeholder="placeholder"
      />
    </label>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'CTextArea',
  components: { ValidationProvider },
  props: {
    name: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },

    label: {
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

    fieldClass: {
      type: String,
      default: undefined,
    },

    value: {
      type: [String, Number],
      default: undefined,
    },
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
};
</script>

<style scoped lang="scss">
.c-textarea {
  $parent: &;

  display: flex;
  flex-direction: column;

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
    height: 100%;
    align-items: center;
    border: 1px solid $color-border;
    padding: em(13) em(12);
    background-color: $color-white;
    border-radius: em(16);
    flex-grow: 1;

    @include media-breakpoint-down(md) {
      padding: em(10) em(12);
    }

    &--error {
      border-color: $color-error;

      #{$parent} {
        &__icon {
          &--hint {
            color: $color-error;
          }
        }
      }
    }
  }

  &__field {
    width: 100%;
    height: 100%;
    border: none;
    font-family: $font-family-mts-text;
    font-size: em(17);
    line-height: 130%;
    resize: none;
    color: $color-black-grey;

    &::-webkit-scrollbar {
      display: none;
    }

    &::placeholder {
      color: $color-inputs;
    }

    @include media-breakpoint-down(xl) {
      font-size: em(16);
    }

    @include media-breakpoint-down(md) {
      padding: em(10, 16) em(18, 16);
      font-size: em(16);
    }
  }

  &__font {
    font-family: $font-family-mts-compact;
    font-size: em(14);
    line-height: 130%;
  }
}
</style>
