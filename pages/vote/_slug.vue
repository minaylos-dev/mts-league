<template>
  <div class="pages-vote">
    <Component
      :is="pageComponent"
      v-if="applicationsLoaded && !applicationsEmpty && hasApplications && isUserFetched"
      :applications="applications"
      :nomination-name="nominationName"
      :nomination-icon="nominationIcon"
      :nomination-id="nominationId"
      :redirect-link="redirectLink"
      @update-application="updateApplication"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { userRules, expertRules } from '@/config/voteRules';
import { nominationsList } from '@/config/nominations';
import nominations from '@/config/nominations';
import routes from '@/constants/routes';

import BlockVoteUser from '@/components/block/vote/User.vue';
import BlockVoteExpert from '@/components/block/vote/Expert.vue';

export default {
  name: 'PagesVote',
  components: { BlockVoteUser, BlockVoteExpert },
  layout: 'minimized',
  data() {
    return {
      nominationId: undefined,
      applications: [],
      expertCriteria: [],

      applicationsLoaded: false,
      applicationsEmpty: false,
    };
  },
  computed: {
    ...mapGetters({
      isExpert: 'user/isExpert',
      user: 'user/getUser',
      isVoteDisabled: 'user/isVoteDisabled',
    }),

    pageComponent() {
      return this.isExpert ? 'BlockVoteExpert' : 'BlockVoteUser';
      // return 'BlockVoteExpert';
    },

    currentNomination() {
      return nominationsList.find((item) => item.id === this.nominationId);
    },
    nominationName() {
      return this.currentNomination?.title;
    },
    nominationDescription() {
      return this.currentNomination?.description;
    },
    nominationIcon() {
      return this.currentNomination?.iconName;
    },
    redirectLink() {
      return this.currentNomination?.redirectLink;
    },
    hasApplications() {
      return this.applications?.length;
    },
    voteRules() {
      return this.isExpert ? expertRules : userRules;
    },

    isUserFetched() {
      return this.user?.id !== undefined;
    },
  },
  watch: {
    isVoteDisabled: {
      handler(value) {
        if (value) this.$router.push(routes.MAIN);
      },
      immediate: true,
    },
    applicationsLoaded() {
      if (this.applicationsLoaded) this.showInitialPopup();
    },
  },
  mounted() {
    if (process.client) {
      window.parent.postMessage(
        {
          type: 'scrolltop',
        },
        '*'
      );
    }
  },
  async created() {
    await this.fetchUser();

    this.nominationId = nominationsList.find((item) => item.slug === this.$route.params.slug)?.id;

    if (this.nominationId) {
      this.fetchNominations(this.nominationId)
        .then((result) => {
          this.applications = result;
          this.applicationsLoaded = true;
        })
        .catch(({ response }) => {
          if (response?.status === 412) {
            const checkNominationPromises = nominations.items.map((nomination) => {
              return new Promise((resolve, reject) => {
                this.fetchNominations(nomination.id)
                  .then(() => resolve(nomination))
                  .catch(({ response }) => {
                    if (response?.status === 412) reject();
                  });
              });
            });

            Promise.any(checkNominationPromises)
              .then((result) => {
                this.$router.push('/vote/' + result.slug);
              })
              .catch(() => {
                this.applicationsEmpty = true;
                this.showEndPopup();
              });
          }
        });
    }

    if (this.isExpert && !this.applicationsEmpty) {
      await this.fetchDepartments();

      this.expertCriteria = await this.fetchExpertVoteCriteria(this.nominationId).then((data) =>
        data?.filter((item) => item.nominationId === this.nominationId)
      );

      this.applications = this.applications?.map((application) => ({
        ...application,
        isVoted: false,
        assessments: this.expertCriteria?.map((item) => ({
          criteriaId: item?.id,
          title: item?.title,
          points: 1,
        })),
      }));
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchNominations: 'votes/fetchNominations',
      fetchDepartments: 'catalog/fetchDepartments',
      fetchExpertVoteCriteria: 'catalog/fetchExpertVoteCriteria',
    }),

    showInitialPopup() {
      const rulesShown = !!this.$cookies.get('rulesShown');

      if (this.applicationsEmpty || !this.hasApplications) this.showEndPopup();
      else if (!rulesShown) this.showRulesPopup();
    },
    showEndPopup() {
      this.$popup.open('VotedPopup', {
        disableClickOutside: true,
        redirectLink: this.currentNomination.redirectLink,
        title: this.nominationName,
        description: this.nominationDescription,
        text: 'Ты уже проголосовал(а). Спасибо за участие!',
        backButtonText: 'на главную',
      });
    },
    showRulesPopup() {
      this.$popup.open('VoteRulesPopup', {
        disableClickOutside: true,
        nominationName: this.nominationName,
        items: this.voteRules,
        startText: this.currentNomination.startText,
      });
    },
    showStartPopup() {
      this.$popup.open('VoteStartPopup', {
        disableClickOutside: true,
        text: this.currentNomination.startText,
      });
    },

    updateApplication({ index, assessments, isVoted }) {
      this.applications[index].assessments = assessments;
      this.applications[index].isVoted = isVoted;
    },
  },
};
</script>
