<template>
  <PopupSkeletonDefault
    popup="VoteEndPopup"
    class="vote-end-popup"
    paddings-size="l"
    @close="onClose"
  >
    <div class="vote-end-popup__container">
      <div class="vote-end-popup__title">
        <span class="vote-end-popup__font vote-end-popup__font--title" v-html="title" />
      </div>

      <div class="vote-end-popup__text">
        <span v-typograph class="vote-end-popup__font vote-end-popup__font--text" v-html="text" />
      </div>

      <div class="vote-end-popup__buttons">
        <template v-if="!isLast">
          <CButton class="vote-end-popup__button" text="Дальше" theme="black" @click="onNext" />
          <CButton
            class="vote-end-popup__button vote-end-popup__button--leave"
            theme="outlined-black"
            :text="backButtonText"
            disable-paddings
            @click="onLater"
          />
        </template>

        <template v-else>
          <CButton class="vote-end-popup__button" text="на главную" theme="grey" @click="onLater" />
        </template>
      </div>
    </div>
  </PopupSkeletonDefault>
</template>

<script>
import routes from '@/constants/routes';

import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';

export default {
  name: 'VoteEndPopup',
  components: { PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isLast() {
      return !this.data.redirectLink;
    },
    title() {
      if (this.data.title === 'Вместе' || this.data.title === 'Бери и действуй')
        return `${this.data.title}<br /> (${this.data.description})`;

      return this.data.title || 'Отлично!';
    },
    text() {
      if (this.data.text) return this.data.text;

      return !this.isLast
        ? 'Ты проголосовал за все проекты в этой номинации. <br> ' +
            'Предлагаем перейти к следующей и продолжить голосование!'
        : 'Голосование завершено. <br/> Спасибо за участие!';
    },
    backButtonText() {
      return this.data.backButtonText || 'Вернуться позже';
    },
  },
  methods: {
    onNext() {
      this.$popup.close();
      this.$router.push(this.data.redirectLink);
    },
    onLater() {
      this.$popup.close();
      this.onClose();
    },
    onClose() {
      this.$router.push(routes.MAIN);
    },
  },
};
</script>

<style scoped lang="scss">
.vote-end-popup {
  &__title {
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

      @include media-breakpoint-down(lg) {
        margin-right: em(16);
      }

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(10);
      }
    }

    &--leave {
      padding: 0 em(20);
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
    }
  }
}
</style>
