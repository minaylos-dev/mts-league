// Example usage in Vue components:
//
// <p v-typograph> Some text to format </p>

import Vue from 'vue';
import Typograf from 'typograf';
const Tp = new Typograf({ locale: ['ru', 'en-US'] });

Vue.directive('typograph', {
  bind: (el) => {
    if (process.client) {
      el.innerHTML = Tp.execute(el.innerHTML);
    }
  },
});
