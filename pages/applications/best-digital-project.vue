<template>
  <FormSkeletonDefault class="application" @submit="submitHandler">
    <template #default>
      <h1 class="application__title">
        <span class="application__font application__font--title">
          Заявка на лучший внутренний проект
        </span>
      </h1>

      <FormSection title="Номинация" class="application__section">
        <CTag
          class="application__tag"
          :title="staticData.applicationTitle"
          description="Лучший цифровой проект"
          icon-name="clock"
          size="adaptive-application"
          disabled
        />
      </FormSection>

      <FormSection title="Основная информация о проекте" class="application__section">
        <ImageSelect
          text="Загрузи изображение*, которое будет использовано в качестве фото кандидата на сайте."
          class="application__field"
          @change="setImage"
        />

        <CInput
          v-model="form.name"
          label="Наименование проекта"
          placeholder="Введи наименование"
          class="application__field"
          rules="required"
          localized-name="Наименование проекта"
          name="name"
        />

        <CInput
          v-model="form.leader"
          label="ФИО лидера проекта"
          name="leader"
          placeholder="Введи ФИО"
          rules="required"
          class="application__field"
          localized-name="ФИО лидера"
        />

        <CInput
          v-model="form.team"
          label="Команда проекта (ФИО)"
          placeholder="Основные участники, не более 4 человек через запятую (итого максимум 5 человек: лидер проекта + 4 человека команда)"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          localized-name="Команда проекта"
          name="team"
        />

        <CSelect
          v-model="form.department"
          label="Наименование компании"
          placeholder="Выбери из списка компанию, в которой сотрудник работает по основному месту работы:"
          :items="departments"
          name="department_id"
          rules="required"
          localized-name="Наименование компании"
          class="application__field"
        />
      </FormSection>

      <FormSection title="Описание проекта" class="application__section">
        <CTextArea
          v-model="form.goal"
          label="Цель проекта"
          placeholder="Опиши одну глобальную цель, чего хотели достичь"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="goal"
          localized-name="Цель проекта"
        />

        <CTextArea
          v-model="form.objectives"
          label="Укажи основные задачи, которые решает проект"
          placeholder="Опиши маршрутную карту проекта, как ты его реализовывал(а)"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="objectives"
          localized-name="Задачи"
        />

        <CInput
          v-model="form.preconditions"
          label="Какие были предпосылки для проекта"
          placeholder="Какие были причины/события для запуска этого проекта"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="preconditions"
          localized-name="Предпосылки"
        />

        <!--        <CInput-->
        <!--          v-model="form.digital_solutions"-->
        <!--          label="Опишите какие цифровые инструменты вы использовали в своем проекте"-->
        <!--          placeholder="Платформы, коды, программы"-->
        <!--          class="application__field"-->
        <!--          field-class="application__field&#45;&#45;textarea"-->
        <!--          :rules="`required|max:${staticData.validation.textareaMax}`"-->
        <!--          name="digital_solutions"-->
        <!--          localized-name="Цифровые инструменты"-->
        <!--        />-->

        <CTextArea
          v-model="form.results"
          label="Результаты проекта"
          placeholder="Какие результаты были достигнуты (количественные и качественные), также необходимо прописать NPS проекта для внешних проектов и оценку проекта от внутренних пользователей (если есть)."
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="results"
          localized-name="Результаты проекта"
        />
      </FormSection>

      <FormSection title="Влияние на бизнес" class="application__section">
        <CInput
          v-model="form.contribution"
          label="Каков вклад проекта в развитие бизнеса"
          placeholder="Экономический эффект, улучшение процесса, HR-метрики"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="contribution"
          localized-name="Вклад"
        />
      </FormSection>

      <FormSection title="Инновационность и уникальность" class="application__section">
        <CInput
          v-model="form.novelty"
          label="В чем новизна и уникальность проекта"
          placeholder="Использовалось ли подобное решение ранее, задействовались ли последние разработки"
          class="application__field"
          field-class="application__field--textarea"
          :rules="`required|max:${staticData.validation.textareaMax}`"
          name="novelty"
          localized-name="Новизна"
        />
      </FormSection>

      <FormSection title="Масштаб применения" class="application__section">
        <CInput
          v-model="form.scaling"
          label="Можно ли масштабировать проект на другие подразделения или дочерние компании? Если да, то как?"
          placeholder=""
          class="application__field"
          field-class="application__field--textarea"
          name="scaling"
          :rules="`max:${staticData.validation.textareaMax}`"
          localized-name="Масштабирование"
        />

        <CInput
          v-model="form.coverage"
          label="Аудитория проекта, охват"
          placeholder="Сколько людей стало участниками/пользователями проекта"
          class="application__field"
          rules="required"
          name="coverage"
          localized-name="Охват"
        />
      </FormSection>

      <FormSection title="Ресурсы" class="application__section">
        <CInput
          v-model="form.teamMembers"
          label="Команда. Сколько человек было задействовано в реализации проекта?"
          placeholder="Введи число без пробелов"
          class="application__field"
          rules="required"
          name="team_members"
          localized-name="Команда"
        />

        <CInput
          v-model="form.budget"
          label="Бюджет. Сколько денег было потрачено на реализацию проекта?"
          placeholder="Введи число без пробелов"
          class="application__field"
          rules="required"
          name="budget"
          localized-name="Бюджет"
        />
      </FormSection>
    </template>

    <template #button="{ invalid, theme }">
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
  name: 'PagesBestDigitalProject',
  components: { ImageSelect, FormSection, FormSkeletonDefault, CSelect },
  layout: 'minimized-black',

  data() {
    return {
      form: {
        nominationId: undefined,
        image: undefined,
        department: undefined,
        name: undefined,
        leader: undefined,
        team: undefined,
        goal: undefined,
        objectives: undefined,
        preconditions: undefined,
        // digital_solutions: undefined,
        results: undefined,
        contribution: undefined,
        novelty: undefined,
        scaling: undefined,
        coverage: undefined,
        teamMembers: undefined,
        budget: undefined,
      },

      disableButton: false,

      staticData: Object.seal({
        applicationTitle: 'Быстро по сути',
        applicationType: 2,
        validation,
      }),
    };
  },
  computed: {
    ...mapGetters({
      nominations: 'catalog/getNominations',
      departments: 'catalog/getDepartments',
    }),
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
  },
  methods: {
    ...mapActions({
      postApplication: 'applications/postApplication',
      fetchDepartments: 'catalog/fetchDepartments',
      fetchNominations: 'catalog/fetchNominations',
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
