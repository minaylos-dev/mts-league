<template>
  <client-only>
    <div id="app" class="layout-default">
      <template v-if="showPage">
        <LayoutHeader
          ref="header"
          class="layout-default__header"
          :darker-theme="changeHeaderTheme"
          :no-redirect="noRedirect"
        />

        <Nuxt class="layout-default__page" />

        <LayoutFooter :hide-border="!showFooterBorder" />

        <Popup class="layout-default__popup" />
      </template>
    </div>

    <!--    <div v-if="showPage" id="app" class="layout-default"></div>-->
  </client-only>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { scrollTo } from '@/tools/helpers';

import breakpoints from '@/config/breakpoints';
import routes from '@/constants/routes';

import pageHeightChangeWatcher from '@/mixins/pageHeightChangeWatcher';

import LayoutHeader from '@/components/layout/Header.vue';
const LayoutFooter = () => import('@/components/layout/Footer.vue');
const Popup = () => import('@/components/layout/Popup.vue');

export default {
  name: 'DefaultLayout',
  components: { LayoutFooter, LayoutHeader, Popup },
  mixins: [pageHeightChangeWatcher],
  data() {
    return {
      showPage: false,
      changeHeaderTheme: false,
      lastScrollTop: 0,

      iframeData: null,
    };
  },
  computed: {
    ...mapGetters({
      isGuest: 'auth/isGuest',
      isIframe: 'auth/isIframe',
    }),

    noRedirect() {
      return this.$route.fullPath === routes.MAIN;
    },
    showFooterBorder() {
      return this.$route.fullPath !== routes.BROADCAST;
    },
  },
  watch: {
    isGuest(value) {
      if (value && !this.$route.query.iframe) this.$router.push(routes.SIGN_IN);
    },
    $route: {
      handler({ hash }) {
        if (!hash) return;

        setTimeout(() => {
          scrollTo(hash, this.$device.isMobile, this.isIframe);
        }, 100);
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    if (this.$route.query?.iframe) {
      this.iframeDetectHandler();
    } else {
      this.showPage = true;
      this.fetchUser();
    }

    document.addEventListener('scroll', this.checkScrollPosition);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.checkScrollPosition);
  },
  methods: {
    ...mapActions({
      sendEmailOAuth: 'auth/sendEmailOAuth',
      fetchUser: 'user/fetchUser',
    }),
    ...mapMutations({
      setIframeStatus: 'auth/setIframeStatus',
    }),

    iframeDetectHandler() {
      this.setIframeStatus();
      this.showPage = false;

      this.postMessageHeight();

      window.addEventListener('message', (e) => {
        if (e.origin === window.location.origin) return;

        this.iframeData = e;

        const data = e.data?.payload;

        if (!data) return;

        const { email } = data;

        const authCallBack = () => {
          this.showPage = true;
          this.fetchUser();

          this.$nextTick(() => {
            this.postMessageHeight();
          });
        };

        if (this.isGuest && email) {
          this.sendEmailOAuth(email).then(() => {
            authCallBack();
          });
        }

        if (!this.isGuest) {
          authCallBack();
        }
      });
    },

    postMessageHeight() {
      window.parent.postMessage(
        {
          type: 'onload',
          payload: { height: document.body.clientHeight },
        },
        '*'
      );
    },

    handleScroll() {
      if (!this.$refs.header) return;

      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > this.lastScrollTop) {
        this.$refs.header.$el.style.translate = '0 -100%';
      } else if (st < this.lastScrollTop) {
        this.$refs.header.$el.style.translate = 'none';
      }

      this.lastScrollTop = st <= 0 ? 0 : st;
    },
    checkScrollPosition() {
      if (window.innerWidth <= breakpoints.tablet) {
        this.handleScroll();
      }

      this.changeHeaderTheme = !!window.scrollY;
    },
  },
};
</script>

<style scoped lang="scss">
.layout-default {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: $color-bg-grey;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $zLevel8;
    transition: translate $trans-time;

    @include media-breakpoint-up(lg) {
      translate: none !important;
    }
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
