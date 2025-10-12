<template>
  <div class="pages-main">
    <div class="pages-main__wrapper">
      <SectionMainIntro />
      <SectionMainProgram id="program" />
    </div>

    <SectionMainNominations v-if="true" id="nominations" />
    <!--    <SectionMainPrizes id="prizes" />-->

    <SectionMainRatingStartedUser v-if="false" id="voting" />
    <!--    <SectionMainRatingStartedExpert v-if="!isVoteDisabled && isExpert" id="voting" />-->

    <SectionMainRatingPosts id="rating" />
    <!--    <SectionMainRating id="rating" />-->

    <SectionMainWinners id="winners" />
    <!--    <SectionMainWinnersRating id="winners-rating" />-->

    <SectionMainFaq id="faq" />

    <SectionFeedback id="feedback" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SectionMainIntro from '@/components/section/main/Intro.vue';

const SectionMainProgram = () => import('@/components/section/main/Program.vue');
const SectionMainNominations = () => import('@/components/section/main/Nominations.vue');
// const SectionMainPrizes = () => import('@/components/section/main/Prizes.vue');
// const SectionMainRatingStartedExpert = () =>
//   import('@/components/section/main/RatingStartedExpert.vue');
const SectionMainRatingStartedUser = () =>
  import('@/components/section/main/RatingStartedUser.vue');
const SectionMainRatingPosts = () => import('@/components/section/main/RatingPosts.vue');
// const SectionMainRating = () => import('@/components/section/main/Rating.vue');1
const SectionMainWinners = () => import('@/components/section/main/Winners.vue');
// const SectionMainWinnersRating = () => import('@/components/section/main/WinnersRating.vue');
const SectionMainFaq = () => import('@/components/section/main/Faq.vue');
const SectionFeedback = () => import('@/components/section/main/Feedback.vue');

export default {
  name: 'PagesMain',
  components: {
    // SectionMainWinnersRating,
    // SectionMainPrizes,
    // SectionMainRatingStartedExpert,
    SectionMainRatingStartedUser,
    SectionMainFaq,
    SectionMainNominations,
    SectionMainProgram,
    SectionMainIntro,
    SectionMainRatingPosts,
    SectionFeedback,
    SectionMainWinners,
    // SectionMainRating,
  },
  computed: {
    ...mapGetters({
      isVoteDisabled: 'user/isVoteDisabled',
      isExpert: 'user/isExpert',
    }),
  },
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
.pages-main {
  //flex-grow: 1;

  &__wrapper {
    background: linear-gradient(109deg, #dcd1ea 0, #b7b7cc 70%);
  }
}
</style>
