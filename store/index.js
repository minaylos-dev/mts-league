export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    commit('auth/setToken', this.$cookies.get('token'));

    await dispatch('user/fetchUser');
  },
};

export default {
  actions,
};
