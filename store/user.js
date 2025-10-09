import userAdapter from '@/tools/data-adapters/user';

const state = () => ({
  user: undefined,
});

const actions = {
  fetchUser({ commit }) {
    return this.$axios
      .get('/api/v1/users/self')
      .then(({ data }) => {
        const user = userAdapter(data);

        commit('setUser', user);

        return user;
      })
      .catch((error) => console.log(error));
  },
};

const getters = {
  getUser: (state) => state.user,
  isExpert: (state) => state.user?.isExpert,
  isVoteDisabled: (state) =>
    (state.user?.isExpert && state.user?.settings?.expertVoteEnabled === false) ||
    (!state.user?.isExpert && state.user?.settings?.userVoteEnabled === false),
};

const mutations = {
  setUser(state, data) {
    state.user = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
