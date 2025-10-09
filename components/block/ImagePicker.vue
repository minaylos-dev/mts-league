<template>
  <div class="image-picker">
    <label class="image-picker__label" :class="{ 'image-picker__label--with-image': croppedImage }">
      <img v-if="croppedImage" class="image-picker__image" :src="croppedImage" alt="image" />

      <template v-else>
        <span class="image-picker__label-text">
          <span class="image-picker__font image-picker__font--label"> выбрать фото </span>
        </span>

        <CImageInput
          ref="fileInput"
          :max-size="maxSize"
          @change="onImageChange"
          @error="setShowError"
        />
      </template>
    </label>

    <div v-if="showError" class="image-picker__error">
      <span class="image-picker__font image-picker__font--error">
        Максимальный размер картинки {{ maxSize }}мб
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePicker',
  props: {
    text: {
      type: String,
      default:
        'Загрузи изображение*, которое будет использовано в качестве обложки проекта на сайте.',
    },
    maxSize: {
      type: Number,
      default: 20,
    },
    croppedImage: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      image: undefined,
      showError: false,
    };
  },
  methods: {
    setShowError(value) {
      this.showError = value;
    },
    setCroppedImage(src) {
      this.$emit('change', src);
    },
    onImageChange(blob, files) {
      this.image = {
        src: blob,
        type: files[0].type,
      };

      this.$emit('imageChange', {
        image: this.image,
        setCroppedImage: this.setCroppedImage,
      });

      this.clearFileInput();
    },

    clearFileInput() {
      const { fileInput } = this.$refs;

      fileInput.$el.value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-picker {
  &__label {
    $label: &;

    position: relative;
    padding: em(15);
    height: em(280);
    background: linear-gradient(180deg, #a1a5ff 0%, #ecccd5 100%);
    border-radius: em(24);
    display: flex;
    overflow: hidden;
    cursor: pointer;

    &:not(#{$label}--with-image) {
      @include hover {
        background: linear-gradient(180deg, #ecccd5 0%, #a1a5ff 100%);
      }
    }

    @include media-breakpoint-up(md) {
      height: em(240);
      width: em(240);
    }
    @include media-breakpoint-up(lg) {
      height: em(280);
      width: em(280);
    }
  }

  &__label-text {
    margin: auto;
    color: #fff;
    border: em(2) solid #fff;
    border-radius: em(16);
    padding: em(11) em(28);
  }

  &__image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    object-fit: cover;
  }

  &__error {
    position: absolute;
    top: calc(100% + #{em(10)});
    color: $color-red;
    white-space: nowrap;
  }

  &__font {
    display: block;

    &--label {
      font-family: $font-family-mts-wide;
      font-size: em(12);
      line-height: em(26, 12);
      font-weight: 500;
      text-transform: uppercase;

      @include media-breakpoint-up(md) {
        font-size: em(16);
        line-height: em(26, 16);
      }
    }

    &--error {
      font-size: em(20);
      font-weight: 500;
      line-height: 100%;
    }
  }
}
</style>
