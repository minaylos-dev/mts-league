<template>
  <div class="section-rating-posts">
    <div class="section-rating-posts__wrapper">
      <div class="section-rating-posts__title">
        <h2 class="section-rating-posts__font section-rating-posts__font--title">Рейтинг</h2>
      </div>

      <div class="section-rating-posts__filters">
        <CSelect
          v-model="nomination"
          :items="nominations"
          placeholder="Номинация"
          track-by="title"
          theme="black"
          size="s"
          class="section-rating-posts__select"
          @input="updateDepartments"
        >
          <template #singleLabel="{ props }">
            <div class="section-rating-posts__option">
              <span>{{ props.option.title }}</span>
            </div>
          </template>

          <template #option="{ props }">
            <div class="section-rating-posts__option">
              <CIcon
                :name="props.option.iconName"
                path="tags"
                class="section-rating-posts__option-icon"
              />

              <span>{{ props.option.title }}</span>
            </div>
          </template>
        </CSelect>
        <CSelect
          v-model="company"
          :items="departmentsAdapted"
          placeholder="Компания"
          track-by="title"
          theme="black"
          size="s"
          class="section-rating-posts__select"
          @input="getCardsHolder"
        >
          <template #singleLabel="{ props }">
            <div class="section-rating-posts__option">
              <span>{{ props.option.title }}</span>
            </div>
          </template>

          <template #option="{ props }">
            <div class="section-rating-posts__option">
              <span>{{ props.option.title }}</span>
            </div>
          </template>
        </CSelect>
      </div>

      <div class="section-rating-posts__list">
        <template v-for="post in posts">
          <Post
            v-if="post"
            :key="post.id"
            class="section-rating-posts__post"
            :title="post.application.name || post.application.fullName"
            :author="post.application.leader"
            :team="post.application.team"
            :text="post.application.goal || post.application.description"
            :image="post.image"
            :likes="post.totalPoints"
            :nomination-id="post.nominationId"
          />
          <!--          <div v-if="!post" :key="'empty' + index" class="section-rating-posts__empty"></div>-->
        </template>
      </div>

      <div v-if="totalPages > 1" class="section-rating-posts__nav">
        <div class="section-rating-posts__arrows">
          <CButtonIcon theme="arrow" icon="left" @click.native="prevPage" />
          <CButtonIcon theme="arrow" icon="right" @click.native="nextPage" />
        </div>
        <div class="section-rating-posts__pages">
          <span class="section-rating-posts__font section-rating-posts__font--pages">
            {{ currentPage }}/{{ totalPages }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CSelect from '@/components/ui/CSelect.vue';
import Post from '@/components/block/Post.vue';
import CButtonIcon from '@/components/ui/CButtonIcon.vue';

import nominations from '@/config/nominations';

import { paginatePosts } from '@/tools/helpers';

import { mapActions } from 'vuex';

export default {
  components: {
    CSelect,
    Post,
    CButtonIcon,
  },

  data() {
    return {
      nomination: nominations.items[0],
      company: null,
      posts: [],
      departments: [],
      postsPerPage: 6,
      offset: 0,
      currentPosts: [],
      currentPage: null,
      totalPages: null,
    };
  },

  computed: {
    nominations() {
      return nominations.items;
    },

    departmentsAdapted() {
      return this.departments.map(({ id, shortTitle }) => {
        return {
          id,
          title: shortTitle,
        };
      });
    },

    department() {
      return this.company?.id || -1;
    },
  },

  created() {
    this.updateDepartments();
  },

  beforeMount() {
    if (this.$device.isTablet) this.postsPerPage = 2;
    if (this.$device.isMobile) this.postsPerPage = 1;
  },

  methods: {
    ...mapActions({
      fetchDepartmentsByNomination: 'catalog/fetchDepartmentsByNomination',
      fetchApplications: 'applications/fetchApplicationsWithFilters',
    }),

    nextPage() {
      if (this.currentPage >= this.totalPages) return;

      this.currentPage++;

      this.updateApplications(this.currentPage);
    },

    prevPage() {
      if (this.currentPage <= 1) return;

      this.currentPage--;

      this.updateApplications(this.currentPage);
    },

    updateDepartments() {
      this.fetchDepartmentsByNomination(this.nomination.id).then((result) => {
        this.departments = result;
        this.company = this.departmentsAdapted[0];
        this.getCardsHolder();
      });
    },

    async updateApplications(page) {
      this.paginatePosts(page);

      const { applications, meta } = await this.fetchApplications({
        filter: { nomination: this.nomination.id, department: this.department },
        limit: this.postsPerPage,
        offset: this.offset,
      });

      this.posts = applications;

      this.totalCount = meta.totalCount;
    },

    async getCards(nomination, department, limit = this.postsPerPage, offset = 0) {
      const { applications, meta } = await this.fetchApplications({
        filter: { nomination, department },
        limit,
        offset,
      });

      this.posts = applications;

      this.totalCount = meta.totalCount;

      this.paginatePosts(1);
    },

    getCardsHolder() {
      this.getCards(this.nomination.id, this.department);
    },

    paginatePosts(currentPageNum = 1) {
      const { totalPages, currentPage, startIndex } = paginatePosts(
        this.totalCount,
        this.postsPerPage,
        currentPageNum
      );

      this.totalPages = totalPages;
      this.currentPage = currentPage;
      this.offset = startIndex;
    },
  },
};
</script>

<style scoped lang="scss">
.section-rating-posts {
  &__font {
    &--title {
      font-size: em(140);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(lg) {
        font-size: em(64);
      }

      @include media-breakpoint-down(md) {
        font-size: em(36);
      }
    }

    &--pages {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;
    }
  }

  &__title {
    margin-bottom: em(16);

    @include media-breakpoint-down(lg) {
      margin-bottom: em(25);
    }

    @include media-breakpoint-down(md) {
      color: $color-red;
    }
  }

  &__wrapper {
    padding: em(112) em(32) 0;
    position: relative;
    height: 100%;

    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }

    @include media-breakpoint-down(lg) {
      padding: em(76) em(40) 0;
    }

    @include media-breakpoint-down(md) {
      padding: em(40) em(16);
    }
  }

  &__filters {
    display: flex;
    gap: em(16);

    @include media-breakpoint-down(md) {
      //overflow: scroll;
      position: absolute;
      left: em(-16);
      width: calc(100vw + #{em(16)});
      padding-left: em(32);
      padding-right: em(16);
      //height: 80%;
      gap: em(5);
    }
  }

  &__select {
    min-width: em(180);

    @include media-breakpoint-down(md) {
      min-width: em(100);
    }
  }

  &__option {
    display: flex;
    align-items: center;
    padding-right: em(32);
  }

  &__option-icon {
    width: em(22);
    height: em(22);
    margin-right: em(10);
  }

  &__tag-wrapper {
    padding: em(6);
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-column-gap: em(10);
    grid-row-gap: em(8);
    margin-top: em(48);

    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr;
      margin-top: em(40);
    }

    @include media-breakpoint-down(md) {
      margin-top: em(96);
    }
  }

  &__post {
    max-width: 50vw;
    overflow: hidden;

    @include media-breakpoint-down(lg) {
      max-width: 100%;
    }
  }

  &__empty {
    width: 100%;
    background: $color-bg-grey-light;
    border-radius: em(32);
    height: em(432);

    @include media-breakpoint-down(lg) {
      height: em(348);
    }
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
