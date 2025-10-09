<template>
  <div class="block-expert-vote-rate">
    <div class="block-expert-vote-rate__title">
      <span v-typograph class="block-expert-vote-rate__font block-expert-vote-rate__font--title">
        {{ title }}
      </span>
    </div>

    <div class="block-expert-vote-rate__text">
      <span v-typograph class="block-expert-vote-rate__font block-expert-vote-rate__font--text">
        {{ text }}
      </span>
    </div>

    <CRatingSelect v-model="localValue" :max-value="10" />
  </div>
</template>

<script>
import CRatingSelect from '@/components/ui/CRatingSelect.vue';

export default {
  name: 'BlockExpertVoteRate',
  components: { CRatingSelect },
  props: {
    title: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },

    value: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.block-expert-vote-rate {
  &__title {
    color: $color-black-grey;
    margin-bottom: em(20);

    @include media-breakpoint-down(md) {
      margin-bottom: em(28);
    }
  }

  &__text {
    color: $color-black;
    margin-bottom: em(20);
    max-width: em(620);

    @include media-breakpoint-down(lg) {
      max-width: em(588);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(28);
      max-width: em(256);
    }
  }

  &__font {
    &--title {
      font-size: em(30);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(lg) {
        font-size: em(20);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }
    }
  }
}
</style>
