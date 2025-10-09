<template>
  <div class="pages-winners">
    <div class="pages-winners__wrapper">
      <SectionWinnersIntro />
    </div>

    <SectionMainRatingPosts id="rating" />
    <SectionAwards />
  </div>
</template>

<script>
const SectionWinnersIntro = () => import('@/components/section/winners/Intro.vue');
const SectionAwards = () => import('@/components/section/winners/Awards.vue');
const SectionMainRatingPosts = () => import('@/components/section/main/RatingPosts.vue');

export default {
  name: 'Winners',
  components: { SectionWinnersIntro, SectionAwards, SectionMainRatingPosts },

  mounted() {
    if (process.client) {
      window.parent.postMessage(
        {
          type: 'scrolltop',
        },
        '*'
      );
    }
  },
};
</script>

<style scoped lang="scss">
.pages-winners {
  flex-grow: 1;

  &__wrapper {
    background-image: url($img-path + 'main/background/1280.jpg');
    background-size: cover;
    background-repeat: no-repeat;

    @include media-breakpoint-down(xl) {
      background-image: url($img-path + 'main/background/1280.jpg');
    }

    @include media-breakpoint-down(lg) {
      background-image: url($img-path + 'main/background/768.jpg');
    }

    @include media-breakpoint-down(md) {
      background-image: url($img-path + 'main/background/320.jpg');
    }
  }
}
</style>
