<template>
  <div
    :style="{ fontSize: `${fSize}px` }"
    :class="{
      'is-mobile': isMobileStatus,
      'is-desktop': !isMobileStatus,
    }"
  >
    <slot />
  </div>
</template>

<script>
const config = {
  width: 1440,
  height: 900,
  minWidth: 769,
  minHeight: 600,
  fontSize: 16,
};

export default {
  name: 'Resize',
  data() {
    return {
      vW: undefined,
      vH: undefined,
    };
  },
  computed: {
    isMobileStatus() {
      return this.$device.isMobile || this.vW < config.minWidth;
    },
    fSize() {
      if (this.isMobileStatus || !this.vW || !this.vH) return config.fontSize;

      const horizontalRatio = Math.max(config.minWidth, this.vW) / config.width;
      const verticalRatio = Math.max(config.minHeight, this.vH) / config.height;
      const minRatio = Math.min(horizontalRatio, verticalRatio);

      return config.fontSize * minRatio;
    },
  },
  watch: {
    isMobileStatus: {
      immediate: true,
      handler(isMobile) {
        this.$global.isMobile = isMobile;
      },
    },
  },
  created() {
    if (process.client) this.onResize(false);
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize(needEmit = true) {
      const isIpad = this.$device.isTablet && this.$device.isIos;

      this.vW = isIpad
        ? document.documentElement.clientWidth
        : window.innerWidth;
      this.vH = isIpad
        ? document.documentElement.clientHeight
        : window.innerHeight;

      if (needEmit) this.$nextTick(this.emitResize);
    },
    emitResize() {
      this.$root.$emit('resize');
    },
  },
};
</script>
