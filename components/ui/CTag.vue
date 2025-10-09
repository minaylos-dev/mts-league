<template>
  <button
    ref="tag"
    :type="type"
    class="c-tag"
    :class="[`c-tag--size--${size}`, { 'c-tag--active': isActive }]"
    :disabled="disabled"
    @mouseenter="animateTextEnter"
    @mouseleave="animateTextLeave"
    @click="onClick"
  >
    <CIcon ref="icon" class="c-tag__icon" path="tags" :name="iconName" />

    <span ref="name" class="c-tag__name">
      <span class="c-tag__font c-tag__font--name">
        {{ title }}
      </span>
    </span>

    <span ref="text" class="c-tag__text">
      <span class="c-tag__font c-tag__font--text">
        {{ description }}
      </span>
    </span>
  </button>
</template>

<script>
import gsap from 'gsap';

import breakpoints from '@/config/breakpoints';

export default {
  name: 'CTag',
  props: {
    title: {
      type: String,
      default: undefined,
    },
    iconName: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'button',
    },

    size: {
      type: String,
      default: 'adaptive',
      validator(value) {
        return ['s', 'l', 'adaptive', 'adaptive-mobile', 'adaptive-application', 'rating'].includes(
          value
        );
      },
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    disabledClick: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClicked: false,
      isHovered: false,
      isAnimatingEnter: false,
      isAnimatingLeave: false,

      staticData: Object.seal({
        mobileBreakpoint: breakpoints.tablet,
        animationDuration: 0.3,
      }),
    };
  },
  watch: {
    isActive(value) {
      if (value) {
        gsap.to(this.$refs.tag, {
          duration: this.staticData.animationDuration / 4,
          backgroundColor: '#FF0032',
          color: 'white',
        });
      } else {
        gsap.to(this.$refs.tag, {
          duration: this.staticData.animationDuration / 4,
          backgroundColor: 'transparent',
          color: '#FF0032',
        });
      }
    },
  },
  methods: {
    // Text animation
    animateTextEnter() {
      this.isHovered = true;

      if (
        window.innerWidth <= this.staticData.mobileBreakpoint ||
        this.isClicked ||
        this.isAnimatingLeave
      )
        return;

      this.isAnimatingEnter = true;

      gsap.to(this.$refs.text, {
        duration: this.staticData.animationDuration,
        width: 'auto',
        autoAlpha: 1,
        onComplete: () => {
          this.isAnimatingEnter = false;
        },
      });
      gsap.to(this.$refs.name, {
        duration: this.staticData.animationDuration,
        width: 0,
        autoAlpha: 0,
      });
      gsap.to(this.$refs.icon?.$el, {
        duration: this.staticData.animationDuration,
        width: 0,
        autoAlpha: 0,
      });
    },
    animateTextLeave() {
      this.isHovered = false;

      if (this.isAnimatingEnter)
        return setTimeout(this.animateTextLeave, this.staticData.animationDuration * 1000);

      if (window.innerWidth <= this.staticData.mobileBreakpoint) return;

      this.isAnimatingLeave = true;

      gsap.to(this.$refs.text, {
        duration: this.staticData.animationDuration,
        width: 0,
        autoAlpha: 0,
      });
      gsap.to(this.$refs.name, {
        duration: this.staticData.animationDuration,
        width: 'auto',
        autoAlpha: 1,
        onComplete: () => {
          this.isAnimatingLeave = false;

          if (this.isHovered) {
            this.animateTextEnter();
          }
        },
      });
      gsap.to(this.$refs.icon?.$el, {
        duration: this.staticData.animationDuration,
        width: 'auto',
        autoAlpha: 1,
      });
    },

    // Tag animation
    animateClickEnter() {
      if (this.isClicked) return;

      this.isClicked = true;

      gsap.to(this.$refs.tag, {
        duration: this.staticData.animationDuration / 4,
        backgroundColor: '#FF0032',
        color: 'white',
      });
    },
    animateClickLeave() {
      this.isClicked = false;

      gsap.to(this.$refs.tag, {
        duration: this.staticData.animationDuration / 4,
        backgroundColor: 'transparent',
        color: '#FF0032',
      });
    },

    onClick() {
      if (this.disabledClick) return;

      this.$emit('click');

      // Remove hover
      this.animateTextLeave();

      // Animate active
      this.animateClickEnter();

      setTimeout(() => {
        if (!this.isActive) {
          this.animateClickLeave();
        }
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.c-tag {
  $parent: &;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: em(80);
  color: $color-red;
  transition: color $trans-time-fast, background-color $trans-time-fast;

  &:disabled {
    pointer-events: none;
  }

  &__name {
    overflow: hidden;
    padding-bottom: em(2);
    white-space: nowrap;
  }

  &__text {
    width: 0;
    opacity: 0;
    visibility: hidden;
    white-space: nowrap;
    overflow: hidden;
  }

  &__font {
    &--name {
      font-weight: 500;
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: em(20, 20);
      font-weight: 400;
    }
  }

  &--size {
    &--adaptive {
      padding: em(30) em(50);
      border: em(2) solid $color-red;

      @include media-breakpoint-down(lg) {
        padding: em(14) em(25);
        border-width: 1px;
      }

      #{$parent} {
        &__icon {
          width: em(36);
          height: em(36);
          margin-right: em(20);

          @include media-breakpoint-down(lg) {
            width: em(22);
            height: em(22);
            margin-right: em(10);
          }
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(36);
            line-height: em(36, 36);

            @include media-breakpoint-down(lg) {
              font-size: em(16);
              line-height: em(16);
            }
          }
        }
      }
    }

    &--adaptive-application {
      padding: em(30) em(50);
      border: em(2) solid $color-red;

      @include media-breakpoint-down(lg) {
        padding: em(14) em(25);
        border-width: 1px;
      }

      #{$parent} {
        &__icon {
          width: em(36);
          height: em(36);
          margin-right: em(20);
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(36);
            line-height: em(36, 36);

            @include media-breakpoint-down(lg) {
              font-size: em(20);
              line-height: em(20, 20);
            }
          }
        }
      }
    }

    &--adaptive-mobile {
      padding: em(30) em(50);
      border: em(2) solid $color-red;

      @include media-breakpoint-down(md) {
        padding: em(14) em(25);
        border-width: 1px;
      }

      #{$parent} {
        &__icon {
          width: em(36);
          height: em(36);
          margin-right: em(20);

          @include media-breakpoint-down(md) {
            width: em(22);
            height: em(22);
            margin-right: em(10);
          }
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(36);
            line-height: em(36, 36);

            @include media-breakpoint-down(md) {
              font-size: em(16);
              line-height: em(16);
            }
          }
        }
      }
    }

    &--l {
      padding: em(30) em(50);
      border: em(2) solid $color-red;

      #{$parent} {
        &__icon {
          width: em(36);
          height: em(36);
          margin-right: em(20);
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(36);
            line-height: 1;
          }
        }
      }
    }

    &--s {
      padding: em(14) em(25);
      border: 1px solid $color-red;

      #{$parent} {
        &__icon {
          width: em(22);
          height: em(22);
          margin-right: em(10);
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(16);
            line-height: em(16);
          }
        }
      }
    }

    &--rating {
      padding: em(14) em(35);
      border: 1px solid $color-red;

      @include media-breakpoint-down(lg) {
        padding: em(8) em(25);
      }

      #{$parent} {
        &__icon {
          width: em(22);
          height: em(22);
          margin-right: em(10);

          @include media-breakpoint-down(lg) {
            width: em(18);
            height: em(18);
          }
        }

        &__font {
          &--name {
            font-family: $font-family-mts-text;
            font-size: em(16);
            line-height: em(16);

            @include media-breakpoint-down(lg) {
              font-size: em(12);
              line-height: em(24, 12);
            }
          }
        }
      }
    }
  }

  &--active {
    background-color: $color-red;
    color: $color-white;
  }
}
</style>
