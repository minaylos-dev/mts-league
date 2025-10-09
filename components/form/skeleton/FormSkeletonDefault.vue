<template>
  <ValidationObserver
    v-slot="{ handleSubmit, invalid, errors }"
    ref="form"
    class="form-skeleton-default"
    slim
  >
    <ClientOnly>
      <form @submit.prevent="handleSubmit(onSubmit)">
        <slot
          :errors="invalid ? errors : {}"
          :custom-errors="customErrors"
          :handle-errors="handleErrors"
        />

        <div
          v-if="(getErrorText(errors) || customErrors.length) && !disableDisplayErrors"
          class="form-skeleton-default__error"
        >
          <span v-typograph class="form-skeleton-default__font form-skeleton-default__font--error">
            {{ getErrorText(errors) }}
          </span>
          <span
            v-if="customErrors.length"
            v-typograph
            class="form-skeleton-default__font form-skeleton-default__font--error"
          >
            {{ customErrors[0] }}
          </span>
        </div>

        <slot
          name="button"
          :invalid="invalid"
          :theme="invalid ? buttonDisabledTheme : buttonTheme"
          :handle-errors="handleErrors"
          :reset-form="resetForm"
        />
      </form>
    </ClientOnly>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

import { getNoun } from '@/tools/helpers';

export default {
  name: 'FormSkeletonDefault',
  components: { ValidationObserver },
  props: {
    buttonTheme: {
      type: String,
      default: 'black',
    },
    buttonDisabledTheme: {
      type: String,
      default: 'grey',
    },

    disableDisplayErrors: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      customErrors: [],
    };
  },
  methods: {
    getErrorText(errors) {
      if (!errors || !Object.keys(errors).length) return;

      return Object.values(errors).find((error) => !!error[0])?.[0];
    },

    handleErrors(response) {
      if (!response) return this.$refs.form.reset();

      const { status, data, statusText } = response;

      switch (status) {
        case 422:
          if (!data) break;

          if (data.errors.achievements) {
            if (typeof data.errors.achievements === 'object') {
              Object.entries(data.errors.achievements).forEach(([key, value]) => {
                this.$refs.form.setErrors({
                  [`achievements${key}`]: value,
                });
              });
            } else {
              this.$refs.form.setErrors({
                achievements0: data.errors.achievements,
                achievements1: data.errors.achievements,
                achievements2: data.errors.achievements,
              });
            }
          }

          if (data.errors.company_values) {
            Object.entries(data.errors.company_values).forEach(([key, value]) => {
              this.$refs.form.setErrors({
                [`company_values_description[${key}]`]: value?.description,
              });
            });
          }

          Object.keys(data.errors).forEach((key) => {
            if (!(key in this.$refs.form.errors)) {
              this.customErrors.push(data.errors[key]);
            }
          });

          // Set field errors
          this.$refs.form.setErrors(data.errors);

          break;

        case 429:
          this.customErrors.push(
            `Отправка кода заблокирована на ${data?.remain} ${getNoun(
              data?.remain,
              'секунда',
              'секунды',
              'секунд'
            )}`
          );

          break;

        case 400:
          this.customErrors.push('Ошибка отправки');
          break;

        default:
          this.customErrors.push(data?.message || statusText || 'Ошибка сервера');
          break;
      }
    },
    resetForm() {
      this.customErrors = [];
      this.$refs.form.reset();
    },
    onSubmit() {
      this.resetForm();

      this.$emit('submit', this.handleErrors);
    },
  },
};
</script>

<style scoped lang="scss">
.form-skeleton-default {
  &__error {
    align-self: flex-start;
    margin-bottom: em(40);
    color: $color-error;

    @include media-breakpoint-down(md) {
      margin-bottom: 0;
    }
  }

  &__font {
    font-size: em(20);
    font-weight: 500;
    line-height: 100%;

    &--error {
      @include media-breakpoint-down(md) {
        font-size: em(14);
      }
    }
  }
}
</style>
