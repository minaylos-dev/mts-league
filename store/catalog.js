import criteriaAdapters from '@/tools/data-adapters/expertCriteria/items';

const state = () => ({
  companyValues: [],
  departments: [],
  nominations: [],
});

const actions = {
  fetchCompanyValues({ commit }) {
    return this.$axios
      .get('/api/v1/catalog/company-values')
      .then(({ data }) => commit('setCompanyValues', data));
  },

  fetchDepartments({ commit }) {
    return this.$axios
      .get('/api/v1/catalog/departments')
      .then(({ data }) => commit('setDepartments', data));
  },

  fetchDepartmentsByNomination(_store, nominationId) {
    return this.$axios.get(`/api/v1/catalog/departments/${nominationId}`).then(({ data }) => data);
  },

  fetchNominations({ commit }) {
    return this.$axios
      .get('/api/v1/catalog/nominations')
      .then(({ data }) => commit('setNominations', data));
  },

  fetchExpertVoteCriteria() {
    return this.$axios
      .get('/api/v1/catalog/expert-vote-criterias')
      .then(({ data }) => criteriaAdapters(data));
  },
};

const getters = {
  getCompanyValues: (state) => state.companyValues,
  getDepartments: (state) => state.departments,
  getNominations: (state) => state.nominations,
};

const mutations = {
  setCompanyValues(store, companyValues) {
    store.companyValues = companyValues;
  },
  setDepartments(store, departments) {
    store.departments = departments;
  },
  setNominations(store, nominations) {
    store.nominations = nominations;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
