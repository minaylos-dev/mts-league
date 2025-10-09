<template>
  <div class="pages-vote-president">
    <div class="pages-vote-president__tooltip">
      <span class="pages-vote-president__font pages-vote-president__font--tooltip"
        >Выбери лучший проект в этой номинации</span
      >
    </div>
    <CardExpertVote
      class="pages-vote-president__card"
      :applications="applications"
      :nomination-icon="nominationIcon"
      :nomination-name="nominationName"
      :nomination-id="nominationId"
      :redirect-link="redirectLink"
      @onRate="onRateHandler"
      @onRateClick="onRateClick"
      @update-application="updateApplication"
    />
  </div>
</template>

<script>
import CardExpertVote from '@/components/card/ExpertVote.vue';

import { scrollTo } from '@/tools/helpers';

import { mapGetters } from 'vuex';

export default {
  name: 'BlockVoteExpert',
  components: { CardExpertVote },
  props: {
    nominationName: {
      type: String,
      default: undefined,
    },
    nominationIcon: {
      type: String,
      default: undefined,
    },
    nominationId: {
      type: Number,
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
      applicationData: null,
    };
  },
  computed: {
    ...mapGetters({
      isIframe: 'auth/isIframe',
    }),
  },
  methods: {
    scrollTo,

    updateApplication(data) {
      this.$emit('update-application', data);
    },

    onRateClick() {
      this.scrollTo('#vote-block', this.$device.isMobile, this.isIframe);
    },

    onRateHandler(data) {
      this.applicationData = data;

      this.scrollTo(null, this.$device.isMobile, this.isIframe);
    },
  },
};
</script>

<style scoped lang="scss">
.pages-vote-president {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: em(80) em(75) em(60);
  background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
    radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
    radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%),
    radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);

  @include media-breakpoint-down(lg) {
    padding: em(56) em(40) em(88);
  }

  @include media-breakpoint-down(md) {
    padding: em(62) em(16) em(50);
  }

  &__font {
    &--tooltip {
      font-family: $font-family-mts-text;
      font-size: em(16);
      line-height: 150%;
      color: $color-white;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }
    }
  }

  &__tooltip {
    padding: em(10) em(16);
    background: rgba(255, 255, 255, 0.1);
    border-radius: em(16);
    margin: 0 auto em(40);

    @include media-breakpoint-down(md) {
      position: static;
      transform: none;
      margin-bottom: em(32);
      text-align: center;
    }
  }
}
</style>
