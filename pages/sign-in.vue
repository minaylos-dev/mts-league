<template>
  <main class="pages-sign-in">
    <TransitionGroup class="pages-sign-in__holder" name="fade-group" tag="div">
      <div v-if="showOrganization" key="organization" class="pages-sign-in__container">
        <SetOrganization />
      </div>
      <div v-else-if="!authCodeState.show" key="sign" class="pages-sign-in__container">
        <h1 class="pages-sign-in__heading">
          <span class="pages-sign-in__font pages-sign-in__font--heading"> Вход </span>
        </h1>

        <FormSkeletonDefault class="pages-sign-in__form" disable-display-errors @submit="onSubmit">
          <template #default="{ errors, customErrors }">
            <CInput
              v-model="form.email"
              class="pages-sign-in__input"
              placeholder="Корпоративный e-mail"
              name="email"
              type="email"
              localized-name="Корпоративный e-mail"
              rules="corpRequired|email"
              :error="(errors.email && errors.email[0]) || customErrors[0]"
              tooltip-mode="vertical"
              hint="Не можете зарегистрироваться?
              Напишите нам на адрес ligamts@yandex.ru, указав свой корпоративный e-mail"
            />

            <!-- <CCheckbox
              v-model="form.agreement"
              class="pages-sign-in__checkbox"
              rules="checked"
              name="agreement"
              localized-name="Соглашения"
            >
              <span class="pages-sign-in__font pages-sign-in__font--checkbox">
                Согласен с
                <CTagDetect
                  class="pages-sign-in__link"
                  :to="staticData.routes.USER_AGREEMENT"
                  target="_blank"
                >
                  Условиями пользования
                </CTagDetect>
              </span>
            </CCheckbox> -->
          </template>

          <template #button="{ theme, invalid }">
            <CButton class="pages-sign-in__button" :theme="theme" :disabled="invalid">
              <span class="pages-sign-in__font pages-sign-in__font--button"> Войти </span>
            </CButton>
          </template>
        </FormSkeletonDefault>
      </div>
      <div v-else key="code" class="pages-sign-in__container">
        <AuthCode :data="authCodeState.data" />
      </div>
    </TransitionGroup>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

import routes from '@/constants/routes.js';

const FormSkeletonDefault = () => import('@/components/form/skeleton/FormSkeletonDefault.vue');
import AuthCode from '@/components/section/sign-in/AuthCode.vue';
import SetOrganization from '../components/section/sign-in/SetOrganization.vue';

export default {
  name: 'PagesSignIn',
  components: { FormSkeletonDefault, AuthCode, SetOrganization },
  layout: 'auth',
  data() {
    return {
      authCodeState: {
        show: false,
        data: null,
      },

      showOrganization: true,

      form: {
        email: undefined,
        agreement: undefined,
      },

      staticData: Object.seal({
        routes,
      }),
    };
  },
  mounted() {
    if (process.client) {
      window.parent.postMessage(
        {
          type: 'scrolltop',
        },
        '*'
      );
    }
  },
  methods: {
    ...mapActions({
      getCode: 'auth/getCode',
    }),

    onSubmit(handleErrors) {
      this.getCode({ email: this.form.email })
        .then((identifier) => {
          // this.$popup.open('AuthCodePopup', {
          //   identifier,
          //   agreed: this.form.agreement,
          //   email: this.form.email,
          // });
          this.authCodeState.show = true;

          this.authCodeState.data = {
            identifier,
            agreed: this.form.agreement,
            email: this.form.email,
          };
        })
        .catch(({ response }) => handleErrors(response));
    },
  },
};
</script>

<style scoped lang="scss">
.pages-sign-in {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: em(620);
    padding-bottom: em(140);
    margin: 0 auto;

    @include media-breakpoint-down(xl) {
      width: em(480);
      padding-bottom: em(100);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      padding: em(87) em(16);
      justify-content: flex-start;
    }
  }

  &__heading {
    font-size: em(16);
    font-weight: 500;
    color: $color-black-new;
    margin-bottom: em(60);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(50);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(30);
    }
  }

  &__logo-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: em(80);
    height: em(80);

    @include media-breakpoint-down(lg) {
      width: em(56);
      height: em(56);
    }

    @include media-breakpoint-down(md) {
      width: em(46);
      height: em(46);
    }
  }

  &__logo {
    width: 100%;
    height: 100%;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__input {
    width: 100%;
    margin-bottom: em(60);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(40);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: em(30);
    }
  }

  &__checkbox {
    width: 100%;
    color: $color-black-grey;
    margin-bottom: em(40);

    @include media-breakpoint-down(md) {
      margin-bottom: em(30);
    }
  }

  &__link {
    color: $color-link-light-blue;
  }

  &__button {
    height: em(52);
    min-width: em(120);
    position: relative;
    top: em(10);

    @include media-breakpoint-down(md) {
      position: static;
      width: 100%;
    }
  }

  &__font {
    &--heading {
      font-size: em(40);
      font-weight: 500;
      line-height: 110%;

      @include media-breakpoint-down(xl) {
        font-size: em(30);
      }
    }

    &--checkbox {
      font-family: $font-family-mts-text;
      font-weight: 400;
      line-height: 150%;

      @include media-breakpoint-down(xl) {
        font-size: em(12);
      }
    }

    &--button {
      text-transform: uppercase;
      font-weight: 500;

      @include media-breakpoint-down(xl) {
        font-size: em(12);
      }
    }
  }
}
</style>
