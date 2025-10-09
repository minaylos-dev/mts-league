<template>
  <section class="rating-started">
    <div class="rating-started__wrapper">
      <div>
        <div class="rating-started__decor rating-started__decor--star-1" />
        <div class="rating-started__decor rating-started__decor--star-2" />
      </div>
      <h2 class="rating-started__title">
        <span class="rating-started__font rating-started__font--title"> Победители </span>
      </h2>

      <div class="rating-started__anons">
        <span class="rating-started__font rating-started__font--anons">Награждение</span> <br />
        <span
          class="rating-started__font rating-started__font--anons rating-started__font--anons-red"
          >февраль 2025</span
        >
      </div>

      <button
        class="rating-started__button rating-started__button--down"
        @click="scrollTo('#winners-rating', false, isIframe)"
      >
        <CIcon class="rating-started__icon" name="chevron-down" />
      </button>

      <!--      <CButton-->
      <!--        text="ОЦЕНИТЬ"-->
      <!--        theme="black"-->
      <!--        class="rating-started__button"-->
      <!--        :to="staticData.routes.VOTE.BEST_EMPLOYEE"-->
      <!--      />-->
    </div>
  </section>
</template>

<script>
import routes from '@/constants/routes';

import { scrollTo } from '@/tools/helpers';

import { mapGetters } from 'vuex';

export default {
  name: 'SectionMainRatingStartedExpert',
  data() {
    return {
      staticData: Object.seal({
        routes,
      }),
    };
  },

  computed: {
    ...mapGetters({
      isIframe: 'auth/isIframe',
    }),
  },

  methods: {
    scrollTo,
  },
};
</script>

<style lang="scss" scoped>
.rating-started {
  padding: 0;
  height: em(694);
  overflow: hidden;

  @include media-breakpoint-down(lg) {
    height: em(580);
  }

  @include media-breakpoint-down(md) {
    height: em(544);
  }

  &__anons {
    padding: em(16) em(32);
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.1);
    border-radius: em(24);
    color: $color-white;
    text-align: center;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(48deg, #b8b9d5 3.8%, #dbdbe3 100%);
    height: 100%;
    position: relative;

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }

    @include media-breakpoint-down(md) {
      justify-content: flex-start;
      padding-top: em(167);
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

    &--star-1 {
      background: url('/images/rating/emoji.png') no-repeat center / contain;
      width: em(345);
      height: em(345);
      top: em(-45);
      right: em(-31);

      @include media-breakpoint-down(lg) {
        width: em(220);
        height: em(220);
        top: em(-30);
        right: em(-11);
      }

      @include media-breakpoint-down(md) {
        width: em(220);
        height: em(220);
        top: em(-20);
        right: em(-16);
      }
    }
    &--star-2 {
      background: url('/images/rating/left.png') no-repeat center / contain;
      width: em(700);
      height: em(700);
      bottom: em(-5);
      left: em(-50);

      @include media-breakpoint-down(lg) {
        top: auto;
        width: em(450);
        height: em(450);
        bottom: em(-35);
        left: em(-43);
      }

      @include media-breakpoint-down(md) {
        width: em(490);
        height: em(490);
        top: auto;
        bottom: 0;
        left: em(-90);
      }
    }
  }

  &__title {
    font-size: unset;
    text-align: center;
    color: $color-white;
    margin: 0 0 em(40);

    @include media-breakpoint-up(lg) {
      margin: 0 0 em(60);
    }

    @include media-breakpoint-down(md) {
      margin: 0 0 em(14);
    }
  }

  &__icon {
    color: $color-light-blue;
    width: 60%;
    height: 60%;
    translate: 0 10%;
  }

  &__button {
    width: em(187);
    height: em(52);
    animation: levitate linear infinite 2s;

    &--down {
      position: absolute;
      bottom: em(40);
      left: 50%;
      transform: translateX(-50%);

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $color-white;
      width: em(52);
      height: em(52);
      border-radius: 50%;
      margin-right: em(10);

      @include media-breakpoint-down(lg) {
        margin-bottom: em(10);
      }

      @include media-breakpoint-down(md) {
        width: em(40);
        height: em(40);
      }
    }
  }

  &__font {
    &--title {
      font-size: em(160);
      line-height: 1;
      font-weight: 500;

      @include media-breakpoint-down(lg) {
        font-size: em(98);
      }

      @include media-breakpoint-down(md) {
        font-size: em(41);
      }
    }

    &--anons {
      font-weight: $medium;
      font-size: em(32);
      line-height: 120%;
      text-align: center;

      @include media-breakpoint-down(lg) {
        font-size: em(26);
      }

      @include media-breakpoint-down(md) {
        font-size: em(18);
      }

      &-red {
        color: $color-red;
      }
    }
  }
}
</style>
