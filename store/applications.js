import applicationsAdapter from '@/tools/data-adapters/application/items';
import metaAdapter from '@/tools/data-adapters/meta';

const state = () => ({});

const actions = {
  postApplication(store, application) {
    return this.$axios.post('/api/v1/applications', application);
  },
  fetchApplicationsWithFilters(store, params) {
    return this.$axios
      .get(
        `/api/v1/applications?filter%5Bnomination%5D=${params.filter.nomination}&filter%5Bdepartment%5D=${params.filter.department}`,
        {
          params: {
            limit: params.limit,
            offset: params.offset,
          },
        }
      )
      .then(({ data }) => {
        const { applications, meta } = data;

        return {
          applications: applicationsAdapter(applications),
          meta: metaAdapter(meta),
        };
      });
  },
  fetchApplications(store, { limit = 6, offset = 0, nominationId }) {
    return this.$axios
      .get(`/api/v1/applications?filter%5Bnomination%5D=${nominationId}`, {
        params: { limit, offset },
      })
      .then(({ data }) => {
        const { applications, meta } = data;

        return {
          applications: applicationsAdapter(applications),
          meta: metaAdapter(meta),
        };
      });
  },
  fetchWinners(store, { nominationId }) {
    return this.$axios
      .get(`/api/v1/applications/winners/${nominationId}`)
      .then(({ data }) => applicationsAdapter(data));
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
