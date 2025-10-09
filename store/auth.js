const state = () => ({
  accessToken: undefined,
  email: undefined,
  isIframe: false,
});

const actions = {
  getCode({ commit }, { email }) {
    return this.$axios.post('/api/v1/auth/email/code', { email }).then(({ data }) => {
      commit('setEmail', email);

      return data.identifier;
    });
  },

  sendCode({ commit }, { identifier, code, agreed }) {
    return this.$axios
      .post('/api/v1/auth/email', {
        identifier,
        code,
        is_pd_agreed: agreed,
      })
      .then(({ data }) => {
        const { access_token } = data;

        commit('setToken', access_token);
      });
  },

  sendEmailOAuth({ commit }, email) {
    return this.$axios
      .post('/api/v1/auth/email/callback', {
        email,
      })
      .then(({ data }) => {
        const { access_token } = data;

        commit('setToken', access_token);
        commit('setIframeStatus');
      });
  },

  logout({ commit }) {
    commit('clearToken');
    commit('clearEmail');
  },
};

const getters = {
  getAccessToken: (state) => state.accessToken,
  getEmail: (state) => state.email,
  isGuest: (state) => !state.accessToken,
  isIframe: (state) => state.isIframe,
};

const mutations = {
  setIframeStatus(state) {
    state.isIframe = true;
  },

  setToken(state, token) {
    state.accessToken = token;

    this.$cookies.set('token', token);
  },
  clearToken(state) {
    state.accessToken = null;

    this.$cookies.remove('token');
  },

  setEmail(state, email) {
    state.email = email;

    this.$cookies.set('email', email);
  },
  clearEmail(state) {
    state.email = null;

    this.$cookies.remove('email');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
