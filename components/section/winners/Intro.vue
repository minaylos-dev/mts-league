<template>
  <section class="section-winner-intro" @mousemove="moveObject">
    <div class="section-winner-intro__background section-winner-intro__background--prize" />
    <div class="section-winner-intro__background section-winner-intro__background--smile" />

    <div class="section-winner-intro__container">
      <div class="section-winner-intro__logo">
        <h3 class="section-winner-intro__heading">
          <span class="section-winner-intro__font section-winner-intro__font--heading">
            Лига МТС
          </span>
        </h3>

        <div class="section-winner-intro__subheading">
          <span class="section-winner-intro__font section-winner-intro__font--subheading">
            Лучшие выбирают лучших
          </span>
        </div>
      </div>

      <div class="section-winner-intro__title">
        <h1 class="section-winner-intro__font section-winner-intro__font--title">Победители</h1>
      </div>

      <div class="section-winner-intro__button section-winner-intro__button--down">
        <CIcon class="section-winner-intro__icon" name="chevron-down" />
      </div>
    </div>
  </section>
</template>

<script>
import routes from '@/constants/routes';
import { scrollTo } from '@/tools/helpers';

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
    handleNavigation(id) {
      if (this.$route.name === 'index') {
        scrollTo(id, this.$device.isMobile, this.isIframe);
      } else {
        this.$router.push({ path: routes.MAIN, hash: id });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.section-winner-intro {
  position: relative;
  padding: em(95) em(40) 0;

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

  &__background {
    position: absolute;
    z-index: $zLevel1;

    &--prize {
      z-index: $zLevel2;
      width: em(900);
      height: em(700);
      right: em(-225);
      top: 0;
      background-image: url($img-path + 'winners/intro/smile.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(lg) {
        background-image: url($img-path + 'winners/intro/smile-768.png');
        width: em(700);
        height: em(500);
        right: em(-30);
        top: 0;
      }

      @include media-breakpoint-down(md) {
        background-image: url($img-path + 'winners/intro/smile-320.png');
        width: em(330);
        height: em(380);
        right: em(-5);
        top: em(13);
      }
    }

    &--smile {
      z-index: $zLevel2;
      width: em(850);
      height: em(650);
      left: 0;
      bottom: 0;
      background-image: url($img-path + 'winners/intro/square.png');
      background-size: contain;
      background-repeat: no-repeat;

      @include media-breakpoint-down(lg) {
        background-image: url($img-path + 'winners/intro/square-768.png');
        width: em(930);
        height: em(730);
        left: 0;
        bottom: 0;
      }

      @include media-breakpoint-down(md) {
        background-image: url($img-path + 'winners/intro/square-320.png');
        width: em(410);
        height: em(430);
        left: 0;
        bottom: 0;
      }
    }
  }

  &__container {
    position: relative;
    z-index: $zLevel4;
    padding-bottom: em(40);

    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;

    @include media-breakpoint-down(lg) {
      display: block;
      height: 100%;
    }

    @include media-breakpoint-down(md) {
      padding-bottom: em(21);
    }
  }

  &__heading {
    color: $color-white;
    white-space: nowrap;
  }

  &__subheading {
    color: $color-white;
    text-transform: uppercase;
    @include media-breakpoint-down(md) {
      margin-top: em(-8);
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
    &--down {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $color-red;
      width: em(52);
      height: em(52);
      border-radius: 50%;
      margin: 0 auto;
      position: absolute;
      left: 53%;
      transform: translateX(-44%);
      bottom: em(40);

      @include media-breakpoint-down(lg) {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      @include media-breakpoint-down(md) {
        width: em(40);
        height: em(40);
        bottom: em(20);
      }
    }

    &--enter {
      width: 100%;
      max-width: em(352);
      height: em(52);
      display: none;

      @include media-breakpoint-down(lg) {
        display: block;
      }
    }
  }

  &__step {
    padding: em(13) em(30);
    border: em(2) solid $color-white;
    color: $color-white;
    border-radius: em(30);

    &:not(:last-child) {
      margin-right: em(10);

      @include media-breakpoint-down(lg) {
        margin-right: 0;
        margin-bottom: em(10);
      }

      @include media-breakpoint-down(md) {
        margin-bottom: em(6);
      }
    }

    @include media-breakpoint-down(md) {
      border-radius: em(27);
      padding: em(9) em(25);
    }
  }

  &__icon {
    color: $color-white;
    width: 60%;
    height: 60%;
    translate: 0 10%;
  }

  &__logo {
    text-align: center;
  }

  &__title {
    text-align: center;
    color: $color-white;
    margin-top: em(100);

    @include media-breakpoint-down(lg) {
      margin-top: em(290);
    }

    @include media-breakpoint-down(md) {
      margin-top: em(155);
    }
  }

  &__font {
    &--title {
      font-size: em(160);
      line-height: 100%;

      @include media-breakpoint-down(lg) {
        font-size: em(98);
      }

      @include media-breakpoint-down(md) {
        font-size: em(41);
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
}
</style>
