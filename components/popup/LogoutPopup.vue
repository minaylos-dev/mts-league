<template>
  <PopupSkeletonDefault class="logout-popup" paddings-size="m">
    <template #icon>
      <CIcon class="logout-popup__icon" name="cross" />
    </template>

    <template #default>
      <div class="logout-popup__title">
        <span class="logout-popup__font logout-popup__font--title"> Выход с сайта </span>
      </div>

      <div class="logout-popup__text">
        <span class="logout-popup__font logout-popup__font--text">
          Будет осуществлен выход с сайта
        </span>
      </div>

      <div class="logout-popup__buttons">
        <CButton class="logout-popup__button" text="выйти" @click="onLogout" />
        <CButton class="logout-popup__button" text="отмена" theme="outlined" @click="closePopup" />
      </div>
    </template>
  </PopupSkeletonDefault>
</template>

<script>
import { mapActions } from 'vuex';

import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';

export default {
  name: 'LogoutPopup',
  components: { PopupSkeletonDefault },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    onLogout() {
      this.closePopup();

      this.logout();
    },

    closePopup() {
      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.logout-popup {
  &__icon {
    width: em(40);
    height: em(40);
    color: $color-black-default;

    @include media-breakpoint-down(xl) {
      width: em(30);
      height: em(30);
    }
  }

  &__title {
    color: $color-red;
    margin-bottom: em(20);
  }

  &__text {
    color: $color-black-grey;
    margin-bottom: em(60);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(50);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(40);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }
  }

  &__button {
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
    }

    &:not(:last-child) {
      margin-right: em(20);

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(10);
      }
    }
  }

  &__font {
    &--title {
      font-size: em(40);
      font-weight: 500;
      line-height: 110%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }
    }
  }
}
</style>
