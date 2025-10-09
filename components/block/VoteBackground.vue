<template>
  <div ref="background" class="block-vote-background">
    <div class="block-vote-background__wrapper">
      <CIcon
        v-for="index in 20"
        :key="index"
        class="block-vote-background__icon"
        :class="`block-vote-background__icon--${index}`"
        name="like"
        path="vote"
      />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'BlockVoteBackground',
  data() {
    return {
      staticData: Object.seal({
        iconsAnimationDuration: 2,

        backgroundAnimationDuration: 0.3,
        startBackground:
          'linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%), radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%), radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%), radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);',
        changedBackground:
          'linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%), radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%), radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%), radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);',
      }),
    };
  },
  mounted() {
    this.resetIcons();
  },
  methods: {
    resetIcons() {
      gsap.set('.block-vote-background__icon', {
        top: `100%`,
        autoAlpha: 0,
      });
    },
    animateLike() {
      this.resetIcons();

      const backgroundResetDelay =
        this.staticData.iconsAnimationDuration - this.staticData.backgroundAnimationDuration;

      const timeline = gsap.timeline();

      timeline
        .fromTo(
          this.$refs.background,
          {
            background: this.staticData.startBackground,
          },
          {
            duration: this.staticData.backgroundAnimationDuration,
            background: this.staticData.changedBackground,
          }
        )
        .to(
          '.block-vote-background__icon',
          {
            duration: this.staticData.iconsAnimationDuration,
            stagger: 0.1,
            top: `-100%`,
            autoAlpha: 1,
          },
          '<'
        )
        .fromTo(
          this.$refs.background,
          {
            background: this.staticData.changedBackground,
          },
          {
            duration: this.staticData.backgroundAnimationDuration,
            background: this.staticData.startBackground,
          },
          `<+=${backgroundResetDelay}`
        );
    },
  },
};
</script>

<style scoped lang="scss">
.block-vote-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
    radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
    radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%),
    radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);
  overflow: hidden;

  &__wrapper {
    width: 100%;
    height: 100%;
    rotate: 30deg;

    @include media-breakpoint-down(lg) {
      rotate: 15deg;
    }
  }

  &__icon {
    position: absolute;
    color: rgba($color-white, 0.8);
    top: 110%;

    @for $index from 1 through 20 {
      &--#{$index} {
        height: calc(#{em(50)} * random(7));
        left: calc(#{em(10)} * random(100));

        @include media-breakpoint-down(lg) {
          height: calc(#{em(25)} * random(7));
          left: calc(#{em(10)} * random(50));
        }
      }
    }
  }
}
</style>
