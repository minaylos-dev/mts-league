<template>
  <div
    class="popup-skeleton-default"
    :class="{
      'popup-skeleton-default--mobile-fullscreen': mobileFullscreen,
      [`popup-skeleton-default--${popup}`]: popup,
    }"
  >
    <CButtonIcon
      icon="arrow-right"
      theme="white"
      class="popup-skeleton-default__button popup-skeleton-default__button--cross popup-skeleton-default__button--cross--desktop"
      @click.native="closePopup"
    />

    <CButtonIcon
      icon="cross"
      theme="no-border-white"
      class="popup-skeleton-default__button popup-skeleton-default__button--cross popup-skeleton-default__button--cross--mobile"
      @click.native="closePopup"
    />
    <!--    <button class="popup-skeleton-default__button" @click="closePopup">-->
    <!--      <slot name="icon">-->
    <!--        <CIcon class="popup-skeleton-default__icon" name="cross" />-->
    <!--      </slot>-->
    <!--    </button>-->
    <div class="popup-skeleton-default__container">
      <div class="popup-skeleton-default__head"></div>
      <div
        class="popup-skeleton-default__container"
        :class="`popup-skeleton-default__container--paddings--${paddingsSize}`"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import CButtonIcon from '@/components/ui/CButtonIcon.vue';

export default {
  name: 'PopupSkeletonDefault',
  components: { CButtonIcon },
  props: {
    popup: {
      type: String,
      default: '',
    },
    emitOnly: {
      type: Boolean,
      default: false,
    },
    mobileFullscreen: {
      type: Boolean,
      default: false,
    },
    paddingsSize: {
      type: String,
      default: 'l',
      validator(value) {
        return ['l', 'm', 's'].includes(value);
      },
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');

      if (this.emitOnly) return;

      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.popup-skeleton-default {
  position: relative;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;

  $parent: &;

  &__container {
    background-color: $color-white;
    border-radius: em(24);
  }

  &__button {
    &--cross {
      position: absolute;
      top: em(40);
      left: em(30);
      align-self: flex-end;
      rotate: 180deg;

      @include media-breakpoint-down(lg) {
        margin-left: auto;

        width: em(26);
        height: em(26);

        top: em(28);
        right: em(33);
        left: auto;
      }

      @include media-breakpoint-down(md) {
        width: em(20);
        height: em(20);

        top: em(23);
        right: em(24);
        left: auto;
      }

      &--mobile {
        display: none !important;

        @include media-breakpoint-down(lg) {
          display: block !important;
        }
      }

      &--desktop {
        @include media-breakpoint-down(lg) {
          display: none !important;
        }
      }
    }
  }

  &__head {
    display: flex;
    align-items: center;
    padding: em(40) em(40) em(20);

    @include media-breakpoint-down(xl) {
      padding: em(20) em(20) em(13) em(30);
    }

    @include media-breakpoint-down(md) {
      padding: em(20) em(20) em(13) em(30);
    }
  }

  &__button {
    margin-left: auto;
    position: absolute;
    top: em(40);
    left: em(30);
  }

  &__icon {
    width: em(40);
    color: $color-black-default;

    @include media-breakpoint-down(md) {
      width: em(36);
    }
  }

  &__container {
    max-width: em(738);

    @include media-breakpoint-down(lg) {
      max-width: em(506);
    }

    @include media-breakpoint-down(md) {
      max-width: em(288);
    }
    &--paddings {
      &--l {
        padding: 0 em(80) em(80);

        @include media-breakpoint-down(xl) {
          padding: 0 em(54) em(54);
        }

        @include media-breakpoint-down(md) {
          padding: 0 em(27) em(40);
        }
      }

      &--m {
        padding: 0 em(80) em(80);

        @include media-breakpoint-down(xl) {
          padding: 0 em(50) em(60);
        }

        @include media-breakpoint-down(md) {
          padding: 0 em(16) em(60);
        }
      }

      &--s {
        padding: 0 em(60) em(60);

        @include media-breakpoint-down(lg) {
          padding: 0 em(50) em(60);
        }

        @include media-breakpoint-down(md) {
          padding: 0 em(16) em(60);
        }
      }
    }
  }

  &--mobile-fullscreen {
    @include media-breakpoint-down(md) {
      border-radius: 0;
      height: 100%;
    }

    #{$parent} {
      &__container {
        height: 100%;
      }
    }
  }

  &--VoteEndPopup {
    #{$parent} {
      &__container {
        max-width: em(656);
      }
    }
  }
}
</style>
