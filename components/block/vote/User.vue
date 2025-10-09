<template>
  <LayoutVote
    :applications="applications"
    :nomination-icon="nominationIcon"
    :nomination-name="nominationName"
    :redirect-link="redirectLink"
  />
</template>

<script>
import LayoutVote from '@/components/layout/Vote.vue';

export default {
  name: 'BlockVoteUser',
  components: { LayoutVote },
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
};
</script>
