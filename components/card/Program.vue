<template>
  <div class="card-program">
    <div class="card-program__head">
      <div class="card-program__date">
        <span class="card-program__font card-program__font--date" v-html="date" />
      </div>

      <div class="card-program__number">
        <span class="card-program__font card-program__font--number">
          {{ number }}
        </span>
      </div>
    </div>

    <div class="card-program__name">
      <span class="card-program__font card-program__font--name">
        {{ name }}
      </span>
    </div>

    <div class="card-program__description">
      <span class="card-program__font card-program__font--description">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProgram',
  props: {
    number: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped lang="scss">
.card-program {
  padding: em(40);
  border-radius: em(24);
  background: rgba($color-white, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.19);
  backdrop-filter: blur(10px);
  color: $color-white;

  @include media-breakpoint-down(md) {
    padding: em(20);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: em(40);

    @include media-breakpoint-down(md) {
      margin-bottom: em(20);
    }
  }

  &__number {
    border-radius: 50%;
    // background-color: $color-red;
    width: em(80);
    height: em(80);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;

    @include media-breakpoint-down(md) {
      width: em(50);
      height: em(50);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: $color-red;
      filter: blur(15px);
      border-radius: 50%;
    }
  }

  &__name {
    text-transform: uppercase;
    margin-bottom: em(10);

    @include media-breakpoint-down(md) {
      max-width: em(220);
    }
  }

  &__description {
    max-width: em(290);

    @include media-breakpoint-down(md) {
      max-width: em(248);
    }
  }

  &__font {
    display: block;

    &--date,
    &--number {
      font-size: em(40);
      font-weight: 500;
      line-height: em(40, 40);

      @include media-breakpoint-down(md) {
        font-size: em(24);
        line-height: em(24, 24);
      }
    }

    &--number {
      position: relative;
      z-index: 10;
    }

    &--name {
      font-size: em(20);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(md) {
        font-size: em(16);
        line-height: 110%;
      }
    }

    &--description {
      font-family: $font-family-mts-text;
      font-weight: 400;
      line-height: 150%;
    }
  }
}
</style>
