<template>
  <section class="section-main-winners">
    <div class="section-main-winners__background section-main-winners__background--star-top" />
    <div class="section-main-winners__background section-main-winners__background--purple" />

    <div class="section-main-winners__wrapper">
      <h1 class="section-main-winners__heading">
        <span class="section-main-winners__font section-main-winners__font--heading">
          Награждение
        </span>
      </h1>

      <div class="section-main-winners__date">
        <span class="section-main-winners__font section-main-winners__font--date">
          Награждение
        </span>
        <br />
        <span class="section-main-winners__font section-main-winners__font--date-accent">
          февраль 2025
        </span>
      </div>

      <button class="section-main-winners__button" @click="scrollTo('#winners-rating', false)">
        <CIcon class="section-main-winners__icon" name="chevron-down" />
      </button>
    </div>

    <div class="section-main-winners__background section-main-winners__background--star-bottom" />
    <div class="section-main-winners__background section-main-winners__background--ellipse" />
    <div class="section-main-winners__background section-main-winners__background--pink" />
  </section>
</template>

<script>
import { scrollTo } from '@/tools/helpers';
export default {
  name: 'SectionMainWinners',
  methods: {
    scrollTo,
  },
};
</script>

<style scoped lang="scss">
.section-main-winners {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: em(279) 0 em(40);
  overflow: hidden;
  background: linear-gradient(125deg, #dcd1ea 0, #b7b7cc 70%);

  @include media-breakpoint-down(xl) {
    padding: em(195) 0 em(40);
  }

  @include media-breakpoint-down(lg) {
    padding: em(327) 0 em(40);
  }

  @include media-breakpoint-down(md) {
    padding: em(202) em(16) em(20);
  }

  &__background {
    position: absolute;
    z-index: $zLevel1;

    &--purple {
      top: em(260);
      right: em(400);
      width: em(105);
      height: em(105);
      background-image: url('/images/main/winners/star-center.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      animation-delay: -4s;

      @include media-breakpoint-down(xl) {
        top: em(170);
        right: em(217);
      }

      @include media-breakpoint-down(lg) {
        right: em(43);
      }

      @include media-breakpoint-down(md) {
        top: em(70);
        right: em(-5);
      }
    }

    &--star-top {
      z-index: $zLevel2;
      top: em(-30);
      left: em(450);
      right: auto;
      width: em(248);
      height: em(248);
      background-image: url('/images/main/winners/star-top.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;

      @include media-breakpoint-down(xl) {
        top: em(15);
        right: em(430);
      }

      @include media-breakpoint-down(lg) {
        top: em(73);
        right: em(220);
        background-image: url($img-path + 'winners/intro/star-mobile.png');
      }

      @include media-breakpoint-down(md) {
        top: em(50);
        left: em(-70);
        right: auto;
      }
    }

    &--pink {
      bottom: em(-220);
      right: em(-250);
      width: em(740);
      height: em(585);
      background-image: url('/images/main/winners/winning-prize.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      animation-delay: -2s;

      @include media-breakpoint-down(xl) {
        bottom: em(-200);
      }

      @include media-breakpoint-down(lg) {
        right: em(-200);
        bottom: em(-280);
        // background-image: url($img-path + 'main/intro/ball-pink.png');
      }

      @include media-breakpoint-down(md) {
        bottom: em(-280);
        right: em(-380);
      }
    }

    &--ellipse {
      bottom: em(0);
      left: em(-100);
      width: em(544);
      height: em(325);
      background-image: url('/images/main/winners/star-left.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(xl) {
        width: em(200);
        height: em(200);
      }

      @include media-breakpoint-down(lg) {
        left: em(-50);
        bottom: em(-5);
        transform: rotate(10deg);
        width: em(200);
        height: em(200);
      }

      @include media-breakpoint-down(md) {
        background-image: url('/images/main/winners/star-left.png');
        bottom: em(0);
        left: em(-80);
        transform: none;
        width: em(200);
        height: em(200);
      }
    }
  }

  &__wrapper {
    position: relative;
    z-index: $zLevel4;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    @include media-breakpoint-down(lg) {
      z-index: $zLevel7;
    }
  }

  &__heading {
    font-size: em(16);
    color: $color-white;
    text-align: center;
    margin-bottom: em(24);

    @include media-breakpoint-down(md) {
      margin-bottom: em(12);
    }
  }

  &__date {
    padding: em(16) em(32);
    border-radius: em(24);
    border: 1px solid rgba(255, 255, 255, 0.19);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    margin-bottom: em(164);
    color: $color-white;
    text-align: center;

    @include media-breakpoint-down(xl) {
      margin-bottom: em(120);
    }

    @include media-breakpoint-down(lg) {
      margin-bottom: em(295);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(173);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-white;
    width: em(52);
    height: em(52);
    border-radius: 50%;
    margin-top: auto;
    animation: levitate linear infinite 2s;

    @include media-breakpoint-down(md) {
      width: em(40);
      height: em(40);
    }
  }

  &__icon {
    color: $color-light-blue;
    width: 60%;
    height: 60%;
    translate: 0 10%;
  }

  &__font {
    &--heading {
      font-size: em(200);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(xl) {
        font-size: em(160);
      }

      @include media-breakpoint-down(lg) {
        font-size: em(98);
      }

      @include media-breakpoint-down(md) {
        font-size: em(41);
      }
    }

    &--date,
    &--date-accent {
      font-size: em(32);
      font-weight: 500;
      line-height: 120%;

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--date-accent {
      color: $color-red;
    }
  }
}
</style>
