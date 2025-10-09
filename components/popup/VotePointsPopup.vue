<template>
  <PopupSkeletonDefault class="vote-points-popup" paddings-size="l" emit-only @close="onClick">
    <div class="vote-points-popup__title">
      <span class="vote-points-popup__font vote-points-popup__font--title">
        Как начисляются<br />
        баллы?
      </span>
    </div>

    <ul class="vote-points-popup__list">
      <li class="vote-points-popup__item">
        <span class="vote-points-popup__font vote-points-popup__font--item">
          10 голосов пользователей = 1 балл
        </span>
      </li>

      <li class="vote-points-popup__item">
        <span class="vote-points-popup__font vote-points-popup__font--item">
          1 голос эксперта = от 1 до 10 баллов
        </span>
      </li>
    </ul>

    <CButton class="vote-points-popup__button" disable-paddings @click="onClick">
      <span class="vote-points-popup__font vote-points-popup__font--button"> понятно </span>
    </CButton>
  </PopupSkeletonDefault>
</template>

<script>
import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';

export default {
  name: 'VotePointsPopup',
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

      if (!this.data.callback) return;

      this.data.callback();
    },
  },
};
</script>

<style scoped lang="scss">
.vote-points-popup {
  &__title {
    color: $color-red;
    margin-bottom: em(30);
  }

  &__list {
    padding: 0;
    margin: 0 0 em(40);
    list-style: none;
  }

  &__item {
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

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--item {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(md) {
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
