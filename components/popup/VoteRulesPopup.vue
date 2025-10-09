<template>
  <PopupSkeletonDefault class="vote-rules-popup" paddings-size="m" emit-only @close="onClose">
    <template #icon>
      <CIcon class="vote-rules-popup__icon" name="cross" />
    </template>

    <template #default>
      <div class="vote-rules-popup__container">
        <div class="vote-rules-popup__title">
          <span class="vote-rules-popup__font vote-rules-popup__font--title">
            Как проходит голосование?
          </span>
        </div>

        <div class="vote-rules-popup__items">
          <div v-for="(rule, index) in data.items" :key="index" class="vote-rules-popup__item">
            <div class="vote-rules-popup__number">
              <span class="vote-rules-popup__font vote-rules-popup__font--item">
                {{ index + 1 }}.
              </span>
            </div>

            <span class="vote-rules-popup__font vote-rules-popup__font--item" v-html="rule" />
          </div>
        </div>

        <CButton
          theme="black"
          class="vote-rules-popup__button"
          text="Всё понятно"
          @click="onClose"
        />
      </div>
    </template>
  </PopupSkeletonDefault>
</template>

<script>
import PopupSkeletonDefault from '@/components/popup/skeleton/PopupSkeletonDefault.vue';

export default {
  name: 'VoteRulesPopup',
  components: { PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  beforeDestroy() {
    this.$cookies.set('rulesShown', true);
  },
  methods: {
    onClose() {
      // this.$popup.open('VoteStartPopup', {
      //   disableClickOutside: true,
      //   title: this.data.nominationName,
      //   text: this.data.startText,
      // });
      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.vote-rules-popup {
  &__icon {
    width: em(40);
    height: em(40);
    color: $color-black-default;

    @include media-breakpoint-down(xl) {
      width: em(30);
      height: em(30);
    }
  }

  &__container {
    padding-right: em(62);

    @include media-breakpoint-down(xl) {
      padding-right: em(40);
    }

    @include media-breakpoint-down(lg) {
      padding-right: 0;
    }
  }

  &__title {
    margin-bottom: em(20);
  }

  &__items {
    margin-bottom: em(60);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(50);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(40);
    }
  }

  &__item {
    display: flex;
    align-items: flex-start;
    color: $color-black;
    margin-bottom: em(10);
  }

  &__number {
    display: block;
    width: em(15);
    margin-right: em(7);
    flex-shrink: 0;

    @include media-breakpoint-down(lg) {
      width: em(11);
    }

    @include media-breakpoint-down(md) {
      width: em(7);
    }
  }

  ::v-deep &__accent {
    color: $color-red;
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

    &--item {
      display: block;
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(xl) {
        font-size: em(16);
      }

      @include media-breakpoint-down(md) {
        font-size: em(12);
      }
    }
  }
}
</style>
