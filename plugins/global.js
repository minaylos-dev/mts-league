// Useful for not business global data
// (isMobile from Resize.vue, screen width & height etc.)
// Example usage in Vue components:
//
// this.$global.variable

import Vue from 'vue';

export default (context, inject) => {
  const global = Vue.observable({
    isMobile: false, // ⚠️ not for conditional (v-if) rendering
  });

  inject('global', global);
};
