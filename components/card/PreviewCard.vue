<template>
  <div class="preview-card">
    <div class="preview-card__part preview-card__part--text">
      <h3 :key="title" class="preview-card__title">
        <span v-typograph class="preview-card__font preview-card__font--title">
          {{ title }}
        </span>
      </h3>

      <div v-if="leader" :key="leader" class="preview-card__leader">
        <span class="preview-card__font preview-card__font--leader">
          <span class="preview-card__font--500">Лидер проекта</span> {{ leader }}
        </span>
      </div>

      <div v-if="goal" :key="goal" class="preview-card__text">
        <div>
          <span class="preview-card__font preview-card__font--text preview-card__font--500">
            Цель проекта
          </span>
        </div>
        <span v-typograph class="preview-card__font preview-card__font--text">
          {{ goal }}
        </span>
      </div>

      <div v-if="description" class="preview-card__text">
        <div>
          <span class="preview-card__font preview-card__font--text preview-card__font--500">
            Почему номинант достоин победы
          </span>
        </div>
        <span :key="description" v-typograph class="preview-card__font preview-card__font--text">
          {{ description }}
        </span>
      </div>
    </div>

    <div class="preview-card__part preview-card__part--media">
      <div class="preview-card__image-wrapper">
        <img :src="image" alt="img" class="preview-card__image" />
      </div>

      <CLikeButton
        v-if="!disableLikes"
        :count="points"
        :is-liked="isVoted"
        class="preview-card__like-button"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewCard',

  props: {
    title: {
      type: String,
      default: undefined,
    },

    leader: {
      type: String,
      default: undefined,
    },

    image: {
      type: String,
      default: undefined,
    },

    points: {
      type: Number,
      default: undefined,
    },

    goal: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },

    isVoted: {
      type: Boolean,
      default: false,
    },

    disableLikes: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-card {
  padding: em(20);
  background-color: $color-white;
  border-radius: em(24);

  @include media-breakpoint-up(md) {
    display: flex;
    padding: em(40);
  }

  &__part {
    &--text {
      width: 100%;
      min-width: 0;
      margin: 0 0 em(16);
      overflow: hidden;

      @include media-breakpoint-up(md) {
        margin: 0 em(40) 0 0;
      }
    }

    &--media {
    }
  }

  &__title {
    color: $color-red;
    font-size: unset;
    overflow-wrap: break-word;
  }

  &__leader {
    margin-top: em(10);
    color: $color-inputs;
  }

  &__text {
    margin-top: em(16);
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
  }

  &__image-wrapper {
    height: em(248);
    border-radius: em(16);
    overflow: hidden;
    margin-bottom: em(16);
    background-color: black;

    @include media-breakpoint-up(md) {
      height: em(160);
      width: em(160);
      margin-bottom: em(20);
    }

    @include media-breakpoint-up(lg) {
      height: em(140);
      width: em(140);
    }

    @include media-breakpoint-up(xl) {
      height: em(180);
      width: em(180);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__like-button {
    cursor: auto;

    @include media-breakpoint-up(md) {
      margin-left: auto;
    }
  }

  &__font {
    &--title {
      font-size: em(20);
      line-height: 1;
      font-weight: 500;

      @include media-breakpoint-up(md) {
        font-size: em(26);
      }

      @include media-breakpoint-up(lg) {
        font-size: em(30);
      }
    }

    &--leader {
      font-size: em(12);
      line-height: em(18, 12);
      font-family: $font-family-mts-text;

      @include media-breakpoint-up(md) {
        font-size: em(14);
        line-height: em(21, 14);
      }

      @include media-breakpoint-up(lg) {
        font-size: em(16);
        line-height: em(24, 16);
      }
    }

    &--text {
      font-size: em(14);
      line-height: em(21, 14);
      font-family: $font-family-mts-text;

      @include media-breakpoint-up(md) {
        font-size: em(18);
        line-height: em(24, 18);
      }

      @include media-breakpoint-up(lg) {
        font-size: em(20);
        line-height: em(26, 20);
      }
    }

    &--500 {
      font-family: $font-family-mts-text;
      font-weight: 500;
    }
  }
}
</style>
