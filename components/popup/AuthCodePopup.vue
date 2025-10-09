<template>
  <PopupSkeletonDefault class="auth-code-popup">
    <div class="auth-code-popup__title">
      <span class="auth-code-popup__font auth-code-popup__font--title"> Вход на сайт </span>
    </div>

    <div class="auth-code-popup__text">
      <span v-typograph class="auth-code-popup__font auth-code-popup__font--text">
        {{ text }}
      </span>
    </div>

    <FormSkeletonDefault disable-display-errors @submit="onSubmit">
      <template #default="{ errors, customErrors }">
        <CInput
          v-model="form.code"
          class="auth-code-popup__input"
          rules="required|min:1|max:20"
          name="code"
          placeholder="Код"
          :error="(errors.code && errors.code[0]) || customErrors[0]"
          localized-name="Код"
          disable-popup-on-mobile
          show-mobile-error
          validation-mode="aggressive"
        />
      </template>

      <template #button="{ theme, invalid, handleErrors, resetForm }">
        <div class="auth-code-popup__buttons">
          <CButton class="auth-code-popup__button" :theme="theme" :disabled="invalid">
            <span class="auth-code-popup__font auth-code-popup__font--button"> Отправить </span>
          </CButton>

          <CButton
            type="button"
            class="auth-code-popup__button"
            theme="outlined"
            @click="() => resendCode(handleErrors, resetForm)"
          >
            <span class="auth-code-popup__font auth-code-popup__font--button">
              выслать код повторно
            </span>
          </CButton>
        </div>
      </template>
    </FormSkeletonDefault>
  </PopupSkeletonDefault>
</template>

<script>
import { mapActions } from 'vuex';

const FormSkeletonDefault = () => import('@/components/form/skeleton/FormSkeletonDefault.vue');

const PopupSkeletonDefault = () => import('@/components/popup/skeleton/PopupSkeletonDefault.vue');

export default {
  name: 'AuthCodePopup',
  components: { FormSkeletonDefault, PopupSkeletonDefault },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        identifier: undefined,
        code: undefined,
      },

      isResent: false,
    };
  },
  computed: {
    text() {
      return this.isResent
        ? 'Код авторизации отправлен повторно, введи новый код'
        : 'Для подтверждения регистрации введи код, который пришёл на e-mail';
    },
  },
  mounted() {
    this.form.identifier = this.data.identifier;
  },
  methods: {
    ...mapActions({
      getCode: 'auth/getCode',
      sendCode: 'auth/sendCode',
    }),

    resendCode(handleErrors, resetForm) {
      resetForm();

      this.getCode({ email: this.data.email })
        .then((identifier) => {
          this.isResent = true;
          this.form.identifier = identifier;
        })
        .catch(({ response }) => {
          handleErrors(response);
        });
    },

    onSubmit(handleErrors) {
      this.sendCode({
        identifier: this.form.identifier,
        code: this.form.code?.trim(),
        agreed: this.data.agreed,
      })
        .then(() => {
          this.$popup.close();

          this.$router.push('/');
        })
        .catch(({ response }) => {
          handleErrors(response);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.auth-code-popup {
  &__title {
    color: $color-red;
    font-weight: 500;
    margin-bottom: em(30);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(24);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(30);
    }
  }

  &__text {
    max-width: em(380);
    margin-bottom: em(30);

    @include media-breakpoint-down(xl) {
      max-width: em(308);
      margin-bottom: em(24);
    }

    @include media-breakpoint-down(md) {
      max-width: em(250);
      margin-bottom: em(30);
    }
  }

  &__input {
    width: em(280);
    margin-bottom: em(40);

    @include media-breakpoint-down(xl) {
      width: em(230);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      flex-direction: column;
    }
  }

  &__button {
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
    }

    &:not(:last-child) {
      margin-right: em(20);

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(20);
      }
    }
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

      @include media-breakpoint-down(md) {
        font-size: em(14);
      }
    }

    &--button {
      text-transform: uppercase;

      @include media-breakpoint-down(xl) {
        font-size: em(12);
      }
    }
  }
}
</style>
