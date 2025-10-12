<template>
  <div class="organization-select" :class="{ 'organization-select--checked': isChecked }">
    <div class="organization-select__font">
      <div class="organization-select__font--title">
        {{ department.title }}
      </div>
      <div v-if="department.subtitle" class="organization-select__font--subtitle">
        {{ department.subtitle }}
      </div>
    </div>

    <CIcon v-if="isChecked" class="organization-select__icon" name="checkmark" />
  </div>
</template>

<script>
export default {
  name: 'OrganizationSelect',
  props: {
    department: {
      type: Object,
      default: undefined,
    },

    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.organization-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: em(16);
  border-radius: em(16);
  border: 1px solid rgba($color-grey, 0.5);
  padding: em(11.5) em(24);
  height: em(52);
  cursor: pointer;

  @include media-breakpoint-down(md) {
    padding: em(11.5) em(12.5);
  }

  &__font {
    font-family: $font-family-mts-text;
    line-height: 100%;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: em(8);

    &--title {
      font-size: em(16);
      color: $color-black-default;
      height: em(11);
    }

    &--subtitle {
      font-size: em(11);
      color: #979797;
      height: em(8);
    }
  }

  &__icon {
    width: em(20);
    height: em(20);
    color: $color-white;

    @include media-breakpoint-down(md) {
      width: em(16);
      height: em(16);
    }
  }

  &--checked {
    border: 1px solid $color-black-grey;
    background-color: $color-black-grey;

    .organization-select__font--title {
      color: $color-white;
    }

    .organization-select__font--subtitle {
      color: #9a9aae;
    }
  }
}
</style>
