<template>
  <section class="rating-started">
    <div class="rating-started__wrapper">
      <div>
        <div class="rating-started__decor rating-started__decor--star" />
      </div>

      <h2 class="rating-started__title">
        <span class="rating-started__font rating-started__font--title">
          Голосование началось!
        </span>
      </h2>

      <p class="rating-started__text">
        <span v-typograph class="rating-started__font rating-started__font--text">
          Отдавай свой голос за понравившиеся проекты и определи победителя!
        </span>
      </p>

      <CButton
        text="Голосовать"
        theme="primary"
        class="rating-started__button"
        :to="staticData.routes.VOTE.BEST_EMPLOYEE"
      />
    </div>
  </section>
</template>

<script>
import routes from '@/constants/routes';

export default {
  name: 'SectionMainRatingStartedUser',
  data() {
    return {
      staticData: Object.seal({
        routes,
      }),
    };
  },
};
</script>

<style lang="scss" scoped>
.rating-started {
  padding: em(140) em(32) 0;

  @include media-breakpoint-down(lg) {
    padding: 0;
  }

  @include media-breakpoint-down(md) {
    padding: 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: em(32);
    background: linear-gradient(125deg, #dcd1ea 0, #b7b7cc 70%);

    position: relative;
    padding: em(140) em(184);
    overflow: hidden;

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }

    @include media-breakpoint-down(lg) {
      padding: em(80) em(40);
      border-radius: 0;
    }

    @include media-breakpoint-down(md) {
      padding: em(130) em(16) em(150);
    }
  }

  &__decor {
    width: em(120);
    height: em(120);
    position: absolute;
    z-index: 0;

    @include media-breakpoint-down(lg) {
      width: em(200);
      height: em(200);
    }

    @include media-breakpoint-down(md) {
      width: em(160);
      height: em(160);
    }

    &--star {
      background: url('/images/rating/like.png') no-repeat center / contain;
      width: em(648);
      height: em(506);
      bottom: em(-189);
      right: em(-158);

      @include media-breakpoint-down(lg) {
        width: em(550);
        height: em(550);
        bottom: em(-250);
        right: em(-158);
      }

      @include media-breakpoint-down(md) {
        width: em(500);
        height: em(500);
        bottom: em(-220);
        right: em(-200);
      }
    }
  }

  &__title,
  &__text {
    text-align: center;
    color: $color-white;
    position: relative;
  }

  &__title {
    font-size: unset;
    margin-bottom: em(20);
    max-width: em(848);
  }

  &__text {
    margin-bottom: em(70);
    max-width: em(668);

    @include media-breakpoint-down(lg) {
      margin-bottom: em(45);
      margin-top: 0;
      max-width: em(432);
    }
  }

  &__button {
    position: relative;
  }

  &__font {
    &--title {
      font-size: em(80);
      line-height: 100%;
      font-weight: 500;

      @include media-breakpoint-down(lg) {
        font-size: em(64);
      }

      @include media-breakpoint-down(md) {
        font-size: em(36);
      }
    }

    &--text {
      font-size: em(40);
      line-height: 110%;
      font-weight: 500;

      @include media-breakpoint-down(lg) {
        font-size: em(30);
        line-height: 100%;
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
        line-height: 100%;
      }
    }
  }
}
</style>
