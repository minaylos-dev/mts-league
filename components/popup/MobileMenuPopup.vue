<template>
  <div class="mobile-menu-popup">
    <LayoutHeader minimized with-cross @close="closePopup" />

    <div class="mobile-menu-popup__container">
      <nav class="mobile-menu-popup__navigation">
        <CTagDetect
          v-for="(item, index) in filteredNavigation"
          :key="index"
          class="mobile-menu-popup__link"
          @click="handleNavigation(item.link)"
        >
          <span class="mobile-menu-popup__font mobile-menu-popup__font--text">
            {{ item.name }}
          </span>
        </CTagDetect>
      </nav>

      <div class="mobile-menu-popup__buttons">
        <!--        TODO: to return applications-->
        <CButton
          v-if="false"
          class="mobile-menu-popup__button"
          text="подать заявку"
          theme="black"
          @click="handleNavigation(staticData.routes.NOMINATIONS)"
        />

        <CButton
          class="mobile-menu-popup__button"
          theme="white-black"
          text="задать вопрос"
          @click="askQuestion"
        >
          <template #icon-right>
            <CIcon class="mobile-menu-popup__icon" name="edit" />
          </template>
        </CButton>

        <CButton
          class="mobile-menu-popup__button"
          theme="white-black"
          text="ВЫЙТИ"
          @click="onLogout"
        >
          <template #icon-right>
            <CIcon class="mobile-menu-popup__icon" name="exit" />
          </template>
        </CButton>
      </div>

      <div class="mobile-menu-popup__email">
        <span class="mobile-menu-popup__font mobile-menu-popup--email">{{ getEmail }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { scrollTo } from '@/tools/helpers';

import navigation from '@/config/navigation.js';
import routes from '@/constants/routes';

const LayoutHeader = () => import('@/components/layout/Header.vue');

export default {
  name: 'MobileMenuPopup',
  components: { LayoutHeader },
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
  },
  methods: {
    handleNavigation(id) {
      if (this.$route.name === 'index') {
        this.closePopup();
        scrollTo(id, this.$device.isMobile, this.isIframe);
      } else {
        this.closePopup();

        this.$router.push({ path: routes.MAIN, hash: id });
      }
    },

    askQuestion() {
      this.$popup.close();

      setTimeout(() => {
        this.$popup.open('FeedbackPopup');
      }, 500);
    },

    onLogout() {
      this.closePopup();

      setTimeout(() => {
        this.$popup.open('LogoutPopup');
      }, 500);
    },

    closePopup() {
      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-menu-popup {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: $color-light-grey;

  &__email {
    margin-top: em(14);
    text-align: center;
  }

  &__container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: em(78) em(40) em(40);

    @include media-breakpoint-down(md) {
      padding: em(65) em(16) em(20);
    }
  }

  &__navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: em(40);
  }

  &__link {
    color: $color-black;

    &:not(:last-child) {
      margin-bottom: em(40);
    }
  }

  &__buttons {
    width: 100%;
    margin-top: auto;
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }
  }

  &__button {
    width: 100%;
    height: em(52);

    &:not(:last-child) {
      margin-right: em(10);

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(10);
      }
    }
  }

  &__icon {
    width: em(24);
    height: em(24);
    margin-left: em(10);
    color: $color-black;
  }

  &__font {
    &--text {
      font-size: em(40);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(md) {
        font-size: em(24);
      }
    }

    &--email {
      color: $color-black;
      font-size: em(20);
    }
  }
}
</style>
