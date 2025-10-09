<template>
  <div class="card-vote">
    <img class="card-vote__image" :src="imageSrc" alt="nomination-image" />

    <vue-simplebar class="card-vote__wrapper">
      <div :key="application.fullName || application.name" class="card-vote__title">
        <span v-typograph class="card-vote__font card-vote__font--title">
          {{ application.fullName || application.name }}
        </span>
      </div>

      <div class="card-vote__text-wrapper">
        <div v-for="(item, index) in textsList" :key="index" class="card-vote__text">
          <div class="card-vote__name">
            <span :key="item.title" v-typograph class="card-vote__font card-vote__font--text-name">
              {{ item.title }}
            </span>
          </div>

          <span
            :key="item.value"
            v-typograph
            class="card-vote__font card-vote__font--text"
            v-html="item.value"
          />
        </div>
      </div>
    </vue-simplebar>
  </div>
</template>

<script>
export default {
  name: 'CardVote',
  props: {
    application: {
      type: Object,
      default: () => ({}),
    },

    imageSrc: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      staticData: Object.seal({
        titles: {
          fullName: 'ФИО сотрудника',
          description: 'Почему номинант достоин победы',
          name: 'Наименование проекта',
          leader: 'Лидер проекта',
          goal: 'Цель проекта',
          objectives: 'Основные задачи, которые решает проект',
          team: 'Команда',
          results: 'Результаты проекта',
        },
      }),
    };
  },
  computed: {
    textsList() {
      const fieldNames = ['leader', 'description', 'goal', 'objectives', 'team', 'results'];

      return Object.entries(this.application)
        .filter(([key]) => fieldNames.includes(key))
        .map(([key, value]) => ({
          title: this.staticData.titles[key],
          value,
        }));
    },
  },
};
</script>

<style scoped lang="scss">
.card-vote {
  display: flex;
  align-items: flex-start;
  padding: em(60);
  background-color: $color-white;
  border-radius: em(40);

  @include media-breakpoint-down(xl) {
    padding: em(50);
  }

  @include media-breakpoint-down(lg) {
    flex-direction: column;
  }

  @include media-breakpoint-down(md) {
    border-radius: em(24);
    padding: em(20) em(16);
  }

  &__image {
    width: em(180);
    height: em(180);
    object-fit: cover;
    border-radius: em(24);
    margin-right: em(40);
    flex-shrink: 0;

    @include media-breakpoint-down(xl) {
      width: em(120);
      height: em(120);
    }

    @include media-breakpoint-down(lg) {
      flex-direction: column;
      width: em(100);
      height: em(100);
      margin-right: 0;
      margin-bottom: em(40);
    }

    @include media-breakpoint-down(md) {
      width: em(60);
      height: em(60);
      margin-bottom: em(24);
      border-radius: em(16);
    }
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    min-height: 0;
    min-width: 0;
  }

  &__title {
    color: $color-black;
    margin-bottom: em(10);
  }

  &__subtitle {
    color: $color-inputs;
  }

  &__text-wrapper {
    width: 100%;
    color: $color-black-default;
    margin-top: em(40);
    padding-right: em(12);

    @include media-breakpoint-down(md) {
      margin-top: em(24);
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:last-child) {
      margin-bottom: em(24);
    }
  }

  &__name {
    margin-bottom: em(10);
  }

  &__font {
    &--title {
      font-size: em(30);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--text-name {
      font-family: $font-family-mts-text;
      font-weight: 500;
    }

    &--text {
      width: 100%;
      min-width: 0;
      font-family: $font-family-mts-text;
      font-size: em(16);
      font-weight: 400;
      line-height: 150%;
      overflow-wrap: break-word;

      @include media-breakpoint-down(md) {
        font-size: em(12);
      }
    }
  }
}

::v-deep .simplebar-scrollbar::before {
  opacity: 0.5;
  background-color: $color-grey;
  width: em(4);
  border-radius: em(10);
}
</style>
