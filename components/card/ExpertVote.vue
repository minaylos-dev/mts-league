<template>
  <div class="card-expert-vote">
    <div class="card-expert-vote__holder">
      <BlockExpertVoteHead
        class="card-expert-vote__head"
        :project-name="activeApplication.name"
        :project-image="activeApplication.image"
        :tag-name="nominationName"
        :tag-icon="nominationIcon"
        :leader="activeApplication.leader"
        :team="activeApplication.team"
        :company="activeApplication.company"
        :is-first-application="isFirstApplication"
        :is-last-application="isLastApplication"
        :is-voted="activeApplication.isVoted"
        :assessments="activeApplication.assessments"
        :active-index-application="activeApplicationIndex + 1"
        :applications-count="applications.length"
        @prev-click="setPreviousApplication"
        @next-click="setNextApplication"
        @onRateClick="onRateClick"
      />

      <div class="card-expert-vote__blocks">
        <template v-for="(block, index) in activeApplication.blocks">
          <BlockExpertVoteGroup
            v-if="blockNotEmpty(block.items)"
            :key="index"
            class="card-expert-vote__block"
            :title="block.name"
            :items="block.items"
          />
        </template>
      </div>
    </div>
    <div class="card-expert-vote__holder">
      <div id="vote-block" class="card-expert-vote__card card-expert-vote__card--vote">
        <ExpertVotePopup
          v-if="activeApplication.assessments"
          :key="'vote-' + activeApplication.id"
          :text="voteBlockTextFromNomination"
          :data="activeApplication.assessments"
          :application-id="activeApplication.id"
          :callback="voteCallback"
          :is-voted="activeApplication.isVoted"
        />
      </div>
    </div>

    <!--    <CButton-->
    <!--      class="card-expert-vote__button"-->
    <!--      :text="buttonText"-->
    <!--      :theme="buttonTheme"-->
    <!--      @click="onRate"-->
    <!--    >-->
    <!--      <template v-if="activeApplication.isVoted" #icon-right>-->
    <!--        <CIcon class="card-expert-vote__icon card-expert-vote__icon&#45;&#45;edit" name="edit" />-->
    <!--      </template>-->
    <!--    </CButton>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BlockExpertVoteHead from '@/components/block/expertVote/ExpertVoteHead.vue';
import BlockExpertVoteGroup from '@/components/block/expertVote/ExpertVoteGroup.vue';
import ExpertVotePopup from '@/components/popup/ExpertVotePopup.vue';

import voteBlockText from '@/config/voteBlockText';

export default {
  name: 'CardExpertVote',
  components: { ExpertVotePopup, BlockExpertVoteHead, BlockExpertVoteGroup },
  props: {
    nominationName: {
      type: String,
      default: undefined,
    },
    nominationIcon: {
      type: String,
      default: undefined,
    },
    nominationId: {
      type: Number,
      default: undefined,
    },

    applications: {
      type: Array,
      default: () => [],
    },

    redirectLink: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      activeApplicationIndex: 0,
    };
  },
  computed: {
    ...mapGetters({
      departments: 'catalog/getDepartments',
      companyValues: 'catalog/getCompanyValues',
    }),
    voteBlockTextFromNomination() {
      return voteBlockText.find((el) => el.nomination_id === this.nominationId) || voteBlockText[0];
    },
    activeApplication() {
      if (!this.applications.length) return {};

      const { application, image, id, assessments, isVoted } =
        this.applications[this.activeApplicationIndex];

      return {
        id,
        name: application.name || application.fullName,
        image: image,
        leader: application.leader,
        team: application.team,
        isVoted: isVoted,
        assessments,
        company: this.departments.find((item) => item.id === application.departmentId)?.title,
        blocks: this.getApplicationBlocks(this.$route.params.slug, application),
      };
    },

    isFirstApplication() {
      return this.activeApplicationIndex === 0;
    },
    isLastApplication() {
      return this.activeApplicationIndex === this.applications.length - 1;
    },

    isEveryApplicationVoted() {
      return this.applications.every((item) => item.isVoted);
    },

    buttonText() {
      return this.activeApplication.isVoted ? 'Изменить оценку' : 'Оценить';
    },
    buttonTheme() {
      return this.activeApplication.isVoted ? 'grey' : 'black';
    },
  },
  created() {
    this.fetchCompanyValues();
  },
  mounted() {
    // this.onRate();
  },
  methods: {
    ...mapActions({
      fetchCompanyValues: 'catalog/fetchCompanyValues',
    }),

    onRateClick() {
      this.$emit('onRateClick');
    },

    onRate() {
      this.$emit('onRate', {
        // this.$popup.open('ExpertVotePopup', {
        assessments: this.activeApplication.assessments,
        applicationId: this.activeApplication.id,
        isProject:
          this.$route.params.slug === 'best-project' ||
          this.$route.params.slug === 'best-digital-project',
      });

      this.changeStage();
    },

    voteCallback() {
      this.onRate();

      this.setNextApplication();
    },

    setNextApplication() {
      if (this.isLastApplication) return;

      this.activeApplicationIndex++;
    },
    setPreviousApplication() {
      if (this.isFirstApplication) return;

      this.activeApplicationIndex--;
    },
    getNotVotedApplicationIndex() {
      if (this.isEveryApplicationVoted) return;

      return this.applications.findIndex((item) => !item.isVoted);
    },
    changeStage() {
      this.$emit('update-application', {
        index: this.activeApplicationIndex,
        assessments: this.activeApplication.assessments,
        isVoted: true,
      });

      if (this.isEveryApplicationVoted) {
        setTimeout(() => {
          this.$popup.open('VoteEndPopup', {
            disableClickOutside: true,
            redirectLink: this.redirectLink,
          });
          // this.$popup.open('VotedPopup', {
          //   callback: () => this.callback(),
          //   disableClickOutside: true,
          // });
        }, 100);
      } else {
        // this.activeApplicationIndex = this.getNotVotedApplicationIndex();

        window.parent.postMessage(
          {
            type: 'scrolltop',
          },
          '*'
        );
      }
    },

    blockNotEmpty(items) {
      if (!items) return;

      return items.filter((item) => !!item.value).length;
    },
    getApplicationBlocks(slug, application) {
      const projectSlugs = ['best-project', 'best-digital-project'];

      switch (true) {
        case projectSlugs.includes(slug):
          return [
            {
              name: 'ОПИСАНИЕ ПРОЕКТА',
              items: [
                {
                  name: 'Цель проекта',
                  value: application.goal,
                },
                {
                  name: 'Основные задачи',
                  value: application.objectives,
                },
                {
                  name: 'Предпосылки',
                  value: application.preconditions,
                },
                {
                  name: 'Использованные цифровые инструменты',
                  value: application.digitalSolutions,
                },
                {
                  name: 'Результаты',
                  value: application.results,
                },
              ],
            },
            {
              name: 'ВЛИЯНИЕ НА БИЗНЕС',
              items: [
                {
                  name: 'Вклад в развитие бизнеса',
                  value: application.contribution,
                },
              ],
            },
            {
              name: 'ИННОВАЦИОННОСТЬ И УНИКАЛЬНОСТЬ',
              items: [
                {
                  name: 'Новизна и уникальность',
                  value: application.novelty,
                },
              ],
            },
            {
              name: 'МАСШТАБ ПРИМЕНЕНИЯ',
              items: [
                {
                  name: 'Как можно масштабировать проект?',
                  value: application.scaling,
                },
                {
                  name: 'Аудитория проекта, охват',
                  value: application.coverage,
                },
              ],
            },
            // {
            //   name: 'РЕСУРСЫ',
            //   items: [
            //     {
            //       name: 'Команда',
            //       value: application.team,
            //     },
            //     // {
            //     //   name: 'Бюджет',
            //     //   value: application.budget,
            //     // },
            //   ],
            // },
          ];

        default:
          return [
            {
              name: 'Информация',
              items: [
                {
                  name: 'Ценности',
                  value: application.companyValues
                    .map(({ companyValueId, description }) => {
                      if (!companyValueId || !description) return;
                      const companyValue = this.companyValues?.find(
                        (item) => item.id === companyValueId
                      );

                      return `${companyValue?.title}: ${description}`;
                    })
                    .filter((item) => !!item)
                    .join('<br/><br/>'),
                },
                {
                  name: 'Достижения',
                  value: application.achievements
                    .map((item, index) => `${index + 1}. ${item}`)
                    .join('<br/><br/>'),
                },
                {
                  name: 'Почему номинант достоин победы',
                  value: application.description,
                },
              ],
            },
          ];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-expert-vote {
  display: flex;
  flex-direction: column;

  &__holder {
    padding-bottom: em(60);
    border-radius: em(80);
    overflow: hidden;
    background-color: $color-white;
    margin-bottom: em(60);

    @include media-breakpoint-down(lg) {
      border-radius: em(40);
      margin-bottom: em(40);
    }

    @include media-breakpoint-down(md) {
      border-radius: em(24);
      margin-bottom: em(16);
      padding-bottom: 0;
    }
  }

  &__block {
    margin: 0 em(60);

    @include media-breakpoint-down(lg) {
      margin: 0 em(50);
    }

    @include media-breakpoint-down(md) {
      margin: 0 em(16);
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba($color-grey, 0.5);

      @include media-breakpoint-down(md) {
        margin-bottom: em(30);
      }
    }
  }

  &__button {
    height: em(52);
    margin: 0 auto;
  }

  &__card {
    max-width: 100%;
    margin: 0 auto;

    &--vote {
      margin-top: em(60);

      @include media-breakpoint-down(lg) {
        margin-top: em(40);
      }

      @include media-breakpoint-down(md) {
        margin-top: 0;
      }
    }

    @include media-breakpoint-down(lg) {
      max-width: 100%;
    }
  }

  &__icon {
    flex-shrink: 0;

    &--edit {
      width: em(24);
      height: em(24);
      margin-left: em(10);
    }
  }
}
</style>
