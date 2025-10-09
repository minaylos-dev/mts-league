<template>
  <div class="post">
    <div ref="content" class="post__content">
      <div class="post__title">
        <h4 class="post__font post__font--title">{{ title }}</h4>
      </div>
      <div v-if="author" class="post__author">
        <span class="post__font post__font--author">
          <b>Лидер проекта</b>&nbsp; <span v-html="author"></span
        ></span>
      </div>
      <div v-if="team" class="post__author">
        <span class="post__font post__font--author">
          <b>Команда проекта</b>&nbsp;
          <span v-html="team"></span>
        </span>
      </div>
      <div v-if="text" class="post__text">
        <span class="post__font post__font--text">
          <b>{{ isProject ? 'Цель проекта' : 'Почему номинант достоин победы' }}</b> <br />
          <span v-html="formattedText"></span>
        </span>
      </div>
    </div>
    <div class="post__media">
      <div class="post__image">
        <img class="post__pic" :src="image" alt="post picture" />
      </div>
      <div v-if="likes" class="post__likes">
        <span class="post__font post__font--like">{{ Math.ceil(likes) }}</span>
        <div class="post__likes-ico">
          <CIcon name="heart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CIcon from '@/components/ui/CIcon.vue';

import nominations from '@/config/nominations';

export default {
  components: {
    CIcon,
  },
  props: {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    team: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
    },
    nominationId: {
      type: Number,
    },
  },

  computed: {
    isProject() {
      const nominationsItems = nominations.items;
      return (
        this.nominationId === nominationsItems[2].id || this.nominationId === nominationsItems[3].id
      );
    },

    formattedText() {
      return this.removeLinks(this.text);
    },
  },

  methods: {
    removeLinks(str) {
      const linkPattern = /(https?:\/\/[^\s]+)/g;
      return str.replace(linkPattern, '');
    },
  },
};
</script>

<style scoped lang="scss">
.post {
  display: flex;
  justify-content: space-between;
  gap: em(40);
  background: $color-white;
  border-radius: em(32);
  padding: em(40);

  @include media-breakpoint-down(md) {
    flex-direction: column;
    padding: em(20);
    border-radius: em(24);
    gap: em(16);
  }

  &__font {
    &--title {
      font-weight: $medium;
      font-size: em(30);
      line-height: 100%;
      color: $color-black-grey;

      @include media-breakpoint-down(lg) {
        font-size: em(26);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
      }
    }
    &--author {
      font-family: $font-family-mts-text;
      color: $color-inputs;
      font-size: em(16);
      line-height: 150%;

      @include media-breakpoint-down(lg) {
        font-size: em(14);
      }

      @include media-breakpoint-down(md) {
        font-size: em(12);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;
      text-overflow: ellipsis;

      @include media-breakpoint-down(lg) {
        font-size: em(18);
      }

      @include media-breakpoint-down(md) {
        font-size: em(14);
      }
    }

    &--like {
      font-family: $font-family-mts-text;
      font-weight: $medium;
      font-size: em(20);
      line-height: 150%;

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }

    > b {
      font-weight: $medium;
    }
  }

  &__title {
    margin-bottom: em(10);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      overflow-wrap: break-word;
    }

    > span {
      -webkit-line-clamp: 8;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  &__author {
    margin-bottom: em(10);
  }

  &__media {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include media-breakpoint-down(md) {
      align-items: flex-start;
    }
  }

  &__image {
    border-radius: em(16);
    overflow: hidden;
    width: em(140);
    height: em(140);
    margin-bottom: em(20);

    @include media-breakpoint-down(lg) {
      width: em(160);
      height: em(160);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      height: em(248);
      margin-bottom: em(16);
    }
  }

  &__pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__likes {
    padding: em(12) em(24);
    border-radius: em(27);
    height: em(54);
    display: flex;
    align-items: center;
    gap: em(14);
    background: $color-bg-grey;

    color: $color-red;

    @include media-breakpoint-down(md) {
      height: em(48);
      gap: em(10);
    }

    &-ico {
      width: em(19);
      height: em(15);

      @include media-breakpoint-down(md) {
        width: em(16);
      }
    }
  }
}
</style>
