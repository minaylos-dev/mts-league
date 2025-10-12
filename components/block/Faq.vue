<template>
  <div class="block-faq" :class="{ 'block-faq--opened': isOpened }">
    <div class="block-faq__head" @click="toggle">
      <div class="block-faq__question">
        <span class="block-faq__font block-faq__font--question">
          {{ question }}
        </span>
      </div>

      <CIcon v-if="hasIcon" class="block-faq__icon" name="chevron-down" />
    </div>

    <CToggleable :opened="isOpened">
      <div class="block-faq__answer">
        <span class="block-faq__font block-faq__font--answer" v-html="answer" />
      </div>
    </CToggleable>
  </div>
</template>

<script>
export default {
  name: 'BlockFaq',
  props: {
    question: {
      type: String,
      default: undefined,
    },
    answer: {
      type: String,
      default: undefined,
    },

    isOpened: {
      type: Boolean,
      default: false,
    },

    hasIcon: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>

<style scoped lang="scss">
.block-faq {
  $parent: &;

  padding: em(40) 0;

  @include media-breakpoint-down(md) {
    padding: em(20) 0;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  &__question {
    max-width: em(373);

    @include media-breakpoint-down(md) {
      max-width: em(238);
    }
  }

  &__icon {
    width: em(30);
    height: em(30);
    rotate: 0deg;
    transition: rotate $trans-time;

    @include media-breakpoint-down(md) {
      width: em(20);
      height: em(20);
    }
  }

  &__answer {
    margin-top: em(10);
    max-width: 80%;

    @include media-breakpoint-down(lg) {
      max-width: 70%;
    }

    @include media-breakpoint-down(md) {
      max-width: 80%;
    }
  }

  &__font {
    &--question {
      font-size: em(30);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(xl) {
        font-size: em(26);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--answer {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(xl) {
        font-size: em(18);
      }

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }
  }

  &--opened {
    #{$parent} {
      &__icon {
        rotate: 180deg;
      }
    }
  }
}
</style>
