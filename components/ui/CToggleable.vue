<template>
  <div
    ref="root"
    class="c-toggleable"
    :style="{ height: heightCss, 'transition-duration': transitionDurationCss }"
  >
    <div ref="content" class="c-toggleable__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CToggleable',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    transitionTime: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      height: this.opened ? 'auto' : 0,
      noTransition: false,
    };
  },
  computed: {
    transitionDurationCss() {
      return this.noTransition ? '0ms' : `${this.transitionTime}ms`;
    },
    heightCss() {
      return typeof this.height === 'number' ? `${this.height}px` : this.height;
    },
  },
  watch: {
    async opened(opened) {
      if (opened) {
        this.height = this.checkMinHeight();

        // has min-height
        if (this.height !== 0) {
          // render 0 to min-height
          this.noTransition = true;

          await this.awaitTimeout();
          if (!this.opened) return;

          this.noTransition = false;
        }

        this.height = this.getContentHeight();

        await this.awaitTimeout(this.transitionTime);
        if (!this.opened) return;

        this.height = 'auto';
      } else {
        this.height = this.getContentHeight();

        await this.awaitTimeout();
        if (this.opened) return;

        this.height = this.checkMinHeight();

        // has min-height
        if (this.height === 0) return;

        await this.awaitTimeout(this.transitionTime);
        if (this.opened) return;

        this.height = 0;

        // render min-height to 0
        this.noTransition = true;

        await this.awaitTimeout();
        if (this.opened) return;

        this.noTransition = false;
      }
    },
  },
  methods: {
    getContentHeight() {
      return this.$refs.content.getBoundingClientRect().height;
    },

    checkMinHeight() {
      const styles = window.getComputedStyle(this.$refs.root);
      return parseFloat(styles.getPropertyValue('min-height'));
    },

    awaitTimeout(duration = 0) {
      return new Promise((resolve) => setTimeout(resolve, duration));
    },
  },
};
</script>

<style lang="scss">
.c-toggleable {
  overflow: hidden;

  &__content {
    overflow: hidden;
  }
}
</style>
