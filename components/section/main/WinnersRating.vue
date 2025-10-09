<template>
  <section class="section-main-winners-rating">
    <div class="section-main-winners-rating__holder">
      <div class="section-main-winners-rating__row">
        <div class="section-main-winners-rating__categories">
          <CSelect
            v-model="value"
            :items="nominations"
            track-by="title"
            theme="black"
            class="section-main-winners-rating__select"
            :is-first-active="isFirstActive"
          >
            <template #singleLabel="{ props }">
              <div class="section-main-winners-rating__option">
                <CIcon
                  :name="props.option.iconName"
                  path="tags"
                  class="section-main-winners-rating__option-icon"
                />

                <span>{{ props.option.title }}</span>
              </div>
            </template>

            <template #option="{ props }">
              <div class="section-main-winners-rating__option">
                <CIcon
                  :name="props.option.iconName"
                  path="tags"
                  class="section-main-winners-rating__option-icon"
                />

                <span>{{ props.option.title }}</span>
              </div>
            </template>
          </CSelect>
        </div>
      </div>

      <div class="section-main-winners-rating__cards">
        <div v-if="isListView" style="width: 100%">
          <template v-for="(card, index) in currentPosts">
            <CardMore
              v-if="card"
              :key="card.name || `card-${index}`"
              class="section-main-winners-rating__list-card"
              :title="card.name"
              :department-title="card.department.title"
              :department-text="card.department.text"
            />
            <div
              v-if="!card"
              :key="'empty' + index"
              class="section-main-winners-rating__empty"
            ></div>
          </template>
        </div>
        <div v-else class="section-main-winners-rating__card-wrapper">
          <template v-for="(card, index) in currentPosts">
            <PreviewCard
              v-if="card"
              :key="card.id || `card1-${Math.random()}`"
              class="section-main-winners-rating__card"
              :title="card.application.name || card.application.fullName"
              :goal="card.application.goal"
              :description="card.application.description"
              :leader="card.application.leader"
              :image="card.image"
              :points="card.totalPoints"
              disable-likes
            />
            <div
              v-if="!card"
              :key="'empty' + index"
              class="section-main-winners-rating__empty"
            ></div>
          </template>
        </div>
      </div>

      <div class="section-main-winners-rating__nav">
        <div class="section-main-winners-rating__arrows">
          <CButtonIcon icon="left" @click.native="prevPage" />
          <CButtonIcon icon="right" @click.native="nextPage" />
        </div>
        <div class="section-main-winners-rating__pages">
          <span class="section-main-winners-rating__font section-main-winners-rating__font--pages">
            {{ currentPage }}/{{ totalPages }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import nominations from '@/config/nominations';
import winners from '@/config/winners';

import PreviewCard from '@/components/card/PreviewCard.vue';
import CSelect from '@/components/ui/CSelect.vue';
import CardMore from '@/components/card/More.vue';
import CButtonIcon from '@/components/ui/CButtonIcon.vue';
import { paginatePosts } from '@/tools/helpers';

export default {
  name: 'SectionMainWinnersRating',
  components: { CButtonIcon, CardMore, CSelect, PreviewCard },
  data() {
    return {
      value: nominations.items[0],
      isLoading: false,
      isListView: false,
      cards: [],
      company: null,
      postsPerPage: 6,
      currentPosts: [],
      currentPage: null,
      totalPages: null,
    };
  },
  computed: {
    nominations() {
      return [...nominations.items, ...nominations.special];
    },

    isFirstActive() {
      return this.value.id === nominations.items[0].id;
    },
  },

  watch: {
    value(newValue) {
      const ids = [5, 6];

      this.getCards(newValue.id, ids.includes(newValue.id));
    },
  },

  async created() {
    await this.getCards();
  },

  methods: {
    ...mapActions({
      fetchApplications: 'applications/fetchWinners',
    }),
    filterByTag(tag) {
      this.value = tag;
    },

    async getCards(tagId = this.value.id, isStatic = false) {
      this.isLoading = true;

      if (isStatic) {
        this.cards = winners[tagId];
      } else {
        this.cards = await this.fetchApplications({
          nominationId: tagId,
        });
      }

      this.isListView = isStatic;

      this.isLoading = false;

      this.paginatePosts(1);
    },

    paginatePosts(currentPageNum = 1) {
      const { totalPages, currentPage, data } = paginatePosts(
        this.cards,
        this.postsPerPage,
        currentPageNum
      );

      this.totalPages = totalPages;
      this.currentPage = currentPage;
      this.currentPosts = data;
    },

    nextPage() {
      if (this.currentPage >= this.totalPages) return;

      this.currentPage++;

      this.paginatePosts(this.currentPage);
    },

    prevPage() {
      if (this.currentPage <= 1) return;

      this.currentPage--;

      this.paginatePosts(this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-main-winners-rating {
  background-color: $color-light-grey;
  padding: em(140) em(40);

  @include media-breakpoint-down(xl) {
    padding: em(112) em(32);
  }

  @include media-breakpoint-down(lg) {
    padding: em(80) em(40);
  }

  @include media-breakpoint-down(md) {
    padding: em(40) em(16);
  }

  &__holder {
    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }
  }

  &__font {
    &--pages {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    margin-bottom: em(34);

    @include media-breakpoint-down(md) {
      margin-bottom: em(40);
      display: block;
    }
  }

  &__categories {
    &--mobile {
      display: none;

      @include media-breakpoint-down(md) {
        display: block;
        margin-bottom: em(20);
      }
    }

    &--desktop {
      margin: em(-6) em(-6) 0;
      display: flex;

      @include media-breakpoint-down(xl) {
        flex-wrap: wrap;
        max-width: em(1078);
      }

      @include media-breakpoint-down(lg) {
        max-width: em(680);
      }

      @include media-breakpoint-down(md) {
        display: none;
      }
    }
  }

  &__option {
    display: flex;
    align-items: center;
  }

  &__option-icon {
    width: em(22);
    height: em(22);
    margin-right: em(10);
  }

  &__tag-wrapper {
    padding: em(6);
  }

  &__cards {
    @include media-breakpoint-up(lg) {
      margin: 0 em(-5);
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__list-card {
    width: 100%;
    min-height: em(108);
    height: em(200);
    text-overflow: ellipsis;

    @include media-breakpoint-down(lg) {
      min-height: em(72);
    }

    &:not(:last-child) {
      margin-bottom: em(10);

      @include media-breakpoint-down(lg) {
        margin-bottom: em(8);
      }
    }
  }

  &__empty {
    width: 100%;
    background: $color-bg-grey-light;
    border-radius: em(32);
    height: em(200);

    &:not(:last-child) {
      margin-bottom: em(10);

      @include media-breakpoint-down(lg) {
        margin-bottom: em(8);
      }
    }

    @include media-breakpoint-down(lg) {
      height: em(200);
    }
  }

  &__card-wrapper {
    height: auto;

    @include media-breakpoint-up(lg) {
      padding: 0 em(5);
      flex: 0 0 100%;
      width: 100%;
    }

    &:not(:last-child) {
      margin-bottom: em(10);
    }
  }

  &__card {
    max-width: 100%;
    height: 100%;
  }

  &__nav {
    display: flex;
    height: em(52);
    position: relative;
    margin-top: em(49);

    @include media-breakpoint-down(lg) {
      margin-top: em(26);
    }

    @include media-breakpoint-down(md) {
      justify-content: space-between;
      height: auto;
    }
  }

  &__arrows {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: em(10);

    @include media-breakpoint-down(md) {
      position: static;
      transform: none;
    }
  }

  &__pages {
    position: absolute;
    right: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-black;
    border-radius: em(30);
    width: em(90);
    height: em(52);

    @include media-breakpoint-down(md) {
      position: static;
    }
  }
}
</style>
