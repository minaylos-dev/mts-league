<template>
  <button class="c-button-icon" :class="[`c-button-icon--theme-${theme}`]">
    <CIcon class="c-button-icon__ico" :name="icon"></CIcon>
  </button>
</template>

<script>
import CIcon from '@/components/ui/CIcon.vue';

export default {
  components: {
    CIcon,
  },
  props: {
    icon: {
      type: String,
    },

    theme: {
      type: String,
      validator(value) {
        return ['white', 'black', 'no-border-white', 'no-border-black', 'arrow'].includes(value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.c-button-icon {
  -webkit-appearance: none;
  box-shadow: none;
  border: 2px solid;
  border-radius: 50%;
  width: em(52);
  height: em(52);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: scale 0.2s ease, opacity 0.2s ease;

  $parent: &;

  color: $color-black;

  @include hover {
    opacity: 0.6;
  }

  &:active {
    scale: 0.9;
  }

  &__ico {
    //width: em(22);
    //height: em(22);

    max-width: 100%;
    max-height: 100%;
  }

  &--theme {
    &-white {
      width: em(40);
      height: em(40);

      color: $color-white;

      #{$parent} {
        &__ico {
          width: em(22);
          height: em(22);
        }
      }
    }

    &-black {
      width: em(40);
      height: em(40);

      color: $color-black;

      #{$parent} {
        &__ico {
          width: em(22);
          height: em(22);
        }
      }
    }

    &-arrow {
      #{$parent} {
        &__ico {
          width: em(22);
          height: em(22);
        }
      }
    }

    &-no-border-white {
      border: none;
      color: $color-white;
    }

    &-no-border-black {
      border: none;
      color: $color-black;
    }
  }
}
</style>
