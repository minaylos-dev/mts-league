<template>
  <component :is="component" v-bind="componentProps" @click="emitClick">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CTagDetect',
  props: {
    to: {
      type: String,
      default: undefined,
    },

    target: {
      type: String,
      default: undefined,
    },

    isStaticByDefault: {
      type: Boolean,
      default: false,
    },
    staticTag: {
      type: String,
      default: 'div',
    },

    type: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    download: {
      type: [Boolean, String],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    component() {
      switch (true) {
        case !!this.to:
          return 'nuxt-link';
        case !!this.href:
          return 'a';
        case this.isStaticByDefault:
          return this.staticTag;
        default:
          return 'button';
      }
    },

    componentProps() {
      const componentProps = {};

      switch (this.component) {
        case 'nuxt-link':
          componentProps.to = this.to;
          componentProps.disabled = this.disabled || undefined;
          if (this.target) componentProps.target = this.target;
          break;
        case 'a':
          componentProps.href = this.href;
          componentProps.disabled = this.disabled || undefined;
          if (this.target) componentProps.target = this.target;
          if (this.download) {
            if (typeof this.download === 'boolean') {
              componentProps.download = '';
            } else {
              componentProps.download = this.download;
            }
          }
          break;
        case 'button':
          componentProps.type = this.type;
          componentProps.disabled = this.disabled;
          break;
      }

      return componentProps;
    },
  },
  methods: {
    emitClick() {
      this.$emit('click');
    },
  },
};
</script>
