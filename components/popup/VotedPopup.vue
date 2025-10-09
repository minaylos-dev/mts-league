<template>
  <PopupSkeletonDefault class="voted-popup" paddings-size="s" emit-only @close="onClick">
    <div class="voted-popup__title">
      <span class="voted-popup__font voted-popup__font--title"> Отлично! </span>
    </div>

    <div class="voted-popup__text">
      <span class="voted-popup__font voted-popup__font--text">
        Голосование завершено. Спасибо за участие!
      </span>
    </div>

    <div class="voted-popup__buttons">
      <CButton theme="black" class="voted-popup__button" disable-paddings @click="onClose">
        <span class="voted-popup__font voted-popup__font--button"> На главную </span>
      </CButton>
    </div>
  </PopupSkeletonDefault>
</template>

<script>
import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';
import routes from '@/constants/routes';

export default {
  name: 'VotedPopup',
  components: { PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onClick() {
      this.$popup.close();

      this.onClose();

      if (!this.data.callback) return;

      this.data.callback();
    },
    onClose() {
      this.$router.push(routes.MAIN);
    },
  },
};
</script>

<style scoped lang="scss">
.voted-popup {
  &__title {
    color: $color-black;
    margin-bottom: em(20);
  }

  &__text {
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
    gap: em(20);

    @include media-breakpoint-down(md) {
      flex-wrap: wrap;
    }
  }

  &__button {
    height: em(52);
    padding: em(13) em(30);

    @include media-breakpoint-down(md) {
      width: 100%;
      padding: 0;
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

      @include media-breakpoint-down(xl) {
        font-size: em(16);
      }
    }

    &--button {
      font-size: em(16);
      font-weight: 500;
      line-height: 1;
      text-transform: uppercase;

      @include media-breakpoint-down(md) {
        font-size: em(14);
        line-height: 1;
      }
    }
  }
}
</style>
