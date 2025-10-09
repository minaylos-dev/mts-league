<template>
  <div class="anons-block">
    <div class="anons-block__decor anons-block__decor anons-block__decor--1"></div>
    <div class="anons-block__decor anons-block__decor anons-block__decor--2"></div>
    <div class="anons-block__decor anons-block__decor anons-block__decor--3"></div>

    <img class="anons-block__logo" src="/images/logo.svg" alt="logo" />
    <div class="anons-block__holder">
      <div class="anons-block__title">
        <h2 class="anons-block__font anons-block__font--title">ЛИГА МТС</h2>
      </div>
      <div class="anons-block__text">
        <p class="anons-block__font anons-block__font--text">
          Первый этап программы стартует 28 октября
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnonsBlock',
};
</script>

<style scoped lang="scss">
.anons-block {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
    radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
    radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%),
    radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);

  &__font {
    &--title {
      font-weight: $medium;
      font-size: em(120);
      line-height: 100%;
      text-align: center;
      color: $color-white;

      @include media-breakpoint-down(lg) {
        font-size: em(100);
      }

      @include media-breakpoint-down(md) {
        font-size: em(80);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;
      text-align: center;
      color: $color-black;

      @include media-breakpoint-down(lg) {
        font-size: em(20);
      }

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }
  }

  &__decor {
    position: absolute;
    z-index: $zLevel0;

    &--1 {
      width: em(940);
      height: em(695);
      background: url($img-path + 'anons/square.png') center / contain no-repeat;
      bottom: 0;
      left: em(-150);

      @include media-breakpoint-down(lg) {
        background: url($img-path + 'anons/square-768.png') center / contain no-repeat;
        width: em(900);
        height: em(650);
        bottom: 0;
        left: em(-170);
      }

      @include media-breakpoint-down(md) {
        background: url($img-path + 'anons/square-320.png') center / contain no-repeat;
        width: em(500);
        height: em(350);
        bottom: 0;
        left: em(-100);
      }
    }

    &--2 {
      width: em(500);
      height: em(400);
      background: url($img-path + 'anons/like.png') center / contain no-repeat;
      bottom: em(55);
      right: 0;

      @include media-breakpoint-down(lg) {
        width: em(460);
        height: em(360);
        bottom: em(85);
        right: 0;
      }

      @include media-breakpoint-down(md) {
        width: em(255);
        height: em(155);
        bottom: em(40);
        right: em(-15);
      }
    }

    &--3 {
      width: em(600);
      height: em(500);
      background: url($img-path + 'anons/smile.png') center / contain no-repeat;
      top: em(-20);
      right: 0;

      @include media-breakpoint-down(lg) {
        background: url($img-path + 'anons/smile-768.png') center / contain no-repeat;
        width: em(570);
        height: em(470);
        top: 0;
        right: 0;
      }

      @include media-breakpoint-down(md) {
        background: url($img-path + 'anons/smile-320.png') center / contain no-repeat;
        width: em(320);
        height: em(220);
        top: 0;
        right: em(-35);
      }
    }
  }

  &__holder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    z-index: $zLevel1;
  }

  &__title {
    position: relative;
    top: em(12);
    margin-bottom: em(16);

    @include media-breakpoint-down(lg) {
      top: em(0);
      margin-bottom: 0;
    }
  }

  &__text {
    @include media-breakpoint-down(md) {
      max-width: em(280);
    }
  }

  &__logo {
    width: em(80);
    height: em(80);
    position: absolute;
    top: 0;
    left: 0;

    @include media-breakpoint-down(lg) {
      width: em(56);
      height: em(56);
    }

    @include media-breakpoint-down(md) {
      width: em(46);
      height: em(46);
    }
  }
}
</style>
