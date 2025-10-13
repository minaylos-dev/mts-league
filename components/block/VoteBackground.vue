<template>
  <div class="block-vote-background">
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
export default {
  name: 'BlockVoteBackground',
};
</script>

<style scoped lang="scss">
.block-vote-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(125deg, #dcd1ea 0, #b7b7cc 70%);
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
