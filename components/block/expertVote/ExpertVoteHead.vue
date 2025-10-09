<template>
  <div class="block-expert-vote-head">
    <div class="block-expert-vote-head__head">
      <CTag
        v-if="tagIcon"
        class="block-expert-vote-head__tag"
        :icon-name="tagIcon"
        :title="tagName"
        size="s"
        disabled
      />

      <div class="block-expert-vote-head__navigation">
        <div class="block-expert-vote-head__pages">
          <span class="block-expert-vote-head__font block-expert-vote-head__font--pages">
            {{ activeIndexApplication }}/{{ applicationsCount }}
          </span>
        </div>
        <div>
          <button
            type="button"
            class="block-expert-vote-head__button block-expert-vote-head__button--navigation"
            :disabled="isFirstApplication"
            @click="$emit('prev-click')"
          >
            <CIcon
              class="block-expert-vote-head__icon block-expert-vote-head__icon--navigation block-expert-vote-head__icon--prev"
              name="chevron-circle"
            />
          </button>

          <button
            type="button"
            class="block-expert-vote-head__button block-expert-vote-head__button--navigation"
            :disabled="isLastApplication"
            @click="$emit('next-click')"
          >
            <CIcon
              class="block-expert-vote-head__icon block-expert-vote-head__icon--navigation"
              name="chevron-circle"
            />
          </button>
        </div>
      </div>
    </div>

    <div class="block-expert-vote-head__wrapper block-expert-vote-head__wrapper--content">
      <div class="block-expert-vote-head__column">
        <div class="block-expert-vote-head__content">
          <div :key="projectName" class="block-expert-vote-head__title">
            <span class="block-expert-vote-head__font block-expert-vote-head__font--title">
              {{ projectName }}
            </span>
          </div>

          <div v-if="leader" :key="leader" class="block-expert-vote-head__info">
            <span class="block-expert-vote-head__font block-expert-vote-head__font--name">
              Лидер проекта:
            </span>

            <span class="block-expert-vote-head__font block-expert-vote-head__font--value">
              {{ leader }}
            </span>
          </div>

          <div v-if="team" :key="team" class="block-expert-vote-head__info">
            <span class="block-expert-vote-head__font block-expert-vote-head__font--name">
              Команда:
            </span>

            <span class="block-expert-vote-head__font block-expert-vote-head__font--value">
              {{ team }}
            </span>
          </div>

<!--          <div v-if="company " :key="company" class="block-expert-vote-head__info">-->
<!--            <span class="block-expert-vote-head__font block-expert-vote-head__font&#45;&#45;name">-->
<!--              Компания:-->
<!--            </span>-->

<!--            <span class="block-expert-vote-head__font block-expert-vote-head__font&#45;&#45;value">-->
<!--              {{ company }}-->
<!--            </span>-->
<!--          </div>-->
        </div>

        <CButton
          class="block-expert-vote-head__button block-expert-vote-head__button--rate"
          :text="buttonText"
          :theme="buttonTheme"
          @click.native="$emit('onRateClick')"
        >
          <template v-if="isVoted" #icon-right>
            <CIcon
              class="block-expert-vote-head__icon block-expert-vote-head__icon--edit"
              name="edit"
            />
          </template>
        </CButton>
      </div>

      <div class="block-expert-vote-head__wrapper block-expert-vote-head__wrapper--image">
        <CPointsButton
          v-if="isVoted"
          class="block-expert-vote-head__voted"
          :assessments="assessments"
        />

        <img class="block-expert-vote-head__image" :src="projectImage" alt="project-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockExpertVoteHead',
  props: {
    projectName: {
      type: String,
      default: undefined,
    },
    projectImage: {
      type: String,
      default: undefined,
    },

    tagIcon: {
      type: String,
      default: undefined,
    },
    tagName: {
      type: String,
      default: undefined,
    },

    leader: {
      type: String,
      default: undefined,
    },
    team: {
      type: String,
      default: undefined,
    },
    company: {
      type: String,
      default: undefined,
    },

    isFirstApplication: {
      type: Boolean,
      default: false,
    },
    isLastApplication: {
      type: Boolean,
      default: false,
    },

    isVoted: {
      type: Boolean,
      default: false,
    },

    assessments: {
      type: Array,
      default: () => [],
    },

    activeIndexApplication: {
      type: Number,
      default: 1,
    },

    applicationsCount: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    buttonText() {
      return this.isVoted ? 'Изменить оценку' : 'Оценить';
    },
    buttonTheme() {
      return this.isVoted ? 'outlined-black' : 'black';
    },
  },
};
</script>

<style scoped lang="scss">
.block-expert-vote-head {
  display: flex;
  flex-direction: column;
  padding: em(60);
  background: $color-light-grey;
  position: relative;

  @include media-breakpoint-down(lg) {
    padding: em(50);
  }

  @include media-breakpoint-down(md) {
    padding: em(20) em(16) em(50);
  }

  &__wrapper {
    &--content {
      display: flex;
      justify-content: space-between;

      @include media-breakpoint-down(md) {
        flex-direction: column-reverse;
        margin-bottom: em(16);
      }
    }

    &--image {
      position: relative;
      margin-left: em(60);
      flex-shrink: 0;

      @include media-breakpoint-down(lg) {
        margin-left: em(40);
      }

      @include media-breakpoint-down(md) {
        display: flex;
        align-items: flex-start;
        flex-direction: row-reverse;
        justify-content: space-between;
        width: 100%;
        margin-left: 0;
        margin-bottom: em(24);
      }
    }
  }

  &__pages {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-black;
    border-radius: em(30);
    width: em(90);
    height: em(52);
    margin-right: em(16);

    @include media-breakpoint-down(md) {
      position: static;
      width: em(77);
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: em(32);

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: em(40);
    }
  }

  &__tag {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__navigation {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      margin-top: em(16);
      width: 100%;
      justify-content: space-between;
    }
  }

  &__icon {
    flex-shrink: 0;

    &--navigation {
      width: em(50);
      height: em(50);
    }

    &--prev {
      transform: rotate(180deg);
    }

    &--edit {
      width: em(24);
      height: em(24);
      margin-left: em(10);
    }
  }

  &__button {
    &--navigation {
      color: $color-black-new;
      transition: color $trans-time;

      &:not(:last-child) {
        margin-right: em(16);

        @include media-breakpoint-down(md) {
          margin-right: em(6);
        }
      }

      &:hover {
        opacity: 0.75;
      }

      &:disabled {
        color: $color-grey;
        opacity: 0.5;
      }
    }

    &--rate {
      margin-top: auto;

      @include media-breakpoint-down(md) {
        width: 100%;
        margin-top: em(40);
        height: em(52);
      }
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__content {
    min-width: 0;
    overflow: hidden;
    margin-bottom: em(16);
  }

  &__image {
    width: em(300);
    height: em(300);
    border-radius: em(24);

    @include media-breakpoint-down(lg) {
      width: em(180);
      height: em(180);
    }

    @include media-breakpoint-down(md) {
      width: em(160);
      height: em(160);
      border-radius: em(16);

      &:only-child {
        margin-right: auto;
      }
    }
  }

  &__title {
    color: $color-black-new;
    margin-bottom: em(20);

    @include media-breakpoint-down(md) {
      margin-bottom: em(24);
    }
  }

  &__info {
    color: $color-black;

    &:not(:last-child) {
      margin-bottom: em(20);
    }
  }

  &__voted {
    position: absolute;
    top: em(20);
    right: em(20);
    width: em(146);
    height: em(50);

    @include media-breakpoint-down(lg) {
      width: em(100);
      height: em(34);
      top: em(10);
      right: em(10);
    }

    @include media-breakpoint-down(md) {
      position: static;
    }
  }

  &__font {
    &--title {
      font-size: em(40);
      font-weight: 500;
      line-height: 110%;

      @include media-breakpoint-down(lg) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }

    &--pages {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;
    }

    &--name {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 500;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(12);
      }
    }

    &--value {
      font-family: $font-family-mts-text;
      font-size: em(20);
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(12);
      }
    }

    &--tooltip {
      font-family: $font-family-mts-text;
      font-size: em(16);
      line-height: 150%;
      color: $color-white;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }
    }
  }
}
</style>
