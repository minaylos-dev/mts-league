<template>
  <div class="expert-vote-popup">
    <div class="expert-vote-popup__head">
      <div class="expert-vote-popup__title">
        <span class="expert-vote-popup__font expert-vote-popup__font--title">
          {{ text.title }}
        </span>
      </div>

      <div class="expert-vote-popup__text">
        <span
          class="expert-vote-popup__font expert-vote-popup__font--text"
          v-html="text.text"
        ></span>
      </div>
      <div class="expert-vote-popup__text">
        <span
          class="expert-vote-popup__font expert-vote-popup__font--text"
          v-html="text.rules"
        ></span>
      </div>
    </div>

    <BlockExpertVoteRate
      v-for="(item, index) in assessments"
      :key="index"
      class="expert-vote-popup__block"
      :title="item.title"
      :value="item.points"
      @input="(value) => inputHandler(value, index)"
    />

    <div class="expert-vote-popup__button-holder">
      <CButton
        class="expert-vote-popup__button"
        theme="black"
        text="поставить оценку"
        @click="onRate"
      />

      <span
        v-if="isVoted || voted"
        class="expert-vote-popup__font expert-vote-popup__font--text expert-vote-popup__font--text--grey"
        >Оценка отправлена</span
      >
    </div>
  </div>
</template>

<script>
import BlockExpertVoteRate from '@/components/block/expertVote/ExpertVoteRate.vue';

import voteBlockText from '@/config/voteBlockText';

import { mapActions } from 'vuex';

export default {
  name: 'ExpertVotePopup',
  components: { BlockExpertVoteRate },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    text: {
      type: Object,
      default: () => voteBlockText[0],
    },
    callback: {
      type: Function,
      default: () => () => {},
    },
    applicationId: {
      type: Number,
      default: 0,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      assessments: [],
      voted: false,
    };
  },
  mounted() {
    this.assessments = this.data;
  },
  methods: {
    ...mapActions({
      voteExpert: 'votes/voteExpert',
    }),
    inputHandler(value, index) {
      this.assessments = this.data;
      this.assessments[index].points = value;
    },
    onRate() {
      this.voteExpert({
        applicationId: this.applicationId,
        assessments: this.assessments.map((item) => ({
          criteria_id: item.criteriaId,
          points: item.points,
        })),
      }).then(() => {
        this.voted = true;

        if (!this.callback) return;

        this.callback();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.expert-vote-popup {
  border-radius: em(80);
  overflow: hidden;
  background-color: $color-white;
  padding: em(60);

  @include media-breakpoint-down(lg) {
    border-radius: em(40);
    padding: em(60) em(50);
  }

  @include media-breakpoint-down(md) {
    border-radius: em(24);
    padding: em(60) em(16) em(60);
  }

  &__head {
    margin-bottom: em(60);
  }

  &__tooltip {
    position: absolute;
    top: em(-40);
    left: 50%;
    transform: translateX(-50%);

    padding: em(10) em(16);
    background: rgba(255, 255, 255, 0.1);
    border-radius: em(16);
  }

  &__title {
    margin-bottom: em(20);

    @include media-breakpoint-down(md) {
      max-width: em(256);
    }
  }

  &__text {
    max-width: em(620);

    @include media-breakpoint-down(lg) {
      max-width: em(588);
    }

    @include media-breakpoint-down(md) {
      max-width: em(256);
    }
  }

  &__block {
    margin-bottom: em(40);
  }

  &__button {
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__button-holder {
    margin-top: em(60);
    display: flex;
    align-items: center;
    gap: em(20);

    @include media-breakpoint-down(md) {
      flex-direction: column;
      margin-top: 0;
    }
  }

  &__font {
    &--title {
      font-size: em(60);
      font-weight: 500;
      line-height: 100%;

      @include media-breakpoint-down(lg) {
        font-size: em(50);
      }

      @include media-breakpoint-down(md) {
        font-size: em(30);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%;

      @include media-breakpoint-down(lg) {
        font-size: em(16);
      }

      @include media-breakpoint-down(md) {
        font-size: em(14);
      }

      &--grey {
        color: $color-inputs;
      }
    }
  }
}
</style>
