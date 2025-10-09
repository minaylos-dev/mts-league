<template>
  <div id="app" class="layout-minimized">
    <LayoutHeader
      minimized
      class="layout-minimized__header"
      theme="black"
      :is-scrolled="isScrolled"
      with-cross
      :cross-theme="crossTheme"
      @close="onClose"
    />

    <Nuxt class="layout-minimized__page" />

    <Popup class="layout-minimized__popup" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import routes from '@/constants/routes';

const LayoutHeader = () => import('@/components/layout/Header.vue');

const Popup = () => import('@/components/layout/Popup.vue');

import pageHeightChangeWatcher from '@/mixins/pageHeightChangeWatcher';

export default {
  name: 'MinimizedLayoutBlack',
  components: { LayoutHeader, Popup },
  mixins: [pageHeightChangeWatcher],
  data() {
    return {
      isScrolled: false,
    };
  },
  computed: {
    ...mapGetters({
      isGuest: 'auth/isGuest',
      isIframe: 'auth/isIframe',
    }),

    withCross() {
      const routesWithCross = [
        routes.BEST_PROJECT,
        routes.BEST_DIGITAL_PROJECT,
        routes.BEST_EMPLOYEE,
        routes.BEST_MENTOR,
        routes.VOTE.BEST_PROJECT,
        routes.VOTE.BEST_DIGITAL_PROJECT,
        routes.VOTE.BEST_EMPLOYEE,
        routes.VOTE.BEST_MENTOR,
        routes.VOTE.PRESIDENT,
        routes.VOTE.RATING,
      ];

      return routesWithCross.includes(this.$route.fullPath);
    },
    crossTheme() {
      const whiteCrossPages = [
        routes.VOTE.BEST_PROJECT,
        routes.VOTE.BEST_DIGITAL_PROJECT,
        routes.VOTE.BEST_MENTOR,
        routes.VOTE.BEST_EMPLOYEE,
        routes.VOTE.PRESIDENT,
        routes.VOTE.RATING,
      ];

      return whiteCrossPages.includes(this.$route.fullPath) ? 'white' : 'red';
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.isIframe) {
          window.parent.postMessage(
            {
              type: 'onload',
              payload: { height: document.body.scrollHeight },
            },
            '*'
          );
        }
      },
      immediate: true,
      deep: true,
    },
    isGuest(value) {
      if (value && !this.$route.query.iframe) this.$router.push(routes.SIGN_IN);
    },
  },
  mounted() {
    document.addEventListener('scroll', this.checkScrollPosition);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.checkScrollPosition);
  },
  methods: {
    checkScrollPosition() {
      this.isScrolled = !!window.scrollY;
    },

    onClose() {
      this.$router.push(routes.MAIN);
    },
  },
};
</script>

<style scoped lang="scss">
.layout-minimized {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: $zLevel8;
  }

  &__popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: $zLevel9;
  }
}
</style>
