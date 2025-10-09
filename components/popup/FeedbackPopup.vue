<template>
  <PopupSkeletonDefault class="feedback-popup" :class="{ 'feedback-popup--sent': isSent }">
    <div class="feedback-popup__container">
      <div class="feedback-popup__title">
        <span class="feedback-popup__font feedback-popup__font--title" v-html="titleText" />
      </div>

      <FormSkeletonDefault v-if="!isSent" class="feedback-popup__form" @submit="onSubmit">
        <template #default>
          <CTextArea
            v-model="form.message"
            class="feedback-popup__input"
            rules="required|max:1500"
            localized-name="Сообщение"
            placeholder="Опиши свою проблему (0/1500 символов)"
          />
        </template>

        <template #button="{ invalid, theme }">
          <CButton
            class="feedback-popup__button"
            text="отправить"
            :theme="theme"
            :disabled="invalid"
          />
        </template>
      </FormSkeletonDefault>

      <div v-else class="feedback-popup__sent">
        <span class="feedback-popup__font feedback-popup__font--text">
          Мы ответим на твой e-mail в течение трёх рабочих дней
        </span>
      </div>
    </div>
  </PopupSkeletonDefault>
</template>

<script>
import { mapActions } from 'vuex';

const PopupSkeletonDefault = () => import('@/components/popup/skeleton/PopupSkeletonDefault.vue');
const FormSkeletonDefault = () => import('@/components/form/skeleton/FormSkeletonDefault.vue');

export default {
  name: 'FeedbackPopup',
  components: { FormSkeletonDefault, PopupSkeletonDefault },
  data() {
    return {
      form: {
        message: undefined,
      },
      isSent: false,
    };
  },
  computed: {
    titleText() {
      return this.isSent ? 'Спасибо за&nbsp;обращение!' : 'Обратная связь';
    },
  },
  methods: {
    ...mapActions({
      sendFeedback: 'feedback/sendFeedback',
    }),
    onSubmit() {
      this.sendFeedback({ text: this.form.message }).then(() => {
        this.isSent = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.feedback-popup {
  $parent: &;

  &__container {
    margin-right: em(62);

    @include media-breakpoint-down(lg) {
      margin-right: 0;
    }
  }

  &__title {
    color: $color-red;
    margin-bottom: em(30);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(24);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(30);
    }
  }

  &__input {
    height: em(204);
    margin-bottom: em(40);
    margin-right: em(66);

    @include media-breakpoint-down(md) {
      margin-right: 0;
    }
  }

  &__button {
    height: em(52);
  }

  &__font {
    &--title {
      font-size: em(40);
      line-height: 110%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }
    }

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(20);
      line-height: 130%;

      @include media-breakpoint-down(xl) {
        font-size: em(16);
      }
    }
  }

  &--sent {
    #{$parent} {
      &__container {
        margin-right: 0;
      }
    }
  }
}
</style>
