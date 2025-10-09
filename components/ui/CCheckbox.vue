<template>
  <ValidationProvider v-slot="{ errors }" :vid="name" :name="localizedName" :rules="rules" slim>
    <label class="c-checkbox" :class="{ 'c-checkbox--error': errors && errors.length }">
      <input v-model="localValue" class="c-checkbox__field" type="checkbox" :name="name" />

      <span class="c-checkbox__fake-field" />

      <slot />
    </label>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'CCheckbox',
  components: { ValidationProvider },
  props: {
    name: {
      type: String,
      default: undefined,
    },

    rules: {
      type: String,
      default: undefined,
    },
    localizedName: {
      type: String,
      default: undefined,
    },

    value: {
      type: Boolean,
      default: false,
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
.c-checkbox {
  $parent: &;

  display: flex;
  align-items: center;
  cursor: pointer;

  &__field {
    display: none;

    &:checked + #{$parent}__fake-field {
      border-color: $color-red;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: $color-red;
      }
    }
  }

  &__fake-field {
    display: block;
    width: em(30);
    height: em(30);
    margin-right: em(15);
    border-radius: 50%;
    border: 1px solid $color-border;
    padding: em(4);
    flex-shrink: 0;

    @include media-breakpoint-down(xl) {
      width: em(20);
      height: em(20);
      margin-right: em(12);
    }
  }

  &--error {
    #{$parent} {
      &__fake-field {
        border-color: $color-red;
      }
    }
  }
}
</style>
