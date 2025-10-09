<template>
  <div class="layout-vote">
    <BlockVoteBackground ref="background" />

    <BlockVote
      :nomination-name="nominationName"
      :nomination-icon="nominationIcon"
      :applications="applications"
      :redirect-link="redirectLink"
      @like="animateLike"
    />
  </div>
</template>

<script>
import BlockVoteBackground from '@/components/block/VoteBackground.vue';
import BlockVote from '@/components/block/Vote.vue';

export default {
  name: 'LayoutVote',
  components: { BlockVote, BlockVoteBackground },
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
  methods: {
    animateLike() {
      if (!this.$refs.background) return;

      this.$refs.background.animateLike();
    },
  },
};
</script>

<style scoped lang="scss">
.layout-vote {
  $parent: &;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: em(80);
  padding-bottom: em(80);
  flex-grow: 1;

  @include media-breakpoint-down(xl) {
    padding-bottom: em(66);
  }

  @include media-breakpoint-down(lg) {
    padding-bottom: em(30);
  }

  @include media-breakpoint-down(md) {
    padding: em(62) em(16) em(20);
  }
}
</style>
