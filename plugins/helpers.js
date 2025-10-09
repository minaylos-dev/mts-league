// Example usage in Vue components:
//
// this.$helpers.declension()

import * as helpers from '@/tools/helpers';

export default (context, inject) => {
  inject('helpers', helpers);
};
