<template>
  <div class="block-expert-vote-group">
    <div class="block-expert-vote-group__title">
      <span class="block-expert-vote-group__font block-expert-vote-group__font--title">
        {{ title }}
      </span>
    </div>

    <div class="block-expert-vote-group__items">
      <template v-for="(item, index) in items">
        <div v-if="item.value" :key="index" class="block-expert-vote-group__item">
          <div class="block-expert-vote-group__name">
            <span
              :key="item.name"
              v-typograph
              class="block-expert-vote-group__font block-expert-vote-group__font--name"
            >
              {{ item.name }}
            </span>
          </div>

          <div class="block-expert-vote-group__value">
            <span
              :key="item.value"
              v-typograph
              class="block-expert-vote-group__font block-expert-vote-group__font--value"
              v-html="item.value"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockExpertVoteGroup',
  props: {
    title: {
      type: String,
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.block-expert-vote-group {
  padding: em(60) 0;

  @include media-breakpoint-down(lg) {
    padding: em(50) 0;
  }

  @include media-breakpoint-down(md) {
    padding: em(20) 0 em(50);
  }

  &__title {
    color: $color-black-grey;
    margin-bottom: em(40);

    @include media-breakpoint-down(md) {
      margin-bottom: em(50);
    }
  }

  &__item {
    display: flex;
    align-items: flex-start;

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }

    &:not(:last-child) {
      margin-bottom: em(40);

      @include media-breakpoint-down(md) {
        margin-bottom: em(50);
      }
    }
  }

  &__name {
    width: em(215);
    margin-right: em(40);
    flex-shrink: 0;
    color: $color-inputs;

    @include media-breakpoint-down(md) {
      margin-right: 0;
      margin-bottom: em(28);
      width: auto;
    }
  }

  &__value {
    color: $color-black-default;
    width: 100%;
    overflow: hidden;
    min-width: 0;
  }

  &__font {
    &--title {
      font-size: em(30);
      font-weight: 500;
      line-height: 100%;
      text-transform: uppercase;

      @include media-breakpoint-down(lg) {
        font-size: em(20);
      }

      @include media-breakpoint-down(md) {
        font-size: em(18);
      }
    }

    &--name {
      font-size: em(20);
      font-weight: 500;
      line-height: 100%;
    }

    &--value {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }

      @include media-breakpoint-down(md) {
        font-size: em(14);
      }
    }
  }
}
</style>
