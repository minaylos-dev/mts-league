<template>
  <section class="section-main-rating">
    <h2 class="section-main-rating__title">
      <span class="section-main-rating__font section-main-rating__font--title"> Рейтинг </span>
    </h2>

    <div class="section-main-rating__row">
      <div class="section-main-rating__categories section-main-rating__categories--mobile">
        <CSelect
          v-model="value"
          :items="nominations"
          track-by="title"
          theme="red"
          class="section-main-rating__select"
          :is-first-active="isFirstActive"
        >
          <template #singleLabel="{ props }">
            <div class="section-main-rating__option">
              <CIcon
                :name="props.option.iconName"
                path="tags"
                class="section-main-rating__option-icon"
              />

              <span>{{ props.option.title }}</span>
            </div>
          </template>

          <template #option="{ props }">
            <div class="section-main-rating__option">
              <CIcon
                :name="props.option.iconName"
                path="tags"
                class="section-main-rating__option-icon"
              />

              <span>{{ props.option.title }}</span>
            </div>
          </template>
        </CSelect>
      </div>

      <div class="section-main-rating__categories section-main-rating__categories--desktop">
        <div v-for="item in nominations" :key="item.id" class="section-main-rating__tag-wrapper">
          <CTag
            :title="item.title"
            :icon-name="item.iconName"
            :description="item.description"
            :is-active="item.id === value.id"
            size="rating"
            @click="filterByTag(item)"
          />
        </div>
      </div>

      <CButton
        text="Как начисляются баллы"
        theme="outlined"
        class="section-main-rating__button section-main-rating__button--points"
        @click="onPointsClick"
      >
        <template #icon-right>
          <CIcon name="question" />
        </template>
      </CButton>
    </div>

    <TransitionGroup name="fade" tag="div" class="section-main-rating__cards">
      <div
        v-for="{ application: card, image, totalPoints, id } in cards"
        :key="id"
        class="section-main-rating__card-wrapper"
      >
        <PreviewCard
          class="section-main-rating__card"
          :title="card.name || card.fullName"
          :goal="card.goal"
          :description="card.description"
          :leader="card.leader"
          :image="image"
          :points="totalPoints"
        />
      </div>
    </TransitionGroup>

    <div v-if="currentPage < totalPages" class="section-main-rating__footer">
      <CButton
        :disabled="isLoading"
        text="Показать ещё"
        class="section-main-rating__button section-main-rating__button--more"
        @click="getCards(true)"
      />

      <div class="section-main-rating__progress">
        <span class="section-main-rating__font section-main-rating__font--progress">
          {{ currentPage }}/{{ totalPages }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import nominations from '@/config/nominations';

import PreviewCard from '@/components/card/PreviewCard.vue';
import CSelect from '@/components/ui/CSelect.vue';

export default {
  name: 'SectionMainRating',
  components: { CSelect, PreviewCard },
  data() {
    return {
      value: nominations.items[0],
      isLoading: false,
      cards: [],
      totalCount: 0,
      staticData: Object.seal({
        limit: 6,
      }),
    };
  },
  computed: {
    currentPage() {
      return Math.ceil(this.cards.length / this.staticData.limit);
    },
    totalPages() {
      return Math.ceil(this.totalCount / this.staticData.limit);
    },
    nominations() {
      return nominations.items;
    },

    isFirstActive() {
      return this.value.id === nominations.items[0].id;
    },
  },

  watch: {
    value(newValue) {
      this.getCards(false, newValue.id);
    },
  },

  async created() {
    await this.getCards();
  },

  methods: {
    ...mapActions({
      fetchApplications: 'applications/fetchApplications',
    }),
    filterByTag(tag) {
      this.value = tag;
    },

    async getCards(isMore = false, tagId = this.value.id) {
      const { applications, meta } = await this.fetchApplications({
        offset: isMore ? this.cards.length : 0,
        limit: this.staticData.limit,
        nominationId: tagId,
      });

      if (isMore) {
        this.cards = [...this.cards, ...applications];
      } else {
        this.cards = applications;
      }

      this.totalCount = meta.totalCount;
    },

    onPointsClick() {
      this.$popup.open('VotePointsPopup');
    },
  },
};
</script>

<style lang="scss" scoped>
.section-main-rating {
  background-color: $color-light-grey;
  padding: em(40) em(16) em(40);

  @include media-breakpoint-up(md) {
    padding: em(80) em(40);
  }

  &__title {
    font-size: unset;
    color: $color-red;
    margin-bottom: em(20);
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

  &__card-wrapper {
    height: auto;

    @include media-breakpoint-up(lg) {
      padding: 0 em(5);
      flex: 0 0 50%;
      width: 50%;
    }

    &:not(:last-child) {
      margin-bottom: em(10);
    }
  }

  &__card {
    max-width: 100%;
    height: 100%;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-top: em(40);

    @include media-breakpoint-up(md) {
      width: 50%;
      margin-left: auto;
    }
  }

  &__button {
    &--points {
      background-color: transparent;

      @include media-breakpoint-down(md) {
        width: 100%;
      }

      svg {
        width: em(20);
        height: em(20);
        margin-left: em(10);
        color: $color-red;
      }
    }

    &--more {
      @include media-breakpoint-up(md) {
        transform: translateX(-50%);
      }
    }
  }

  &__progress {
    color: $color-red;
    padding: 0 em(21);
    white-space: nowrap;
    border-radius: em(30);
    border: 2px solid $color-red;
    display: flex;
    align-items: center;
  }

  &__font {
    &--title {
      font-size: em(36);
      line-height: 1;
      font-weight: 500;

      @include media-breakpoint-up(md) {
        font-size: em(64);
      }

      @include media-breakpoint-up(lg) {
        font-size: em(140);
      }
    }

    &--progress {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;

      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }
  }
}
</style>
