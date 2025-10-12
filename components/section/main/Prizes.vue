<template>
  <section class="section-main-prizes">
    <div class="section-main-prizes__content">
      <div class="section-main-prizes__title">
        <span class="section-main-prizes__font section-main-prizes__font--title"> Призы </span>
      </div>

      <div class="section-main-prizes__text">
        <span class="section-main-prizes__font section-main-prizes__font--text">
          Брендированные подарки от МТС
        </span>
      </div>
    </div>

    <img class="section-main-prizes__image" src="/images/main/prizes/bg.jpg" alt="Призы" />
  </section>
</template>

<script>
export default {
  name: 'SectionMainPrizes',
};
</script>

<style scoped lang="scss">
.section-main-prizes {
  display: flex;
  background-color: $color-light-grey;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
  }

  &__content {
    width: 100%;
    padding: em(120) em(40);

    @include media-breakpoint-down(xl) {
      padding: em(140) em(32);
    }

    @include media-breakpoint-down(lg) {
      padding: em(80) em(149) em(80) em(40);
    }

    @include media-breakpoint-down(md) {
      padding: em(40) em(100) em(40) em(16);
    }
  }

  &__title {
    color: $color-red;
    margin-bottom: em(166);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(85);
    }

    @include media-breakpoint-down(lg) {
      margin-bottom: em(48);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(32);
      color: $color-black;
    }
  }

  &__text {
    color: $color-red;
    max-width: em(400);

    @include media-breakpoint-down(lg) {
      max-width: 100%;
    }

    @include media-breakpoint-down(md) {
      max-width: em(204);
      color: $color-black;
    }
  }

  &__image {
    width: em(922);
    height: em(824);
    flex-shrink: 0;
    object-fit: cover;

    @include media-breakpoint-down(xl) {
      width: em(738);
      height: em(660);
    }

    @include media-breakpoint-down(lg) {
      width: 100%;
      height: em(650);
    }

    @include media-breakpoint-down(md) {
      height: em(340);
    }
  }

  &__font {
    &--title {
      font-size: em(80);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(lg) {
        font-size: em(64);
      }

      @include media-breakpoint-down(md) {
        font-size: em(36);
      }
    }

    &--text {
      font-size: em(40);
      font-weight: 500;
      line-height: 110%;

      @include media-breakpoint-down(lg) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }
  }
}
</style>
