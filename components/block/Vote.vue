<template>
  <div class="block-vote">
    <BlockVoteCounter
      class="block-vote__counter"
      :icon="nominationIcon"
      icon-path="tags"
      :text="nominationName"
      :current-count="currentCount"
      :total-count="totalCount"
    />

    <CardVote
      ref="card"
      :key="activeApplication.application.fullName || activeApplication.application.name"
      class="block-vote__card"
      :application="activeApplication.application"
      :image-src="activeApplication.image"
    />

    <div class="block-vote__buttons">
      <CVoteButton
        class="block-vote__button block-vote__button--dislike"
        text="Пропустить"
        icon="dislike"
        :disabled="isStageChanging"
        @mouseenter="onDisLikeHoverEnter"
        @mouseleave="onLeave"
        @click="onDislikeClick"
      />

      <CVoteButton
        class="block-vote__button block-vote__button--like"
        text="Оценить"
        theme="red"
        icon="like"
        :disabled="isStageChanging"
        @mouseenter="onLikeHoverEnter"
        @mouseleave="onLeave"
        @click="onLikeClick"
      />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable.js';
import { mapActions } from 'vuex';

import breakpoints from '@/config/breakpoints';

import CVoteButton from '@/components/ui/CVoteButton.vue';
import BlockVoteCounter from '@/components/block/VoteCounter.vue';
import CardVote from '@/components/card/Vote.vue';

gsap.registerPlugin(Draggable);

export default {
  name: 'BlockVote',
  components: { CardVote, BlockVoteCounter, CVoteButton },
  props: {
    nominationName: {
      type: String,
      default: undefined,
    },
    nominationIcon: {
      type: String,
      default: undefined,
    },
    redirectLink: {
      type: String,
      default: undefined,
    },

    applications: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      draggable: undefined,

      activeApplicationIndex: 0,

      //Animations
      isStageChanging: false,
      isHoverAnimating: false,
      isClicked: false,

      staticData: Object.seal({
        appearDelayLike: 0.2,
        appearDelayDislike: 0,

        swipeDegree: '50deg',
        transformValue: '200%',
        animationDuration: 0.3,

        breakpoints,
      }),
    };
  },
  computed: {
    activeApplication() {
      return this.applications[this.activeApplicationIndex] || {};
    },

    currentCount() {
      return this.activeApplicationIndex + 1;
    },
    totalCount() {
      return this.applications.length;
    },
  },
  mounted() {
    // this.draggable = Draggable.create(this.$refs.card.$el, {
    //   type: 'x',
    //   onDragEnd: this.onDragEnd,
    //   allowNativeTouchScrolling: true,
    // });
  },
  methods: {
    ...mapActions({
      voteUser: 'votes/voteUser',
    }),

    changeVoteStage(isDislike) {
      if (this.activeApplicationIndex + 1 >= this.applications.length) {
        this.$popup.open('VoteEndPopup', {
          disableClickOutside: true,
          redirectLink: this.redirectLink,
        });
      } else {
        this.activeApplicationIndex++;
        this.appearCardAnimation(isDislike);
      }
    },

    // Drag
    onDragEnd() {
      const { left, width } = this.$refs.card.$el.getBoundingClientRect();
      const halfScreen = window.innerWidth / 2;
      const offsetLeft = left + width / 2;

      switch (true) {
        case offsetLeft > halfScreen + halfScreen / 2:
          this.like();
          break;
        case offsetLeft < halfScreen - halfScreen / 2:
          this.dislike();
          break;

        default:
          gsap.to(this.$refs.card.$el, {
            duration: this.staticData.animationDuration,
            rotate: '0deg',
            left: '0',
            transform: 'none',
          });

          break;
      }
    },

    // Hover handlers
    onLikeHoverEnter() {
      if (this.isClicked || window.innerWidth <= this.staticData.breakpoints.tablet) return;

      this.isHoverAnimating = true;
      this.rotateCardAnimation('10deg', '7%');
    },
    onDisLikeHoverEnter() {
      if (this.isClicked || window.innerWidth <= this.staticData.breakpoints.tablet) return;

      this.isHoverAnimating = true;
      this.rotateCardAnimation('-10deg', '-7%');
    },
    onLeave() {
      if (this.isClicked) return;

      if (this.isHoverAnimating) {
        setTimeout(this.onLeave, this.staticData.animationDuration * 1000);
        return;
      }

      this.rotateCardAnimation('0deg', '0');
    },

    // Click handlers
    onLikeClick() {
      this.like();
    },
    onDislikeClick() {
      this.dislike();
    },
    like() {
      this.isStageChanging = true;

      this.$emit('like');

      this.voteUser({
        applicationId: this.activeApplication.id,
        points: 1,
      });

      this.swipeCardAnimation();
    },
    dislike() {
      this.isStageChanging = true;

      this.voteUser({
        applicationId: this.activeApplication.id,
        points: 0,
      });

      this.swipeCardAnimation(true);
    },

    // Animations
    appearCardAnimation(isDislike) {
      const delay = isDislike
        ? this.staticData.appearDelayDislike
        : this.staticData.appearDelayLike;

      gsap.set(this.$refs.card.$el, {
        duration: this.staticData.animationDuration,
        rotate: '0deg',
        translate: 'none',
        left: 0,
        x: 0,
      });

      gsap.to(this.$refs.card.$el, {
        duration: this.staticData.animationDuration,
        delay,
        autoAlpha: 1,
        onComplete: () => {
          this.isClicked = false;
          this.isStageChanging = false;
        },
      });
    },
    rotateCardAnimation(rotate, translate) {
      gsap.to(this.$refs.card.$el, {
        duration: this.staticData.animationDuration,
        rotate,
        translate,
        onComplete: () => {
          this.isHoverAnimating = false;
        },
      });
    },
    swipeCardAnimation(isReversed) {
      this.isClicked = true;

      const rotate = `${isReversed ? '-' : ''}${this.staticData.swipeDegree}`;
      const translate = `${isReversed ? '-' : ''}${this.staticData.transformValue}`;

      gsap.to(this.$refs.card.$el, {
        duration: this.staticData.animationDuration * 2,
        rotate,
        translate,
        autoAlpha: 0,
        onComplete: () => this.changeVoteStage(isReversed),
      });
    },
  },
};
</script>

<style scoped lang="scss">
.block-vote {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;

  &__counter {
    margin-bottom: em(58);

    @include media-breakpoint-down(lg) {
      margin-bottom: em(37);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      margin-bottom: em(30);
    }
  }

  &__card {
    position: relative;
    z-index: $zLevel2;
    max-width: 100%;
    width: em(800);
    height: em(560);

    @include media-breakpoint-down(xl) {
      width: em(666);
      height: em(500);
    }

    @include media-breakpoint-down(lg) {
      margin-bottom: em(25);
      width: em(506);
      height: em(571);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      height: em(325);
      margin-bottom: em(20);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__button {
    position: absolute;
    z-index: $zLevel1;
    width: em(200);
    height: em(200);

    @include media-breakpoint-down(lg) {
      position: static;
      width: em(120);
      height: em(120);
    }

    &--like {
      top: em(-25);
      right: em(-64);
      transform: translate3d(100%, 100%, 0) rotate(30deg);

      @include media-breakpoint-down(lg) {
        transform: rotate(40deg);
      }

      @include media-breakpoint-down(md) {
        transform: none;
      }
    }

    &--dislike {
      bottom: em(90);
      left: em(-60);
      transform: translate3d(-100%, 0, 0) rotate(-15deg);

      @include media-breakpoint-down(xl) {
        bottom: em(40);
        left: em(-45);
      }

      @include media-breakpoint-down(lg) {
        transform: rotate(-15deg);
        margin-right: em(100);
      }

      @include media-breakpoint-down(md) {
        transform: none;
        margin-right: em(30);
      }
    }
  }
}
</style>
