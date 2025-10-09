<template>
  <PopupSkeletonDefault class="vote-start-popup">
    <div class="vote-start-popup__container">
      <div class="vote-start-popup__title">
        <span class="vote-start-start__font vote-start-popup__font--title">
          {{ data.title || title }}
          <br />
          {{ description }}
        </span>
      </div>

      <!--      <div class="vote-start-popup__text">-->
      <!--        <span class="vote-start-popup__font vote-start-popup__font&#45;&#45;text">-->
      <!--          {{ data.text }}-->
      <!--        </span>-->
      <!--      </div>-->

      <CButton class="vote-start-popup__button" text="Начать оценку" @click="onClose" />
    </div>
  </PopupSkeletonDefault>
</template>

<script>
import { nominationsList } from '@/config/nominations';
import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';

export default {
  name: 'VoteStartPopup',
  components: { PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    title() {
      return nominationsList.find((item) => item.slug === this.$route.params.slug)?.title;
    },
    description() {
      const description = nominationsList.find(
        (item) => item.slug === this.$route.params.slug
      )?.description;

      return description && `(${description})`;
    },
  },
  methods: {
    onClose() {
      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.vote-start-popup {
  &__title {
    color: $color-red;
    margin-bottom: em(60);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(50);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(40);
    }
  }

  &__button {
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
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
  }
}
</style>
