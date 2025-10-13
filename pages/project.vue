<template>
  <div class="pages-expert-details">
    <div class="pages-expert-details__header">
      <div class="pages-expert-details__arrow-wrapper">
        <CIcon class="pages-expert-details__arrow" name="circle-arrow-right" />
      </div>
    </div>

    <div class="card-expert-vote">
      <div class="card-expert-vote__holder">
        <BlockExpertVoteSinglepageHead
          class="card-expert-vote__head"
          :project-name="activeApplication.name"
          :project-image="activeApplication.image"
          :tag-name="nominationName"
          :tag-icon="nominationIcon"
          :leader="activeApplication.leader"
          :team="activeApplication.team"
          :company="activeApplication.company"
          :is-voted="activeApplication.isVoted"
          :assessments="activeApplication.assessments"
          @onRateClick="onRateClick"
        />

        <div class="card-expert-vote__blocks">
          <template v-for="(block, index) in activeApplication.blocks">
            <BlockExpertVoteGroup
              v-if="true"
              :key="index"
              class="card-expert-vote__block"
              :title="block.name"
              :items="block.items"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockExpertVoteSinglepageHead from '@/components/block/expertVote/ExpertVoteSinglepageHead.vue';
import BlockExpertVoteGroup from '@/components/block/expertVote/ExpertVoteGroup.vue';

export default defineComponent({
  name: 'ExpertVoteWrapper',
  components: { BlockExpertVoteSinglepageHead, BlockExpertVoteGroup },
  setup() {
    const applications = [
      {
        id: 1,
        name: 'Наименование проекта/продукта',
        image: '/images/project/project.jpg',
        leader: 'Иван Иванович Иванов',
        team: 'Иван Иванович Иванов, Иван Иванович Иванов, Иван Иванович Иванов, Иван Иванович Иванов',
        isVoted: false,
        assessments: [],
        blocks: [
          {
            name: 'ОПИСАНИЕ ПРОЕКТА',
            items: [
              {
                name: 'Цель проекта/продукта',
                value:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                name: 'Укажи основные проблемы, которые решает проект/продукт',
                value:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                name: 'Результаты проекта/продукта',
                value:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              },
              {
                name: 'Аудитория, охват',
                value:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              },
              {
                name: 'Сроки проекта',
                value:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              },
            ],
          },
        ],
      },
    ];

    const activeApplicationIndex = 0;
    const activeApplication = applications[activeApplicationIndex];
    const nominationName = 'Лучший инновационный проект';
    const nominationIcon = '/icons/innovation.svg';

    function onRateClick() {
      console.log('rate click');
    }

    return {
      applications,
      activeApplication,
      activeApplicationIndex,
      nominationName,
      nominationIcon,
      onRateClick,
    };
  },
});
</script>

<style scoped lang="scss">
.pages-expert-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: em(80) em(75) em(60);
  background: linear-gradient(107deg, #dcd1ea 0, #b7b7cc 70%);

  @include media-breakpoint-down(lg) {
    padding: em(56) em(40) em(88);
  }

  @include media-breakpoint-down(md) {
    padding: em(62) em(16) em(50);
  }

  &__font {
    &--tooltip {
      font-family: $font-family-mts-text;
      font-size: em(16);
      line-height: 150%;
      color: $color-white;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }
    }
  }

  &__header {
    margin-bottom: em(40);
  }

  &__arrow-wrapper {
    width: em(40);
    height: em(40);
    transform: rotate(180deg);
  }
}

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
