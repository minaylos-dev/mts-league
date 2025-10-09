<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="c-select"
    :class="[
      `c-select--${theme}`,
      {
        [`c-select--${theme}--active`]: focused,
      },
      {
        [`c-select--size-${size}`]: size,
      },
    ]"
    :vid="name"
    :name="localizedName"
    :rules="rules"
    :mode="validationMode"
  >
    <div v-if="label" class="c-select__title">
      <span class="c-select__font">
        {{ label }}
      </span>
    </div>

    <label class="c-select__label" :class="{ 'c-select__label--error': errors && errors.length }">
      <Multiselect
        ref="select"
        class="c-select__field"
        :options="items"
        :label="selectLabel"
        :track-by="trackBy"
        :value="value"
        :close-on-select="closeOnSelect"
        :placeholder="placeholder"
        :searchable="false"
        :name="name"
        @close="focused = false"
        @open="focused = true"
        @select="onSelect"
      >
        <template slot="singleLabel" slot-scope="props">
          <slot name="singleLabel" :props="props" />
        </template>
        <template slot="option" slot-scope="props">
          <slot name="option" :props="props" />
        </template>

        <CIcon
          slot="caret"
          class="c-select__icon"
          :class="{ 'c-select__icon--first-active': isFirstActive }"
          name="chevron-round-down"
        />
      </Multiselect>
    </label>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import Multiselect from 'vue-multiselect';

export default {
  name: 'CSelect',
  components: { Multiselect, ValidationProvider },
  props: {
    name: {
      type: String,
      default: undefined,
    },
    theme: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [1, 2, 4],
    },
    selectLabel: {
      type: String,
      default: 'title',
    },
    trackBy: {
      type: String,
      default: 'id',
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
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

    value: {
      type: [String, Number, Object],
      default: undefined,
    },

    isFirstActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    onSelect(value) {
      this.focused = true;
      this.$emit('input', value);
    },
  },
};
</script>

<style scoped lang="scss">
.c-select {
  $parent: &;

  display: block;

  &__title {
    color: $color-inputs;
    margin-bottom: em(8);

    @include media-breakpoint-down(md) {
      margin-bottom: em(12);
    }
  }

  &__font {
    font-family: $font-family-mts-compact;
    font-size: em(14);
    line-height: 130%;
  }

  &__label {
    position: relative;
    display: block;
    border: 1px solid $color-border;
    padding: em(13) 0 em(13) em(12);
    background-color: $color-white;
    border-radius: em(16);

    @include media-breakpoint-down(md) {
      padding: em(10) em(35) em(10) em(12);
    }

    &--error {
      border-color: $color-red;
    }
  }

  &__icon {
    position: absolute;
    right: em(12, 17);
    top: em(14, 17);
    width: em(24, 17);
    height: em(24, 17);
    translate: 0 -5%;
    color: $color-icons-light-secondary;
    transition: rotate $trans-time;
    pointer-events: none;

    @include media-breakpoint-down(md) {
      top: em(10, 17);
    }
  }

  ::v-deep .multiselect {
    font-family: $font-family-mts-compact;
    font-size: em(17);
    font-weight: 400;
    line-height: 130%;
    cursor: pointer;

    &__placeholder {
      color: $color-inputs;
      padding-right: em(32);
    }

    &__content-wrapper {
      position: absolute;
      z-index: $zLevel8;
      overflow-y: auto;
      left: 0;
      right: 0;
      top: 0;
      background-color: $color-white;
      box-shadow: 0 em(12) em(20) 0 rgba(0, 0, 0, 0.14), 0 em(4) em(24) 0 rgba(0, 0, 0, 0.12);
      border-radius: em(16);
      padding: em(6) 0;

      &::-webkit-scrollbar {
        width: 3px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $color-black-grey;
        border-radius: 10px;
      }
    }

    &__content {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    &__element {
      width: 100%;
    }

    &__tags {
      padding-right: em(35);
    }

    &__option {
      display: block;
      width: 100%;
      font-size: em(17, 17);
      color: $color-black-grey;
      font-weight: 400;
      line-height: em(24, 17);
      padding: em(14, 17) em(12, 25);
      transition: background-color $trans-time;

      @include media-breakpoint-down(md) {
        font-size: em(14, 17);
        padding: em(6, 14) em(12, 14);
      }

      &--selected {
        pointer-events: none;
        background-color: $color-option-bg;
      }

      @include hover {
        background-color: $color-option-bg;
      }
    }

    &--active {
      #{$parent} {
        &__icon {
          rotate: 180deg;
          color: $color-red;
          pointer-events: none;
          //z-index: $zLevel9;

          &--first-active {
            color: $color-white;
          }
        }
      }
    }
  }

  &--red {
    .c-select__label {
      border: 1px solid $color-red;
      padding: em(13) em(45) em(13) em(25);
      background-color: transparent;
      border-radius: em(26);
      height: em(52);
      display: flex;
      align-items: center;
      color: $color-red;
      font-weight: 500;
      font-family: $font-family-mts-text;
      font-size: unset;
    }

    .c-select__icon {
      top: unset;
      color: $color-red;
    }

    ::v-deep .multiselect {
      $parent: &;
      font-size: unset;
      font-family: $font-family-mts-text;
      font-weight: 500;
      flex: 1;

      &__content-wrapper {
        left: em(-1);
        right: em(-1);
        top: em(-1);
        background-color: $color-white;
        border: 1px solid $color-red;
        border-radius: em(26);
        padding: 0;
      }

      &__option {
        width: 100%;
        transition: background-color $trans-time;
        height: em(52);
        display: flex;
        align-items: center;
        padding: 0 em(25);
        color: $color-red;
        font-weight: 500;
        font-size: unset;

        &--selected {
          background-color: $color-red;
          color: $color-white;
        }
      }
    }
  }

  &--black {
    .c-select__label {
      position: relative;
      z-index: 2;
      border: none;
      padding: em(13) em(13) em(13) em(25);
      background-color: $color-black;
      border-radius: em(16);
      height: em(52);
      display: flex;
      align-items: center;
      color: $color-white;
      font-weight: 500;
      font-family: $font-family-mts-text;
      font-size: unset;
    }

    .c-select__icon {
      top: unset;
      color: $color-white;
    }

    ::v-deep .multiselect {
      $parent: &;
      font-size: unset;
      font-family: $font-family-mts-text;
      font-weight: 500;
      flex: 1;

      &__placeholder {
        color: $color-white;
        padding-right: em(32);
      }

      &__content-wrapper {
        left: 0;
        right: 0;
        top: em(50);
        z-index: 1;
        padding: 0 0 0;
        border: none;
        box-shadow: 3px 3px 9px 0 rgba(47, 47, 55, 0.15);
        border-radius: 0 0 em(16) em(16);
        background-color: $color-grey;
      }

      &__option {
        width: 100%;
        transition: background-color $trans-time;
        height: em(52);
        display: flex;
        align-items: center;
        padding: 0 em(25);
        color: $color-white;
        font-weight: 500;
        font-size: unset;

        &:hover:not(:active) {
          background-color: unset;
        }

        &--selected {
          pointer-events: none;
          background-color: $color-black;
          color: $color-white;

          display: none;
        }
      }

      &--active {
        border-radius: em(16) em(16) 0 0;
        .c-select__icon {
          rotate: 180deg;
          color: $color-white;
        }
      }
    }

    &--active {
      .c-select__label {
        border-radius: em(16) em(16) 0 0;
      }
    }
  }

  &--size-s {
    .c-select__font {
      @include media-breakpoint-down(md) {
        font-size: em(12);
      }
    }

    .c-select__label {
      @include media-breakpoint-down(md) {
        height: em(50);
      }
    }

    ::v-deep .multiselect {
      @include media-breakpoint-down(md) {
        font-size: em(14);
      }

      &__option {
        @include media-breakpoint-down(md) {
          font-size: em(12);
        }
      }
    }
  }
}
</style>
