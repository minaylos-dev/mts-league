export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    config.headers['Authorization'] = `${store.getters['auth/getAccessToken']}`;
  });
  $axios.onError((error) => {
    if (error.response?.status === 401) {
      store.dispatch('auth/logout');
    }
  });
};
