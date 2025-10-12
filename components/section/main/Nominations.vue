<template>
  <section class="section-main-nominations">
    <div class="section-main-nominations__holder">
      <div
        class="section-main-nominations__wrapper"
        :class="{ 'section-main-nominations__wrapper--border': isVoteDisabled }"
      >
        <div class="section-main-nominations__title section-main-nominations__title--desktop">
          <span class="section-main-nominations__font section-main-nominations__font--title">
            Номинации
          </span>
          <span class="section-main-nominations--font section-main-nominations__font--newline"
            >с подачей заявки</span
          >
        </div>

        <div class="section-main-nominations__title section-main-nominations__title--mobile">
          <span class="section-main-nominations__font section-main-nominations__font--title">
            Выбери номинацию и заполни заявку
          </span>
        </div>

        <div class="section-main-nominations__tags">
          <div
            v-for="tag in staticData.nominations.items"
            :key="tag.id"
            class="section-main-nominations__tag-wrapper"
          >
            <CTag
              class="section-main-nominations__tag"
              :title="tag.title"
              :description="tag.description"
              :icon-name="tag.iconName"
              @click="onClick(tag.id, tag.link)"
            />
          </div>
        </div>
      </div>

      <div class="section-main-nominations__wrapper section-main-nominations__wrapper--special">
        <div class="section-main-nominations__subtitle">
          <span class="section-main-nominations__font section-main-nominations__font--subtitle">
            Номинации без<br />
            подачи заявки
          </span>
        </div>

        <div class="section-main-nominations__tags section-main-nominations__tags--special">
          <CTag
            v-for="tag in staticData.nominations.special"
            :key="tag.id"
            class="section-main-nominations__tag section-main-nominations__tag--special"
            :title="tag.title"
            :description="tag.description"
            :icon-name="tag.iconName"
            disabled-click
            @click="onClick(tag.id)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import nominations from '@/config/nominations.js';
import breakpoints from '@/config/breakpoints';

export default {
  name: 'SectionMainNominations',
  data() {
    return {
      staticData: Object.seal({
        nominations,
      }),
    };
  },
  computed: {
    ...mapGetters({
      isVoteDisabled: 'user/isVoteDisabled',
    }),
  },
  methods: {
    onClick(id, link) {
      if (window.innerWidth > breakpoints.tablet) {
        this.$router.push({ path: link });
      } else {
        this.$popup.open('NominationsPopup', {
          transitionName: 'slide-bottom',
          initialSlideId: id,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.section-main-nominations {
  background-color: $color-white;
  padding: em(140) em(40) 0;

  @include media-breakpoint-down(xl) {
    padding: em(140) em(32) 0;
  }

  @include media-breakpoint-down(lg) {
    padding: em(80) em(40) 0;
  }

  @include media-breakpoint-down(md) {
    padding: em(40) em(16) 0;
  }

  &__holder {
    @include media-breakpoint-up(lg) {
      max-width: em(1280);
      margin: 0 auto;
    }
  }

  &__wrapper {
    display: flex;
    align-items: flex-start;
    padding-bottom: em(85);

    @include media-breakpoint-down(lg) {
      padding-bottom: em(50);
    }

    @include media-breakpoint-down(md) {
      flex-direction: column;
      padding-bottom: em(40);
    }

    &--special {
      margin-top: em(0);
      border-top: em(2) solid $color-grey;
      padding-top: em(60);
      padding-bottom: em(140);
      align-items: flex-start;

      @include media-breakpoint-down(lg) {
        margin-top: 0;
        padding-top: em(30);
        padding-bottom: em(80);
      }

      @include media-breakpoint-down(md) {
        margin-top: em(10);
        padding-top: em(20);
        padding-bottom: em(40);
      }
    }

    &--border {
      border-bottom: em(2) solid $color-red;
    }
  }

  &__title {
    width: em(626);
    flex-shrink: 0;

    @include media-breakpoint-down(xl) {
      width: em(622);
    }

    @include media-breakpoint-down(lg) {
      width: em(208);
      margin-right: em(32);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      max-width: em(288);
      margin-right: 0;
      margin-bottom: em(20);
    }

    &--desktop {
      display: none;

      @include media-breakpoint-up(md) {
        display: block;
      }
    }

    &--mobile {
      display: none;

      @include media-breakpoint-down(md) {
        display: block;
      }
    }
  }

  &__subtitle {
    width: em(530);
    flex-shrink: 0;
    margin-right: em(90);

    @include media-breakpoint-down(lg) {
      display: block;
      width: em(208);
      margin-right: em(32);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      max-width: em(288);
      margin-right: 0;
      margin-bottom: em(20);
    }
  }

  &__tags {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: em(940);
    margin-bottom: em(-30);

    @include media-breakpoint-down(xl) {
      margin-bottom: 0;
      flex-direction: column;
    }

    @include media-breakpoint-down(lg) {
      max-width: em(420);
      flex-direction: row;
      flex-wrap: wrap;
    }

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }

    &--special {
      flex-wrap: nowrap;
      flex-direction: column;
    }
  }

  &__tag-wrapper {
    margin-right: em(20);

    &:not(:last-child) {
      margin-bottom: em(30);

      @include media-breakpoint-down(xl) {
        margin-bottom: em(16);
      }

      @include media-breakpoint-down(lg) {
        margin-right: em(10);
      }

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(10);
      }
    }
  }

  &__tag {
    &--special {
      cursor: auto;

      &:not(:last-child) {
        margin-bottom: em(20);

        @include media-breakpoint-down(md) {
          margin-bottom: em(10);
        }
      }
    }
  }

  &__font {
    &--title {
      font-size: em(72);
      font-weight: 500;
      line-height: 100%;
      text-transform: uppercase;

      @include media-breakpoint-down(lg) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(36);
      }
    }

    &--subtitle {
      font-size: em(30);
      line-height: 1;
      font-weight: 500;

      @include media-breakpoint-down(lg) {
        font-size: em(20);
      }
    }

    &--newline {
      font-size: em(20);
      font-weight: 500;
      line-height: 100%;
      display: block;
      text-transform: uppercase;
    }
  }
}
</style>
