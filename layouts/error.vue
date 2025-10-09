<template>
  <div class="layout-error">
    <div class="layout-error__container">
      <div class="layout-error__code">
        <span class="layout-error__font layout-error__font--code">
          {{ error.statusCode }}
        </span>
      </div>

      <div v-if="name" class="layout-error__name">
        <span class="layout-error__font layout-error__font--name">
          {{ name }}
        </span>
      </div>

      <div v-if="text" class="layout-error__text">
        <span class="layout-error__font layout-error__font--text">
          {{ text }}
        </span>
      </div>

      <CButton theme="black" class="layout-error__button" :to="staticData.routes.MAIN">
        <span class="layout-error__font layout-error__font--button"> на главную </span>
      </CButton>
    </div>
  </div>
</template>

<script>
import routes from '@/constants/routes';

export default {
  name: 'LayoutError',
  layout: 'minimized-black',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      staticData: Object.seal({
        routes,
        errors: {
          404: {
            name: 'страница не найдена',
            text: 'Неправильно набран адрес или такой страницы не существует.',
          },
        },
      }),
    };
  },
  computed: {
    name() {
      if (!this.error.statusCode) return;

      return this.staticData.errors[this.error.statusCode]?.name;
    },
    text() {
      if (!this.error.statusCode) return;

      return this.staticData.errors[this.error.statusCode]?.text;
    },
  },
};
</script>

<style scoped lang="scss">
.layout-error {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: em(235) 0 em(130);

    @include media-breakpoint-down(xl) {
      padding: em(139) 0 em(82);
    }

    @include media-breakpoint-down(lg) {
      padding: em(166) 0 em(127);
    }

    @include media-breakpoint-down(md) {
      padding: em(160) em(16) em(142);
    }
  }

  &__code {
    color: $color-grey;
    margin-bottom: em(4);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(11);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(10);
    }
  }

  &__name {
    color: $color-black-new;
    text-transform: uppercase;
    margin-bottom: em(16);

    @include media-breakpoint-down(md) {
      margin-bottom: em(20);
    }
  }

  &__text {
    text-align: center;
    color: $color-black-grey;

    @include media-breakpoint-down(md) {
      max-width: em(246);
    }
  }

  &__button {
    text-transform: uppercase;
    height: em(52);
    margin-top: em(70);

    @include media-breakpoint-down(xl) {
      margin-top: em(60);
    }

    @include media-breakpoint-down(md) {
      margin-top: em(40);
    }
  }

  &__font {
    &--code {
      font-size: em(270);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(xl) {
        font-size: em(220);
      }

      @include media-breakpoint-down(md) {
        font-size: em(100);
      }
    }

    &--name {
      font-size: em(35);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(16);
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

      @include media-breakpoint-down(md) {
        font-size: em(14);
      }
    }

    &--button {
      font-size: em(12);
      font-weight: 500;
      line-height: 100%;
    }
  }
}
</style>
