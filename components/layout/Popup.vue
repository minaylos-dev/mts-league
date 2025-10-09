<template>
  <Transition :name="transitionName" @before-enter="setPopupName">
    <div
      v-if="popup"
      ref="popup"
      class="popup"
      :class="[
        `popup--${popupName}`,
        popupClass,
        { 'popup--with-background': !isBackgroundDisabled },
      ]"
      @click.self="closePopup(true)"
      @mouseup="setWrapperClicked(false)"
    >
      <div class="popup__inner" :class="wrapperClass" @mousedown="setWrapperClicked(true)">
        <component
          :is="popup && popup.name"
          ref="componentIs"
          class="popup__component"
          :data="popup && popup.data"
        >
        </component>
      </div>
    </div>
  </Transition>
</template>

<script>
import CButtonIcon from '@/components/ui/CButtonIcon.vue';

const AuthCodePopup = () => import('@/components/popup/AuthCodePopup.vue');
const MobileInfoPopup = () => import('@/components/popup/MobileInfoPopup.vue');
const MobileMenuPopup = () => import('@/components/popup/MobileMenuPopup.vue');
const FeedbackPopup = () => import('@/components/popup/FeedbackPopup.vue');
const NominationsPopup = () => import('@/components/popup/NominationsPopup.vue');
const ImageCropPopup = () => import('@/components/popup/ImageCropPopup.vue');
const InfoPopup = () => import('@/components/popup/InfoPopup.vue');
const LogoutPopup = () => import('@/components/popup/LogoutPopup.vue');
const VoteRulesPopup = () => import('@/components/popup/VoteRulesPopup.vue');
const VoteStartPopup = () => import('@/components/popup/VoteStartPopup.vue');
const VoteEndPopup = () => import('@/components/popup/VoteEndPopup.vue');
const VotedPopup = () => import('@/components/popup/VotedPopup.vue');
const ExpertVotePopup = () => import('@/components/popup/ExpertVotePopup.vue');
const VotePointsPopup = () => import('@/components/popup/VotePointsPopup.vue');

export default {
  name: 'Popup',
  components: {
    CButtonIcon,
    AuthCodePopup,
    MobileInfoPopup,
    MobileMenuPopup,
    FeedbackPopup,
    NominationsPopup,
    ImageCropPopup,
    InfoPopup,
    LogoutPopup,
    VoteRulesPopup,
    VoteStartPopup,
    VoteEndPopup,
    VotedPopup,
    ExpertVotePopup,
    VotePointsPopup,
  },

  props: {
    level: {
      type: Number,
      default: 1,
    },

    popupClass: {
      type: String,
      default: '',
    },

    wrapperClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      popup: null,
      popupName: null,
      wrapperClicked: false,
      clickOutsideClose: true,

      staticData: Object.seal({
        defaultTransitionName: 'fade',
      }),
    };
  },

  computed: {
    transitionName() {
      if (!this.popup) return this.staticData.defaultTransitionName;

      return this.popup.data?.transitionName || this.staticData.defaultTransitionName;
    },
    isBackgroundDisabled() {
      return this.popup.data?.disableBackground;
    },
  },

  mounted() {
    this.$eventBus.$on(`openPopup${this.level}`, this.changePopup);
    this.$eventBus.$on(`closePopup${this.level}`, this.closePopup);
  },

  beforeDestroy() {
    this.$eventBus.$off(`openPopup${this.level}`, this.changePopup);
    this.$eventBus.$off(`closePopup${this.level}`, this.closePopup);
  },

  methods: {
    changePopup(popup) {
      if (popup) {
        this.popup = popup;
        this.clickOutsideClose = !popup.data?.disableClickOutside;
      } else {
        this.clickOutsideClose = true;
        this.closePopup();
      }
    },

    setWrapperClicked(value) {
      setTimeout(() => {
        this.wrapperClicked = value;
      });
    },

    setPopupName() {
      this.popupName = this.popup ? this.popup.name : null;
    },

    closePopup(overlayClicked) {
      if (overlayClicked && !this.clickOutsideClose) return;
      if (typeof overlayClicked === 'boolean' && overlayClicked && this.wrapperClicked) return;

      this.$eventBus.$emit('close-popup', this.popup);

      this.popup = null;
    },

    lockBody(needLock) {
      const { popup } = this.$refs;

      if (needLock) this.$bodyLock.lock(popup);
      else this.$bodyLock.unlock(popup);
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  $parent: &;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  transition: opacity $trans-time;

  &__inner {
    position: relative;
    z-index: $zLevel3;
    max-height: 100%;
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

  &--with-background {
    background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
      radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
      radial-gradient(
        88.91% 74.62% at 86.33% 94.09%,
        rgb(218, 218, 228) 0%,
        rgb(218, 218, 228) 100%
      ),
      radial-gradient(
        91.35% 58.22% at 53.95% 115.88%,
        rgb(234, 233, 231) 0%,
        rgb(234, 233, 231) 100%
      );
  }

  &--AuthCodePopup,
  &--FeedbackPopup {
    @include media-breakpoint-down(md) {
      padding: 0 em(16);
    }

    #{$parent} {
      &__inner {
        width: em(800);

        @include media-breakpoint-down(xl) {
          width: em(570);
        }

        @include media-breakpoint-down(md) {
          width: 100%;
        }
      }
    }
  }

  &--MobileInfoPopup,
  &--NominationsPopup {
    width: 100%;
    align-items: flex-end;

    #{$parent} {
      &__inner {
        width: 100%;
      }
    }
  }

  &--MobileMenuPopup {
    width: 100%;
    min-height: 100%;

    #{$parent} {
      &__inner {
        width: 100%;
        height: 100%;
      }
    }
  }

  &--ImageCropPopup {
    #{$parent} {
      &__inner {
        width: em(800);

        @include media-breakpoint-down(xl) {
          width: em(600);
        }

        @include media-breakpoint-down(lg) {
          width: em(520);
        }

        @include media-breakpoint-down(md) {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  //&--VoteRulesPopup,
  //&--VoteStartPopup,
  //&--VoteEndPopup,
  //&--VotedPopup {
  //  @include media-breakpoint-down(md) {
  //    padding: 0 em(16);
  //  }
  //
  //  #{$parent} {
  //    &__inner {
  //      width: em(800);
  //
  //      @include media-breakpoint-down(xl) {
  //        width: em(666);
  //      }
  //
  //      @include media-breakpoint-down(lg) {
  //        width: em(506);
  //      }
  //
  //      @include media-breakpoint-down(md) {
  //        width: 100%;
  //      }
  //    }
  //  }
  //}

  &--ExpertVotePopup {
    padding-top: em(120);

    @include media-breakpoint-down(lg) {
      padding-top: em(92);
    }

    @include media-breakpoint-down(md) {
      padding: em(90) em(16) 0;
    }

    #{$parent} {
      &__inner {
        width: em(870);

        @include media-breakpoint-down(lg) {
          width: em(688);
        }

        @include media-breakpoint-down(md) {
          width: 100%;
          max-width: em(320);
        }
      }
    }
  }

  &--VotePointsPopup {
    #{$parent} {
      &__inner {
        width: em(800);

        @include media-breakpoint-down(lg) {
          width: em(688);
        }

        @include media-breakpoint-down(md) {
          width: 100%;
          max-width: em(320);
        }
      }
    }
  }
}

// Transitions

// Slide top
.slide-top-enter {
  translate: 0 -100%;
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: translate $trans-time ease;
}

.slide-top-enter-from,
.slide-top-leave-to {
  translate: 0 -100%;
}

// Slide bottom
.slide-bottom-enter {
  translate: 0 100%;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: translate $trans-time ease;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  translate: 0 100%;
}
</style>
