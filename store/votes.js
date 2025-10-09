import applicationAdapter from '@/tools/data-adapters/application/items';

const state = () => ({});

const actions = {
  voteUser(store, { applicationId, points }) {
    return this.$axios
      .post('/api/v1/votes/user', { application_id: applicationId, points })
      .catch((error) => {
        console.log(error);
      });
  },
  voteExpert(store, { applicationId, assessments }) {
    return this.$axios
      .post('/api/v1/votes/expert', { application_id: applicationId, assessments })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },

  fetchNominations(store, nominationId) {
    return this.$axios
      .get(`/api/v1/votes/nominations/${nominationId}/applications`)
      .then(({ data }) => applicationAdapter(data));
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
