<script>
export default {
  name: 'CardMore',
  props: {
    title: {
      type: String,
      default: undefined,
    },
    departmentTitle: {
      type: String,
      default: undefined,
    },
    departmentText: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<template>
  <div class="card-more">
    <div class="card-more__title">
      <span class="card-more__font card-more__font--title">
        {{ title }}
      </span>
    </div>

    <div class="card-more__department">
      <span class="card-more__font card-more__font--department-title">
        {{ departmentTitle }}
      </span>
      <br />
      <span class="card-more__font card-more__font--department-text">
        {{ departmentText }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-more {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: em(40);
  background-color: $color-white;
  padding: em(24) em(40);

  @include media-breakpoint-down(lg) {
    padding: em(16) em(40);
  }

  @include media-breakpoint-down(md) {
    flex-direction: column;
    padding: em(16) em(20);
    border-radius: em(24);
  }

  &__title {
    width: em(590);
    word-wrap: break-word;
    //color: $color-red;
    margin-right: em(136);

    @include media-breakpoint-down(xl) {
      width: em(448);
    }

    @include media-breakpoint-down(lg) {
      width: em(288);
      margin-right: em(32);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      margin-right: 0;
      margin-bottom: em(8);
    }
  }

  &__department {
    width: em(714);
    color: $color-black-grey;
    word-wrap: break-word;

    @include media-breakpoint-down(xl) {
      width: em(551);
    }

    @include media-breakpoint-down(lg) {
      width: em(288);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__font {
    &--title,
    &--department-title,
    &--department-text {
      font-size: em(30);
      font-weight: 500;
      line-height: 1;

      @include media-breakpoint-down(lg) {
        font-size: em(20);
      }
    }

    &--department-title,
    &--department-text {
      @include media-breakpoint-down(md) {
        font-size: em(16);
      }
    }

    &--department-text {
      color: $color-grey;
    }
  }
}
</style>
