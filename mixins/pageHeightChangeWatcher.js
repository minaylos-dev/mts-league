import { throttle } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      layout: null,
      observerOptions: null,
      observer: null,
      observerPaused: false,
    };
  },
  mounted() {
    setTimeout(() => {
      if (!this.isIframe) return;

      this.layout = document.getElementById('app');

      if (!this.layout) return;

      console.log('layout', this.layout);

      this.observerConnect();

      this.$eventBus.$on('popupOpened', this.pauseObserver);
      this.$eventBus.$on('popupClosed', this.resumeObserver);

      this.$nextTick(() => {
        this.updateHeight();
      });
    });
  },
  beforeDestroy() {
    this.observerDisconnect();

    this.$eventBus.$off('popupOpened', this.pauseObserver);
    this.$eventBus.$off('popupClosed', this.resumeObserver);
  },

  computed: {
    ...mapGetters({
      isIframe: 'auth/isIframe',
    }),
  },
  methods: {
    pauseObserver() {
      const height = !this.$device.isMobile ? 800 : 550;
      this.sendHeightMessage(height);

      this.layout.style.height = height + 'px';

      this.observerPaused = true;

      window.parent.postMessage(
        {
          type: 'scrolltop',
        },
        '*'
      );
    },
    resumeObserver() {
      this.layout.removeAttribute('style');

      this.observerPaused = false;
    },
    updateHeight: throttle(function () {
      if (!process.client) return;

      console.log(this.observerPaused);

      if (this.observerPaused) return;

      const pageHeight = this.layout.offsetHeight;

      // this.layout.style.height = pageHeight + 'px';

      console.log('updateHeight', pageHeight);

      this.sendHeightMessage(pageHeight);
    }, 500),

    sendHeightMessage(height) {
      window.parent.postMessage(
        {
          type: 'updateheight',
          payload: { height },
        },
        '*'
      );
    },

    observerConnect() {
      if (!this.layout) return;

      this.observerOptions = {
        childList: true,
        subtree: true,
      };

      this.observer = new MutationObserver(this.updateHeight.bind(this));
      this.observer.observe(this.layout, this.observerOptions);
    },

    observerDisconnect() {
      this.observerPaused = true;

      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
  },
};
