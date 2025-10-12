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
    background: linear-gradient(125deg, #dcd1ea 0, #b7b7cc 70%);
  }
}
</style>
