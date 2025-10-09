<template>
  <div class="section-feedback">
    <div class="section-feedback__decor section-feedback__decor--star-1"></div>
    <div class="section-feedback__decor section-feedback__decor--star-2"></div>

    <div class="section-feedback__holder">
      <template v-if="!isSent">
        <div class="section-feedback__title">
          <h2 class="section-feedback__font section-feedback__font--title">Обратная связь</h2>
        </div>
        <FormSkeletonDefault class="section-feedback__form" @submit="onSubmit">
          <template #default>
            <CTextArea
              v-model="form.message"
              class="section-feedback__input"
              rules="required|max:1500"
              localized-name="Сообщение"
              placeholder="Опиши свою проблему "
            />
          </template>

          <template #button="{ invalid, theme }">
            <CButton
              class="section-feedback__button"
              text="отправить"
              :theme="theme"
              :disabled="invalid"
            />
          </template>
        </FormSkeletonDefault>
      </template>
      <template v-else>
        <div class="section-feedback__title">
          <h2 class="section-feedback__font section-feedback__font--title">
            Спасибо за обращение!
          </h2>
        </div>
        <div class="section-feedback__sent">
          <span class="section-feedback__font section-feedback__font--text">
            Мы ответим на твой e-mail в течение трёх рабочих дней
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const FormSkeletonDefault = () => import('@/components/form/skeleton/FormSkeletonDefault.vue');

export default {
  name: 'FeedbackPopup',
  components: { FormSkeletonDefault },
  data() {
    return {
      form: {
        message: undefined,
      },
      isSent: false,
    };
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
.section-feedback {
  padding: em(80) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url($img-path + '/main/feedback/bg.jpg') center / cover no-repeat;
  position: relative;
  overflow: hidden;
  min-height: em(740);

  @include media-breakpoint-down(lg) {
    padding: em(112) em(85);
  }

  @include media-breakpoint-down(md) {
    padding: em(56) em(16);
    min-height: em(530);
    background: url($img-path + '/main/feedback/bg-mob.jpg') center / cover no-repeat;
  }

  $parent: &;

  &__holder {
    width: 100%;
    max-width: em(738);
    padding: em(80);
    background: $color-white;
    margin: 0 auto;
    border-radius: em(32);
    position: relative;
    z-index: $zLevel2;

    @include media-breakpoint-down(lg) {
      padding: em(80) em(50);
    }

    @include media-breakpoint-down(md) {
      padding: em(60) em(16);
    }
  }

  &__decor {
    position: absolute;
    z-index: $zLevel1;

    &--star-1 {
      width: em(384);
      height: em(348);
      right: em(-155);
      top: em(-30);
      background-image: url($img-path + 'main/feedback/star1.png');
      background-size: contain;
      background-repeat: no-repeat;
      //animation: levitate linear infinite 10s;
      transition: transform 0.02s ease;

      @include media-breakpoint-down(lg) {
        width: em(434);
        height: em(398);
        right: em(-170);
        top: em(-30);
      }

      @include media-breakpoint-down(md) {
        width: em(200);
        height: em(190);
        right: em(-55);
        top: em(-40);
      }
    }
    &--star-2 {
      width: em(970);
      height: em(566);
      left: em(-0);
      bottom: em(-80);
      background-image: url($img-path + 'main/feedback/star2.png');
      background-size: contain;
      background-repeat: no-repeat;
      //animation: levitate linear infinite 10s;
      transition: transform 0.02s ease;

      @include media-breakpoint-down(lg) {
        width: em(1170);
        height: em(766);
        left: em(-60);
        bottom: em(-140);
      }

      @include media-breakpoint-down(md) {
        width: em(573);
        height: em(320);
        left: em(-103);
        bottom: em(-50);
      }
    }
  }

  &__input {
    height: em(204);
    margin-bottom: em(10);
    margin-right: em(66);

    @include media-breakpoint-down(md) {
      margin-right: 0;
      height: em(166);
    }
  }

  &__button {
    height: em(52);
    margin-top: em(30);

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__title {
    margin-bottom: em(30);

    @include media-breakpoint-down(md) {
      margin-bottom: em(20);
    }
  }

  &__font {
    &--title {
      font-size: em(40);
      line-height: 110%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }

      @include media-breakpoint-down(md) {
        font-size: em(20);
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
