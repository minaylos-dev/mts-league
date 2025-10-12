<template>
  <div class="set-organization">
    <div class="set-organization__title">
      <span v-typograph class="set-organization__font set-organization__font--title">
        Выбери компанию
      </span>
    </div>

    <div class="set-organization__select">
      <div
        v-for="(organization, index) in organizations"
        :key="index"
        class="set-organization__option"
        @click="setOrganization(index)"
      >
        <OrganizationSelect :department="organization" :is-checked="index === checkedIndex" />
      </div>
    </div>

    <div class="set-organization__agreement">
      <CCheckbox
        v-model="agreement"
        name="agreement"
        :rules="'required|accepted'"
        localized-name="Соглашение с условиями пользования"
      >
        <span class="set-organization__font set-organization__font--checkbox">
          Согласен с
          <CTagDetect class="set-organization__link" target="_blank" :to="routes.USER_AGREEMENT">
            Условиями пользования
          </CTagDetect>
          и
          <CTagDetect class="set-organization__link" target="_blank" :to="routes.PRIVACY_POLICY">
            Политикой конфиденциальности
          </CTagDetect>
        </span>
      </CCheckbox>
    </div>

    <div class="set-organization__button">
      <CButton theme="black" text="Далее" :disabled="!agreement" @click="onNext" />
    </div>
  </div>
</template>

<script>
import OrganizationSelect from '@/components/block/OrganizationSelect.vue';
import CCheckbox from '@/components/ui/CCheckbox.vue';
import CTagDetect from '@/components/ui/CTagDetect.vue';
import CButton from '@/components/ui/CButton.vue';

import organizations from '@/config/organizations';

import routes from '@/constants/routes';

export default {
  name: 'SetOrganization',
  components: {
    OrganizationSelect,
    CCheckbox,
    CTagDetect,
    CButton,
  },
  data() {
    return {
      checkedIndex: 0,
      agreement: false,
      organizations,
      routes,
    };
  },
  computed: {
    company() {
      return this.organizations[this.checkedIndex] || null;
    },
  },
  methods: {
    setOrganization(index) {
      this.checkedIndex = index;
    },
    onNext() {
      console.log(organizations[this.checkedIndex]);
    },
  },
};
</script>

<style scoped lang="scss">
.set-organization {
  width: 100%;

  &__title {
    color: $color-black-new;
    font-weight: 500;
    font-family: $font-family-mts-text;
    text-align: center;
    font-size: em(30);
    margin-bottom: em(40);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(24);
    }

    @include media-breakpoint-down(md) {
      margin: 0 auto em(30);
      text-align: center;
      max-width: em(290);
    }
  }

  &__select {
    display: flex;
    flex-direction: column;
    gap: em(10);
    margin-bottom: em(40);

    @include media-breakpoint-down(md) {
      margin-bottom: em(24);
    }
  }

  /* оформление блока соглашения */
  &__agreement {
    margin-top: em(20);
    padding: 0 em(20);
    line-height: 150%;
    font-size: em(12);
    margin-bottom: em(40);

    @include media-breakpoint-down(md) {
      margin-bottom: em(24);
    }
  }

  &__link {
    color: $color-grey;
  }

  &__button {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
