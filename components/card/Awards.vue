<template>
  <div class="card-awards" :class="{ 'card-awards--with-button': !hideButton }">
    <div class="card-awards__background" />
    <div class="card-awards__items" />

    <div class="card-awards__container">
      <div class="card-awards__heading">
        <span class="card-awards__font card-awards__font--heading"> Награждение победителей </span>
      </div>

      <div class="card-awards__title">
        <span class="card-awards__font card-awards__font--title">
          Смотри онлайн <br />
          трансляцию награждения
        </span>
      </div>

      <div class="card-awards__date">
        <span class="card-awards__font card-awards__font--date">
          25 декабря <br />
          в 14:00
        </span>
      </div>

      <CButton
        v-if="!hideButton"
        class="card-awards__button"
        text="Смотреть трансляцию"
        :to="staticData.routes.BROADCAST"
        disable-paddings
      />
    </div>
  </div>
</template>

<script>
import routes from '@/constants/routes';

export default {
  name: 'CardAwards',
  props: {
    hideButton: {
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
};
</script>

<style scoped lang="scss">
.card-awards {
  $parent: &;

  position: relative;
  overflow: hidden;
  border-radius: em(40);

  @include media-breakpoint-down(md) {
    border-radius: em(24);
  }

  &__background {
    position: absolute;
    transform: scale(1, -1);
    z-index: $zLevel1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
      radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
      radial-gradient(
        88.91% 74.62% at 86.33% 94.09%,
        rgb(218, 218, 228) 0%,
        rgb(218, 218, 228) 100%
      ),
      radial-gradient(
        91.35% 58.22% at 53.95% 115.88%,
        rgb(234, 233, 231) 0%,
        rgb(234, 233, 231) 100%
      );
  }

  &__items {
    position: absolute;
    z-index: $zLevel1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: bottom right / em(850) no-repeat url($img-path + 'winners/awards/bg.png');

    @include media-breakpoint-down(lg) {
      background: bottom right / em(512) no-repeat url($img-path + 'winners/awards/bg.png');
    }

    @include media-breakpoint-down(md) {
      background: center em(180) / 100% no-repeat url($img-path + 'winners/awards/bg-mobile.png');
    }
  }

  &__container {
    position: relative;
    z-index: $zLevel2;
    padding: em(111) em(128) em(234);

    @include media-breakpoint-down(xl) {
      padding: em(90) em(100) em(180);
    }

    @include media-breakpoint-down(lg) {
      padding: em(32) em(40) em(120);
    }

    @include media-breakpoint-down(md) {
      padding: em(30) em(15) em(330);
    }
  }

  &__heading {
    color: $color-white;
    margin-bottom: em(40);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(32);
    }

    @include media-breakpoint-down(lg) {
      margin-bottom: em(20);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(10);
    }
  }

  &__title {
    color: $color-white;
    margin-bottom: em(40);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(32);
    }

    @include media-breakpoint-down(lg) {
      margin-bottom: em(20);
    }
  }

  &__date {
    &:not(:last-child) {
      margin-bottom: em(40);

      @include media-breakpoint-down(xl) {
        margin-bottom: em(32);
      }

      @include media-breakpoint-down(lg) {
        margin-bottom: em(20);
      }

      @include media-breakpoint-down(md) {
        margin-bottom: em(237);
      }
    }
  }

  &__button {
    display: flex;
    width: em(302);
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__font {
    &--heading {
      font-size: em(120);
      font-style: normal;
      font-weight: 500;
      line-height: 97.5%;

      @include media-breakpoint-down(xl) {
        font-size: em(96);
      }

      @include media-breakpoint-down(lg) {
        font-size: em(58);
      }

      @include media-breakpoint-down(md) {
        font-size: em(30);
      }
    }

    &--title {
      font-size: em(40);
      font-style: normal;
      font-weight: 500;
      line-height: 97.5%;

      @include media-breakpoint-down(xl) {
        font-size: em(32);
      }

      @include media-breakpoint-down(lg) {
        font-size: em(25);
      }

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }

    &--date {
      font-size: em(60);
      font-style: normal;
      font-weight: 500;
      line-height: 97.5%;

      @include media-breakpoint-down(xl) {
        font-size: em(48);
      }

      @include media-breakpoint-down(lg) {
        font-size: em(38);
      }

      @include media-breakpoint-down(md) {
        font-size: em(24);
      }
    }
  }

  &--with-button {
    #{$parent} {
      &__container {
        @include media-breakpoint-down(md) {
          padding: em(30) em(15) em(40);
        }
      }
    }
  }
}
</style>
