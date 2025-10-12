<template>
  <header
    class="layout-header"
    :class="{ 'layout-header--darker': darkerTheme, 'layout-header--minimized': minimized }"
  >
    <div class="layout-header__holder">
      <CButtonIcon
        v-if="withCross"
        icon="arrow-right"
        :theme="theme"
        class="layout-header__button layout-header__button--cross layout-header__button--cross--desktop"
        @click.native="onClose"
      />

      <CButtonIcon
        v-if="withCross"
        icon="cross"
        :theme="'no-border-' + theme"
        class="layout-header__button layout-header__button--cross layout-header__button--cross--mobile"
        @click.native="onClose"
      />

      <button v-if="!isIframe" class="layout-header__logo-wrapper" @click="onLogoClick">
        <img class="layout-header__logo" src="/images/logo.svg" alt="logo" />
      </button>
      <nav v-if="!minimized" class="layout-header__navigation">
        <CTagDetect
          v-for="item in filteredNavigation"
          :key="item.name"
          class="layout-header__link"
          @click="handleNavigation(item.link)"
        >
          <span class="layout-header__font layout-header__font--link">
            {{ item.name }}
          </span>
        </CTagDetect>
      </nav>

      <div v-if="!minimized" class="layout-header__buttons">
        <!--  Icons + text buttons    -->
        <div class="layout-header__email">
          <span class="layout-header__font layout-header__font--email">{{ getEmail }}</span>
        </div>
        <CButton
          class="layout-header__button layout-header__button--action layout-header__button--feedback"
          :theme="'black'"
          text="задать вопрос"
          @click="handleNavigation(staticData.routes.FEEDBACK)"
        >
          <template #icon-right>
            <CIcon class="layout-header__icon layout-header__icon--button" name="edit" />
          </template>
        </CButton>

        <CButton
          class="layout-header__button layout-header__button--action"
          :theme="buttonsTheme"
          text="ВЫЙТИ"
          @click="logout"
        >
          <template #icon-right>
            <CIcon class="layout-header__icon layout-header__icon--button" name="exit" />
          </template>
        </CButton>

        <!--  Only icons buttons    -->
        <CButton
          class="layout-header__button layout-header__button--action-icon"
          :theme="buttonsTheme"
          disable-paddings
          @click="askQuestion"
        >
          <template #icon-right>
            <CIcon class="layout-header__icon layout-header__icon--button" name="edit" />
          </template>
        </CButton>

        <CButton
          class="layout-header__button layout-header__button--action-icon"
          :theme="buttonsTheme"
          disable-paddings
          @click="logout"
        >
          <template #icon-right>
            <CIcon class="layout-header__icon layout-header__icon--button" name="exit" />
          </template>
        </CButton>

        <!--        TODO: to return applications-->
        <CButton
          v-if="false"
          class="layout-header__button layout-header__button--action"
          text="подать заявку"
          @click="handleNavigation(staticData.routes.NOMINATIONS)"
        />
      </div>

      <button
        v-if="!minimized"
        class="layout-header__button layout-header__button--burger"
        @click="openMobileMenu"
      >
        <CIcon class="layout-header__icon layout-header__icon--burger" name="burger" />
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

import { scrollTo } from '@/tools/helpers';

import navigation from '@/config/navigation.js';
import routes from '@/constants/routes';

import CButtonIcon from '@/components/ui/CButtonIcon.vue';

export default {
  name: 'LayoutHeader',
  components: {
    CButtonIcon,
  },
  props: {
    minimized: {
      type: Boolean,
      default: false,
    },

    withCross: {
      type: Boolean,
      default: false,
    },
    crossTheme: {
      type: String,
      default: 'red',
      validator: (value) => ['red', 'white'].includes(value),
    },

    theme: {
      type: String,
      default: 'white',
      validator: (value) => ['red', 'white', 'black'].includes(value),
    },

    darkerTheme: {
      type: Boolean,
      default: false,
    },
    noRedirect: {
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
      isVoteDisabled: 'user/isVoteDisabled',
      isIframe: 'auth/isIframe',
      getEmail: 'auth/getEmail',
    }),

    filteredNavigation() {
      return !this.isVoteDisabled ? navigation : navigation.filter((item) => item.id !== 'vote');
    },
    buttonsTheme() {
      return this.darkerTheme ? 'grey' : 'white';
    },
  },
  methods: {
    scrollTo,

    onLogoClick() {
      if (this.noRedirect) {
        this.scrollToTop();
      } else {
        this.$router.push(routes.MAIN);
      }
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    handleNavigation(id) {
      if (this.noRedirect) {
        this.scrollTo(id, this.$device.isMobile, this.isIframe);
      } else {
        !this.isIframe
          ? this.$router.push({ path: routes.MAIN, hash: id })
          : this.scrollTo(id, this.$device.isMobile, this.isIframe);
      }
    },

    askQuestion() {
      this.$popup.open('FeedbackPopup');
    },
    logout() {
      this.$popup.open('LogoutPopup');
    },

    openMobileMenu() {
      this.$popup.open('MobileMenuPopup', { transitionName: 'slide-top' });
    },
    onClose() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.layout-header {
  $parent: &;

  padding: em(14) em(40);
  transition: background-color $trans-time;

  @include media-breakpoint-down(lg) {
    padding-top: em(26);
    padding-right: em(30);
  }

  @include media-breakpoint-down(md) {
    padding-right: em(16);
    padding-top: em(16);
  }

  &__font {
    &--email {
      color: $color-white;
      font-size: em(20);
    }
  }

  &--minimized {
    padding-top: em(40);

    @include media-breakpoint-down(lg) {
      padding-top: em(16);
    }

    @include media-breakpoint-down(md) {
      padding-top: em(18);
      padding-right: em(8);
    }

    #{$parent} {
      &__logo-wrapper {
        display: block;
        right: 0;
        left: auto;

        @include media-breakpoint-down(lg) {
          left: 0;
          right: auto;
        }
      }
    }
  }

  &__holder {
    display: flex;
    align-items: center;

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }
  }

  &__logo-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: em(80);
    height: em(80);
    display: none;

    @include media-breakpoint-down(lg) {
      display: block;

      width: em(56);
      height: em(56);
    }

    @include media-breakpoint-down(md) {
      width: em(46);
      height: em(46);
    }
  }

  &__logo {
    width: 100%;
    height: 100%;
  }

  &__navigation {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(lg) {
      display: none;
    }
  }

  &__link {
    color: $color-white;
    transition: color $trans-time;

    &:not(:last-child) {
      margin-right: em(40);

      @include media-breakpoint-down(xl) {
        margin-right: em(60);
      }
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    margin-left: auto;

    @include media-breakpoint-down(lg) {
      display: none;
    }
  }

  &__email {
    margin-right: em(20);
  }

  &__button {
    &:not(:last-child) {
      margin-right: em(13);

      @include media-breakpoint-down(xl) {
        margin-right: em(10);
      }
    }

    &--action {
      height: em(52);
    }

    &--feedback {
      background-color: black;
    }

    &--action-icon {
      display: none;
      height: em(52);
      padding: em(17) em(15);
    }

    &--cross {
      align-self: flex-end;
      rotate: 180deg;

      @include media-breakpoint-down(lg) {
        margin-left: auto;

        width: em(26);
        height: em(26);
      }

      @include media-breakpoint-down(md) {
        width: em(30);
        height: em(30);
        color: $color-black;
      }

      &--mobile {
        display: none !important;
        color: $color-black;

        @include media-breakpoint-down(lg) {
          display: block !important;
        }
      }

      &--desktop {
        @include media-breakpoint-down(lg) {
          display: none !important;
        }
      }
    }

    &--burger {
      margin-left: auto;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }

  &__icon {
    &--button {
      width: em(24);
      height: em(24);

      &:not(:last-child) {
        margin-left: em(10);
      }
    }

    &--cross {
      width: em(40);

      @include media-breakpoint-down(lg) {
        width: em(30);
      }

      &--red {
        color: $color-red;
      }

      &--white {
        color: $color-white;
      }
    }

    &--burger {
      width: em(30);
      color: $color-white;
      transition: color $trans-time;
    }
  }

  &__font {
    &--link {
      font-weight: 500;
    }
  }

  &--darker {
    background-color: $color-white;

    #{$parent} {
      &__link {
        color: $color-black-grey;
      }

      &__icon {
        &--burger {
          color: $color-red;
        }
      }

      &__font--email {
        color: $color-black-grey;
      }
    }
  }
}
</style>
