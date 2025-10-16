<template>
  <section class="section-announce" @mousemove="moveObject">
    <div class="section-announce__background section-announce__background--right-top" />
    <div class="section-announce__background section-announce__background--right-bottom" />
    <div class="section-announce__background section-announce__background--left-bottom" />
    <div class="section-announce__background section-announce__background--ellipse" />

    <div class="section-announce__container">
      <div class="section-announce__title">
        <h1 class="section-announce__font section-announce__font--title">
          <span>Лига МТС</span>
          <span>2025</span>
        </h1>
      </div>
      <p class="section-announce__paragraph">
        <span>Мы обновляем платформу, скоро тут появится информация.</span>
        <span>Объявим о старте программы на нашем портале</span>
      </p>
      <div class="section-announce__button">
        <CButton theme="red-white" text="На портал" :disabled="!agreement" @click="onNext" />
      </div>
    </div>
  </section>
</template>

<script>
import routes from '@/constants/routes';

import { mapGetters } from 'vuex';

export default {
  name: 'SectionWinnersIntro',
  data() {
    return {
      staticData: Object.seal({
        routes,
        steps: ['Выбирай номинацию ', 'Номинируй себя или коллегу', 'Голосуй'],
      }),
      objectPosition: { x: 0, y: 0 },
    };
  },
  computed: {
    ...mapGetters({
      isIframe: 'auth/isIframe',
    }),
  },
  methods: {
    moveObject(event) {
      this.objectPosition.x = event.clientX * 0.02;
      this.objectPosition.y = event.clientY * 0.02;
    },
  },
};
</script>

<style scoped lang="scss">
.section-announce {
  position: relative;
  padding: 0 em(40);
  overflow: hidden;
  background: linear-gradient(125deg, #dcd1ea 0, #b7b7cc 70%);

  height: em(694);
  display: flex;
  flex-direction: column;

  @include media-breakpoint-down(lg) {
    padding: em(95) em(40) em(40);

    height: em(943);

    display: block;
  }

  @include media-breakpoint-down(md) {
    padding: em(65) em(16) 0;

    height: em(568);
  }

  @include media-breakpoint-down(sm) {
    padding: em(65) em(16) 0;

    height: em(600);
  }

  &__background {
    position: absolute;
    z-index: $zLevel1;

    &--right-top {
      z-index: $zLevel3;
      width: em(692);
      height: em(452);
      right: 0;
      top: em(-130);
      background-image: url('/images/announce/right-top.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(lg) {
        width: em(449);
        height: em(281);
        right: em(30);
        top: em(26);
      }

      @include media-breakpoint-down(md) {
        width: em(235);
        height: em(140);
        right: 0;
        top: em(35);
      }
    }

    &--right-bottom {
      z-index: $zLevel3;
      width: em(243);
      height: em(223);
      right: em(224);
      bottom: em(70);
      background-image: url('/images/announce/right-bottom.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(lg) {
        width: em(188);
        height: em(190);
        right: em(97);
        bottom: em(150);
      }

      @include media-breakpoint-down(md) {
        width: em(88);
        height: em(71);
        right: em(31);
        bottom: em(117);
      }
    }

    &--left-bottom {
      z-index: $zLevel2;
      width: em(525);
      height: em(515);
      left: em(80);
      bottom: em(0);
      background-image: url('/images/announce/left-bottom.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(lg) {
        width: em(301);
        height: em(334);
        left: em(80);
        bottom: em(145);
      }

      @include media-breakpoint-down(md) {
        width: em(160);
        height: em(169);
        left: 0;
        bottom: em(19);
      }
    }

    &--ellipse {
      z-index: $zLevel2;
      width: 921px;
      height: 460px;
      right: em(-102);
      top: em(-114);
      border: 3px solid #c7c2d9;
      border-radius: 50%;
      transform: rotate(156deg);
      box-sizing: border-box;
      background: transparent;

      @include media-breakpoint-down(lg) {
        width: em(669);
        height: em(334);
        right: em(-101);
        top: em(50);
      }

      @include media-breakpoint-down(md) {
        width: em(285);
        height: em(142);
        right: em(-19);
        top: em(19);
      }
    }
  }

  &__container {
    position: relative;
    z-index: $zLevel4;
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
    flex: 1;

    @include media-breakpoint-down(lg) {
      height: 100%;
    }

    @include media-breakpoint-down(md) {
      padding-bottom: em(21);
    }
  }

  &__steps {
    display: flex;
    justify-content: center;
    margin-top: auto;

    @include media-breakpoint-down(lg) {
      margin-bottom: em(40);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(13);
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    font-size: em(12);
    height: em(52);
  }

  &__title {
    text-align: center;
    color: $color-white;
    margin-bottom: em(16);
    // margin-top: em(100);

    // @include media-breakpoint-down(lg) {
    //   margin-top: em(290);
    // }

    // @include media-breakpoint-down(md) {
    //   margin-top: em(155);
    // }
  }

  &__font {
    &--title {
      font-size: em(80);
      line-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      @include media-breakpoint-down(sm) {
        font-size: em(40);
      }
    }

    &--heading {
      font-size: em(48);
      line-height: 90%;

      @include media-breakpoint-down(md) {
        font-size: em(22);
        line-height: 90%;
      }
    }

    &--subheading {
      font-size: em(14);
      line-height: 100%;

      @include media-breakpoint-down(md) {
        line-height: 90%;
        font-size: em(6);
      }
    }

    &--step {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }
  }

  &__paragraph {
    font-family: $font-family-mts-text-name;
    font-weight: 400;
    font-size: em(20);
    line-height: 130%;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: $color-black-grey;
    margin-bottom: em(40);
    margin-top: 0;
  }
}
</style>
