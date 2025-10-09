const state = () => ({});

const actions = {
  sendFeedback(store, { text }) {
    return this.$axios.post('/api/v1/feedbacks', { text });
  },
};

const getters = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
