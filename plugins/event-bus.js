import Vue from 'vue';

const eventBus = new Vue();
const eBus = {
  install() {
    Vue.prototype.$eventBus = eventBus;

    Vue.prototype.$popup = {
      open(name, data, level = 1) {
        Vue.prototype.$eventBus.$emit(`openPopup${level}`, {
          name,
          data,
        });
        Vue.prototype.$eventBus.$emit(`popupOpened`);
      },
      close(level = 1) {
        Vue.prototype.$eventBus.$emit(`closePopup${level}`);
        Vue.prototype.$eventBus.$emit(`popupClosed`);
      },
    };

    Vue.prototype.$loader = {
      show() {
        Vue.prototype.$eventBus.$emit('showLoader');
      },
      hide() {
        Vue.prototype.$eventBus.$emit('hideLoader');
      },
    };
  },
};

Vue.use(eBus);

export default eventBus;
