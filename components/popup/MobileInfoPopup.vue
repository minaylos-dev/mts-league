<template>
  <div class="mobile-info-popup">
    <button class="mobile-info-popup__button" @click="closePopup">
      <CIcon class="mobile-info-popup__icon" name="cross-popup" />
    </button>

    <div class="mobile-info-popup__text">
      <span v-typograph class="mobile-info-popup__font">
        {{ data.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileInfoPopup',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    closePopup() {
      this.$popup.close();
    },
  },
};
</script>

<style scoped lang="scss">
.mobile-info-popup {
  display: flex;
  flex-direction: column;
  background-color: $color-black-grey;
  border-radius: em(24) em(24) 0 0;
  padding: em(15) em(22) em(25);
  min-height: em(145);

  &__icon {
    width: 100%;
  }

  &__button {
    width: em(30);
    height: em(30);
    align-self: flex-end;
    margin-bottom: em(13);
    color: $color-white;
  }

  &__text {
    align-self: center;
    max-width: em(220);
    color: $color-white;
  }

  &__font {
    font-family: $font-family-mts-text;
    font-size: em(13);
    font-weight: 400;
    line-height: em(15);
  }
}
</style>
