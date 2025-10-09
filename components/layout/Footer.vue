<template>
  <footer class="layout-footer" :class="{ 'layout-footer--no-border': hideBorder }">
    <div class="layout-footer__container">
      <div class="layout-footer__head">
        <div class="layout-footer__text">
          <span class="layout-footer__font layout-footer__font--name"> Лига МТС </span>
          <span class="layout-footer__number layout-footer__font layout-footer__font--text">
            ‘24
          </span>
        </div>

        <div class="layout-footer__text">
          <span class="layout-footer__font layout-footer__font--text">
            люди, меняющие привычное
          </span>
        </div>
      </div>

      <div class="layout-footer__wrapper">
        <div class="layout-footer__links">
          <CTagDetect
            class="layout-footer__link"
            :to="staticData.routes.USER_AGREEMENT"
            target="_blank"
          >
            <span class="layout-footer__font layout-footer__font--link">
              Пользовательское соглашение
            </span>
          </CTagDetect>
        </div>

        <div class="layout-footer__feedback">
          <div class="layout-footer__feedback-text">
            <span class="layout-footer__font layout-footer__font--link"> Остались вопросы? </span>
          </div>

          <CButton
            class="layout-footer__button"
            text="Напиши нам"
            theme="black"
            @click="handleNavigation(staticData.routes.FEEDBACK)"
          >
            <template #icon-right>
              <CIcon class="layout-footer__icon" name="feedback" />
            </template>
          </CButton>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import routes from '@/constants/routes.js';
import { scrollTo } from '@/tools/helpers';

import { mapGetters } from 'vuex';

export default {
  name: 'LayoutFooter',
  props: {
    hideBorder: {
      type: Boolean,
      default: false,
    },
  },
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
    handleNavigation(id) {
      scrollTo(id, this.$device.isMobile, this.isIframe);
    },
    onFeedback() {
      this.$popup.open('FeedbackPopup');
    },
  },
};
</script>

<style scoped lang="scss">
.layout-footer {
  $parent: &;
  background: $color-light-grey;

  padding: 0 em(40) em(20);

  @include media-breakpoint-down(lg) {
    padding: 0;
  }

  &__container {
    padding-top: em(40);

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }

    @include media-breakpoint-down(lg) {
      padding: em(30) em(40) em(40);
    }

    @include media-breakpoint-down(md) {
      padding: em(40) em(16);
      border-width: 1px;
    }
  }

  &__head {
    margin-bottom: em(108);
    color: $color-red;

    @include media-breakpoint-down(md) {
      margin-bottom: em(60);
    }
  }

  &__text {
    display: flex;
    align-items: flex-start;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include media-breakpoint-down(md) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }

  &__links {
    @include media-breakpoint-down(lg) {
      display: flex;
      flex-direction: column;
    }
  }

  &__link {
    color: $color-black;

    &:not(:last-child) {
      margin-right: em(20);

      @include media-breakpoint-down(lg) {
        margin-right: 0;
        margin-bottom: em(8);
      }
    }
  }

  &__feedback {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      margin-bottom: em(60);
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
    }
  }

  &__button {
    margin-left: em(20);
    height: em(52);
    white-space: nowrap;

    @include media-breakpoint-down(md) {
      width: 100%;
      margin-left: 0;
      margin-top: em(20);
    }
  }

  &__icon {
    width: em(21);
    height: em(26);
    margin-left: em(20);
  }

  &__number {
    translate: 0 50%;

    @include media-breakpoint-down(lg) {
      translate: 0 30%;
    }
  }

  &__font {
    &--name {
      font-size: em(63);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(lg) {
        font-size: em(46);
      }

      @include media-breakpoint-down(md) {
        font-size: em(32);
      }
    }

    &--text {
      font-size: em(14);
      line-height: 1;
      font-weight: 500;
      text-transform: uppercase;

      @include media-breakpoint-down(md) {
        font-size: em(8);
      }
    }

    &--link {
      font-family: $font-family-mts-text;
      font-weight: 400;
      font-size: em(12);
      line-height: 130%;
    }
  }

  &--no-border {
    #{$parent} {
      &__container {
        border-top: none;
      }
    }
  }
}
</style>
