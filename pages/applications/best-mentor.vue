<template>
  <FormSkeletonDefault class="application" @submit="submitHandler">
    <template #default>
      <h1 class="application__title">
        <span class="application__font application__font--title">
          Заявка на лучшего наставника
        </span>
      </h1>

      <FormSection title="Номинация" class="application__section">
        <CTag
          class="application__tag"
          :title="staticData.applicationTitle"
          description="Лучший наставник"
          icon-name="heart"
          size="adaptive-application"
          disabled
        />
      </FormSection>

      <FormSection title="О номинанте" class="application__section">
        <ImageSelect
          class="application__field"
          text="Загрузи изображение*, которое будет использовано в качестве фото кандидата на сайте."
          @change="setImage"
        />

        <CInput
          v-model="form.fullName"
          label="ФИО"
          placeholder="Введи ФИО"
          class="application__field"
          name="full_name"
          localized-name="ФИО"
          rules="required|min:1|max:255"
        />

        <CSelect
          v-model="form.department"
          label="Наименование компании"
          placeholder="Выбери из списка компанию, в которой сотрудник работает по основному месту работы:"
          :items="departments"
          localized-name="Наименование компании"
          rules="required"
          class="application__field"
          name="department_id"
        />

        <CTextArea
          v-model="form.description"
          label="Почему номинант достоин победы?"
          placeholder="В каких крупных проектах принимал участие, чего удалось достичь в направлениях работы, какие профессиональные качества проявлял лучше всего, сколько сотрудников обучил (как наставник), как развивал команду в качестве наставника и т.д."
          class="application__field application__field--group"
          field-class="application__field--textarea"
          name="description"
          localized-name="Почему номинант достоин победы"
          :rules="`max:${staticData.validation.textareaMax}`"
        />
      </FormSection>

      <FormSection title="Достижения 2024 года" class="application__section">
        <CInput
          v-model="form.achievements[0]"
          label="Перечисли не более трёх ключевых проектов/достижений"
          placeholder="Проектом может быть одно из направлений работы"
          class="application__field application__field--group"
          field-class="application__field--textarea"
          name="achievements0"
          localized-name="Достижения"
          :rules="`max:${staticData.validation.textareaMax}|unique:@achievements1,@achievements2`"
        />

        <CInput
          v-model="form.achievements[1]"
          class="application__field application__field--group"
          field-class="application__field--textarea"
          localized-name="Достижения"
          name="achievements1"
          :rules="`max:${staticData.validation.textareaMax}|unique:@achievements0,@achievements2`"
        />

        <CInput
          v-model="form.achievements[2]"
          class="application__field"
          field-class="application__field--textarea"
          localized-name="Достижения"
          name="achievements2"
          :rules="`max:${staticData.validation.textareaMax}|unique:@achievements0,@achievements1`"
        />
      </FormSection>

      <FormSection title="ценности компании МТС" class="application__section">
        <div v-for="(_, index) in form.companyValues" :key="index" class="application__wrapper">
          <CSelect
            v-model="form.companyValues[index]"
            :label="inputLabel(index, 'Какие ценности демонстрирует сотрудник')"
            placeholder="Выбери ценности из выпадающего списка"
            :items="filteredCompanyValues"
            class="application__field application__field--select"
            name="company_values"
            localized-name="Ценности"
            rules="required"
          />

          <div class="application__row">
            <div v-if="getValueDescription(index)" class="application__text">
              <span class="application__font application__font--text">
                {{ getValueDescription(index) }}
              </span>
            </div>

            <button
              v-if="showRemoveButton"
              type="button"
              class="application__button application__button--remove"
              @click="removeValue(index)"
            >
              <span class="application__font application__font--remove"> Удалить </span>
            </button>
          </div>

          <CInput
            v-model="form.companyValuesDescriptions[index]"
            placeholder="Опиши, как сотрудник проявляет ценность"
            class="application__field application__field--company-description"
            :name="`company_values_description[${index}]`"
            localized-name="Описание ценности"
            rules="required"
          />
        </div>

        <CButton
          v-if="form.companyValues.length < 6"
          type="button"
          text="Добавить ценность"
          theme="bordered-grey"
          @click="addValueField"
        >
          <template #icon-left>
            <CIcon name="plus" class="application__plus-icon" />
          </template>
        </CButton>
      </FormSection>
    </template>

    <template #button="{ theme, invalid }">
      <CButton
        class="application__send"
        text="Отправить заявку"
        :theme="disableButton ? 'grey' : theme"
        :disabled="invalid || disableButton"
      />
    </template>
  </FormSkeletonDefault>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
  camelToSnakeCase,
  convertBase64ToBlob,
  getRandomInt,
  removeMultiSpaces,
} from '@/tools/helpers';
import validation from '@/config/validation';
import routes from '@/constants/routes';

const FormSkeletonDefault = () => import('@/components/form/skeleton/FormSkeletonDefault');
const FormSection = () => import('@/components/form/bundles/FormSection');
const ImageSelect = () => import('@/components/block/ImageSelect.vue');
const CSelect = () => import('@/components/ui/CSelect');

export default {
  name: 'PagesBestMentor',
  components: { CSelect, ImageSelect, FormSection, FormSkeletonDefault },
  layout: 'minimized-black',

  data() {
    return {
      form: {
        fullName: undefined,
        image: undefined,
        department: undefined,
        description: undefined,
        achievements: [],
        companyValues: [undefined],
        companyValuesDescriptions: [undefined],
      },

      disableButton: false,

      staticData: Object.seal({
        applicationTitle: 'Вместе',
        applicationType: 4,
        validation,
      }),
    };
  },
  computed: {
    ...mapGetters({
      nominations: 'catalog/getNominations',
      departments: 'catalog/getDepartments',
      companyValues: 'catalog/getCompanyValues',
    }),

    showRemoveButton() {
      return this.form.companyValues.length > 1;
    },

    filteredCompanyValues() {
      return this.companyValues.filter((item) => {
        return !this.form.companyValues.some((selected) => {
          if (!selected) return false;

          return selected.id === item.id;
        });
      });
    },
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
  created() {
    this.fetchDepartments();
    this.fetchNominations();
    this.fetchCompanyValues();
  },
  methods: {
    ...mapActions({
      postApplication: 'applications/postApplication',
      fetchDepartments: 'catalog/fetchDepartments',
      fetchNominations: 'catalog/fetchNominations',
      fetchCompanyValues: 'catalog/fetchCompanyValues',
    }),

    setImage(src) {
      this.form.image = src;
    },

    submitHandler(handleErrors) {
      this.disableButton = true;

      this.form.nominationId = this.nominations.find(
        (item) => item.type === this.staticData.applicationType
      )?.id;

      const formData = new FormData();

      Object.entries(this.form).forEach(([key, value]) => {
        switch (key) {
          case 'department':
            if (!value) return;

            formData.append('department_id', value?.id);
            break;

          case 'image':
            if (value) {
              formData.append(camelToSnakeCase(key), convertBase64ToBlob(value));
            } else {
              formData.append('image_index', getRandomInt(0, 5));
            }

            break;

          case 'companyValues':
            if (!value) return;

            value.forEach((item, index) => {
              formData.append(`${camelToSnakeCase(key)}[${index}][company_value_id]`, item?.id);
            });
            break;

          case 'companyValuesDescriptions':
            if (!value) return;

            value.forEach((item, index) => {
              formData.append(
                `${camelToSnakeCase('companyValues')}[${index}][description]`,
                removeMultiSpaces(item)
              );
            });
            break;

          case 'achievements':
            if (!value) return;

            value.forEach((item) => {
              formData.append(`${camelToSnakeCase(key)}[]`, removeMultiSpaces(item));
            });
            break;

          default:
            if (!value) return;

            formData.append(camelToSnakeCase(key), removeMultiSpaces(value));
            break;
        }
      });

      this.postApplication(formData)
        .then(() => {
          this.openSentPopup();
        })
        .catch(({ response }) => handleErrors(response))
        .finally(() => {
          this.disableButton = false;
        });
    },

    inputLabel(index, value) {
      return !index ? value : undefined;
    },
    addValueField() {
      this.form.companyValues.push(undefined);
    },

    getValueDescription(index) {
      return this.form.companyValues[index]?.description;
    },
    removeValue(index) {
      this.form.companyValues.splice(index, 1);
      this.form.companyValuesDescriptions.splice(index, 1);
    },

    openSentPopup() {
      this.$popup.open('InfoPopup', {
        title: 'Заявка принята!',
        text: 'Благодарим за поданную заявку и желаем удачи!',
        callback: () => this.$router.push(routes.MAIN),
        disableClickOutside: true,
      });
    },
  },
};
</script>
