<template>
  <section class="section-main-faq">
    <div class="section-main-faq__wrapper">
      <div class="section-main-faq__background section-main-faq__background--like" />

      <div class="section-main-faq__container">
        <div class="section-main-faq__title">
          <span class="section-main-faq__font"> FAQ </span>
        </div>

        <div class="section-main-faq__items">
          <BlockFaq
            v-for="(item, index) in staticData.items"
            :key="index"
            class="section-main-faq__item"
            :question="item.question"
            :answer="item.answer"
            :has-icon="false"
            is-opened
            @toggle="setOpened(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import faq from '@/config/faq.js';

const BlockFaq = () => import('@/components/block/Faq.vue');

export default {
  name: 'SectionMainFaq',
  components: { BlockFaq },
  data() {
    return {
      openedIndex: undefined,

      staticData: Object.seal({
        items: faq,
      }),

      objectPosition: { x: 0, y: 0 },
    };
  },
  methods: {
    moveObject(event) {
      this.objectPosition.x = event.clientX * 0.015;
      this.objectPosition.y = event.clientY * 0.015;
    },
    setOpened(index) {
      if (this.openedIndex === index) {
        this.openedIndex = undefined;
      } else {
        this.openedIndex = index;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.section-main-faq {
  position: relative;
  padding: em(112) em(32) 0;

  @include media-breakpoint-down(lg) {
    padding: 0;
    margin-top: em(80);
  }

  @include media-breakpoint-down(md) {
    padding: 0;
    margin-top: em(40);
  }

  &__wrapper {
    overflow: hidden;
    background: $color-white;
    border-radius: em(32);
    padding: em(140) em(40);

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }

    @include media-breakpoint-down(lg) {
      padding: em(170) em(40) em(40);
      border-radius: 0;
    }

    @include media-breakpoint-down(md) {
      padding: em(40) em(16);
    }
  }

  &__background {
    position: absolute;
    z-index: $zLevel2;

    @include media-breakpoint-down(md) {
      display: none;
    }

    &--like {
      z-index: $zLevel1;
      top: em(300);
      left: em(10);
      width: 45%;
      max-width: em(700);
      height: em(700);
      background-image: url($img-path + 'main/faq/like.png');
      background-size: contain;
      background-repeat: no-repeat;
      animation: levitate linear infinite 10s;
      transition: transform 0.02s ease;

      @include media-breakpoint-down(lg) {
        width: em(367);
        height: em(365);
        right: em(-50);
        left: unset;
        top: em(-35);
      }
    }
  }

  &__container {
    position: relative;
    z-index: $zLevel3;
    display: flex;
    flex-direction: column;
  }

  &__items {
    width: em(756);
    margin-left: auto;

    @include media-breakpoint-down(xl) {
      width: em(525);
    }

    @include media-breakpoint-down(lg) {
      width: 100%;
    }
  }

  &__item {
    &:not(:last-child) {
      border-bottom: 1px solid $color-black;
    }
  }

  &__title {
    @include media-breakpoint-down(md) {
      color: $color-red;
    }
  }

  &__font {
    font-size: em(100);
    font-weight: 500;
    line-height: 1;

    @include media-breakpoint-down(lg) {
      font-size: em(49);
    }

    @include media-breakpoint-down(md) {
      font-size: em(36);
    }
  }
}
</style>
