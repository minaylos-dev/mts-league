<template>
  <section class="section-main-intro">
    <!--  Background items  -->
    <div class="section-main-intro__background section-main-intro__background--prize" />
    <!--    <div class="section-main-intro__background section-main-intro__background&#45;&#45;ball-pink" />-->
    <!--    <div class="section-main-intro__background section-main-intro__background&#45;&#45;ball-purple" />-->

    <div class="section-main-intro__container">
      <h1 class="section-main-intro__heading">
        <span class="section-main-intro__font section-main-intro__font--heading"> Лига МТС </span>
      </h1>

      <div class="section-main-intro__subheading">
        <span class="section-main-intro__font section-main-intro__font--subheading">
          Люди, меняющие привычное
        </span>
      </div>

      <div class="section-main-intro__steps">
        <div class="section-main-intro__button section-main-intro__button--down">
          <CIcon class="section-main-intro__icon" name="chevron-down" />
        </div>

        <div v-for="step in staticData.steps" :key="step" class="section-main-intro__step">
          <span class="section-main-intro__font section-main-intro__font--step">
            {{ step }}
          </span>
        </div>
      </div>

      <!--        TODO: to return applications-->
      <CButton
        v-if="false"
        class="section-main-intro__button section-main-intro__button--enter"
        text="подать заявку"
        @click="handleNavigation(staticData.routes.NOMINATIONS)"
      />
    </div>
  </section>
</template>

<script>
import routes from '@/constants/routes';
import { scrollTo } from '@/tools/helpers';

import { mapGetters } from 'vuex';

export default {
  name: 'SectionMainIntro',
  data() {
    return {
      staticData: Object.seal({
        routes,
        steps: ['Выбирай номинацию ', 'Номинируй себя или коллегу', 'Подавай проект и голосуй'],
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
      this.objectPosition.x = event.clientY * 0.02;
      this.objectPosition.y = event.clientX * 0.01;
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
.section-main-intro {
  position: relative;
  padding: em(300) em(40) 0;

  min-height: em(680);
  display: flex;
  flex-direction: column;

  @include media-breakpoint-up(lg) {
    max-width: em(1280);
    margin: 0 auto;
  }

  @include media-breakpoint-down(xl) {
    padding: em(200) em(40) em(40);
  }

  @include media-breakpoint-down(lg) {
    padding: em(95) em(40) em(40);

    min-height: unset;
    display: block;
  }

  @include media-breakpoint-down(md) {
    padding: em(65) em(16) 0;
  }

  &__background {
    position: absolute;
    z-index: $zLevel1;

    &--prize {
      z-index: $zLevel2;
      width: em(640);
      height: em(440);
      right: em(-135);
      top: em(100);
      background-image: url($img-path + 'main/intro/prize.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      //transition: transform 0.02s ease;

      @include media-breakpoint-down(lg) {
        width: em(630);
        height: em(430);
        right: em(5);
        top: em(250);
      }

      @include media-breakpoint-down(md) {
        width: em(340);
        height: em(390);
        right: em(23);
        top: em(120);
      }
    }
  }

  &__container {
    position: relative;
    z-index: $zLevel4;
    padding-bottom: em(40);
    border-bottom: em(2) solid $color-white;

    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;

    @include media-breakpoint-down(lg) {
      display: block;
    }

    @include media-breakpoint-down(md) {
      padding-bottom: em(21);
    }
  }

  &__heading {
    font-size: em(16);
    color: $color-white;
    white-space: nowrap;
  }

  &__subheading {
    color: $color-white;
    text-transform: uppercase;

    @include media-breakpoint-down(lg) {
      margin-bottom: em(374);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(203);
      position: relative;
      left: em(16);
      top: em(-6);
    }
  }

  &__steps {
    display: flex;
    align-items: center;
    margin-top: auto;

    @include media-breakpoint-down(lg) {
      flex-wrap: wrap;
      max-width: em(350);
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
    color: $color-light-blue;
    width: 60%;
    height: 60%;
    translate: 0 10%;
  }

  &__font {
    &--heading {
      font-size: em(130);
      line-height: 1;

      @include media-breakpoint-down(lg) {
        font-size: em(124);
      }

      @include media-breakpoint-down(md) {
        font-size: em(52);
      }
    }

    &--subheading {
      font-size: em(35);
      line-height: 1;

      @include media-breakpoint-down(md) {
        font-size: em(13);
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
