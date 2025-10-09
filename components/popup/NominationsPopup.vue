<template>
  <div class="nominations-popup">
    <button class="nominations-popup__button nominations-popup__button--cross" @click="closePopup">
      <CIcon class="nominations-popup__icon nominations-popup__icon--cross" name="cross" />
    </button>

    <div class="nominations-popup__slider swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(nomination, index) in staticData.items"
          :key="index"
          class="nominations-popup__slide swiper-slide"
        >
          <CTag
            class="nominations-popup__tag"
            size="adaptive-mobile"
            :icon-name="nomination.iconName"
            :title="nomination.title"
            :description="nomination.description"
            disabled
          />

          <div class="nominations-popup__name">
            <span class="nominations-popup__font">
              {{ nomination.description }}
            </span>
          </div>
        </div>
      </div>

      <button class="nominations-popup__button nominations-popup__button--previous">
        <CIcon
          class="nominations-popup__icon nominations-popup__icon--previous"
          name="chevron-down"
        />
      </button>

      <button class="nominations-popup__button nominations-popup__button--next">
        <CIcon class="nominations-popup__icon nominations-popup__icon--next" name="chevron-down" />
      </button>
    </div>

    <CButton
      v-if="activeSlide && !activeSlide.hideButton"
      class="nominations-popup__button nominations-popup__button--submit"
      theme="black"
      text="Заполнить заявку"
      @click.native="onSubmit"
    />
  </div>
</template>

<script>
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/swiper.scss';

import nominations from '@/config/nominations';

export default {
  name: 'NominationsPopup',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      slider: undefined,
      activeSlide: undefined,

      staticData: Object.seal({
        items: [...nominations.items, ...nominations.special],
      }),
    };
  },
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      const initialIndex = this.staticData.items.findIndex(
        (item) => item.id === this.data.initialSlideId
      );

      this.activeSlide = this.staticData.items[initialIndex];

      this.slider = new Swiper('.swiper', {
        slidesPerView: 1,
        modules: [Navigation],
        initialSlide: initialIndex,
        navigation: {
          prevEl: '.nominations-popup__button--previous',
          nextEl: '.nominations-popup__button--next',
          disabledClass: 'nominations-popup__button--disabled',
        },
        on: {
          slideChange: (swiper) => {
            this.activeSlide = this.staticData.items[swiper.activeIndex];
          },
        },
      });
    },
    closePopup() {
      this.$popup.close();
    },
    onSubmit() {
      this.closePopup();

      this.$router.push(this.activeSlide.link);
    },
  },
};
</script>

<style scoped lang="scss">
.nominations-popup {
  background-color: $color-white;
  border-radius: em(24) em(24) 0 0;
  padding: em(30) em(40) em(40);
  display: flex;
  flex-direction: column;

  @include media-breakpoint-down(md) {
    padding: em(20) em(16);
  }

  &__icon {
    &--cross {
      width: em(40);
      height: em(40);
      color: $color-black;

      @include media-breakpoint-down(md) {
        width: em(30);
        height: em(30);
      }
    }

    &--previous {
      width: em(44);
      height: em(44);
      rotate: 90deg;
      color: $color-navigation-arrow;

      @include media-breakpoint-down(md) {
        width: em(30);
        height: em(30);
      }
    }

    &--next {
      width: em(44);
      height: em(44);
      rotate: -90deg;
      color: $color-navigation-arrow;

      @include media-breakpoint-down(md) {
        width: em(30);
        height: em(30);
      }
    }
  }

  &__slider {
    position: relative;
    width: 100%;
  }

  &__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__tag {
    margin-bottom: em(60);

    @include media-breakpoint-down(md) {
      margin-bottom: em(38);
    }
  }

  &__name {
    text-align: center;
    color: $color-black;
  }

  &__button {
    &--cross {
      margin-bottom: em(32);
      margin-left: auto;

      @include media-breakpoint-down(md) {
        margin-bottom: em(22);
      }
    }

    &--submit {
      width: em(288);
      height: em(52);
      margin: em(60) auto 0;

      @include media-breakpoint-down(md) {
        width: 100%;
        margin-top: em(42);
      }
    }

    &--previous {
      position: absolute;
      z-index: $zLevel2;
      left: 0;
      top: 50%;
      translate: 0 -50%;
    }

    &--next {
      position: absolute;
      z-index: $zLevel2;
      right: 0;
      top: 50%;
      translate: 0 -50%;
    }

    &--disabled {
      opacity: 0.5;
      display: none;
    }
  }

  &__font {
    font-family: $font-family-mts-text;
    font-size: em(20);
    line-height: 130%;

    @include media-breakpoint-down(md) {
      font-size: em(16);
    }
  }
}
</style>
