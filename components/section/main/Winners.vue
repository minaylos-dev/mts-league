<template>
  <section class="section-main-winners">
    <div class="section-main-winners__background section-main-winners__background--star-top" />
    <div class="section-main-winners__background section-main-winners__background--purple" />

    <div class="section-main-winners__wrapper">
      <h1 class="section-main-winners__heading">
        <span class="section-main-winners__font section-main-winners__font--heading">
          Победители
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
  background: radial-gradient(
      60.35% 55.37% at 50.59% 48.27%,
      #87b3ff 0%,
      rgba(135, 179, 255, 0) 100%
    ),
    radial-gradient(88.45% 59.47% at 33.88% 98.79%, #bfdeff 0%, rgba(191, 222, 255, 0) 93.33%),
    linear-gradient(170deg, #bcc8ff 39.25%, #e6dfff 71.97%, #e5f1ff 93.88%);

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
      top: em(-236);
      right: em(213);
      width: em(502);
      height: em(502);
      background-image: url($img-path + 'main/intro/ball-purple.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      animation-delay: -4s;

      @include media-breakpoint-down(xl) {
        top: em(-183);
        right: em(217);
        width: em(400);
        height: em(400);
      }

      @include media-breakpoint-down(lg) {
        top: em(-106);
        right: em(43);
      }

      @include media-breakpoint-down(md) {
        top: em(-80);
        right: em(-44);
        width: em(300);
        height: em(300);
      }
    }

    &--star-top {
      z-index: $zLevel2;
      top: em(40);
      right: em(450);
      width: em(185);
      height: em(185);
      background-image: url($img-path + 'winners/intro/star.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;

      @include media-breakpoint-down(xl) {
        top: em(15);
        right: em(430);
        width: em(165);
        height: em(165);
      }

      @include media-breakpoint-down(lg) {
        top: em(73);
        right: em(220);
        width: em(200);
        height: em(200);
        background-image: url($img-path + 'winners/intro/star-mobile.png');
      }

      @include media-breakpoint-down(md) {
        top: em(50);
        right: em(50);
        width: em(175);
        height: em(175);
      }
    }

    &--pink {
      bottom: em(-40);
      right: em(-25);
      width: em(630);
      height: em(200);
      background-image: url($img-path + 'winners/intro/ball-pink.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      animation-delay: -2s;

      @include media-breakpoint-down(xl) {
        bottom: em(-30);
        width: em(504);
        height: em(165);
      }

      @include media-breakpoint-down(lg) {
        width: em(386);
        height: em(337);
        right: em(-200);
        bottom: em(-40);
        background-image: url($img-path + 'main/intro/ball-pink.png');
      }

      @include media-breakpoint-down(md) {
        bottom: em(-45);
        right: em(-130);
        width: em(223);
        height: em(195);
      }
    }

    &--star-bottom {
      z-index: $zLevel5;
      bottom: em(10);
      left: em(20);
      width: em(455);
      height: em(460);
      background-image: url($img-path + 'winners/intro/star-1.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      animation-delay: -1s;

      @include media-breakpoint-down(xl) {
        left: em(35);
        width: em(325);
        height: em(325);
      }

      @include media-breakpoint-down(lg) {
        left: em(-70);
        bottom: em(100);
        width: em(420);
        height: em(420);
        transform: rotate(-15deg);
      }

      @include media-breakpoint-down(md) {
        bottom: em(50);
        left: em(-80);
        width: em(250);
        height: em(250);
      }
    }

    &--ellipse {
      bottom: em(-5);
      left: em(-5);
      width: em(680);
      height: em(440);
      background-image: url($img-path + 'winners/intro/ellipse.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(xl) {
        width: em(544);
        height: em(325);
      }

      @include media-breakpoint-down(lg) {
        left: em(-10);
        bottom: em(-5);
        transform: rotate(10deg);
        width: em(693);
        height: em(420);
      }

      @include media-breakpoint-down(md) {
        background-image: url($img-path + 'winners/intro/ellipse-mobile.png');
        bottom: em(0);
        left: em(-10);
        transform: none;
        width: em(360);
        height: em(360);
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
