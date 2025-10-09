<template>
  <div class="image-select" :class="{ 'image-select--set': image }">
    <ImagePicker
      v-show="!imageCropData"
      ref="picker"
      class="image-select__part image-select__part--left"
      :max-size="staticData.maxSize"
      :cropped-image="image"
      @imageChange="(e) => (imageCropData = e)"
      @change="setImage"
    />

    <div v-show="!imageCropData" class="image-select__part image-select__part--right">
      <template v-if="!image">
        <p v-typograph class="image-select__text image-select__text--description">
          <span class="image-select__font image-select__font--text">
            {{ text }}
          </span>
        </p>

        <p v-typograph class="image-select__text image-select__text--rules">
          <span class="image-select__font image-select__font--text">
            Ты можешь загрузить изображение в форматах .png, .jpg, .jpeg размером не более
            {{ staticData.maxSize }} Mb
          </span>
        </p>

        <div class="image-select__tip">
          <span class="image-select__font image-select__font--tip"> * Необязательное поле </span>
        </div>
      </template>

      <template v-else>
        <div>
          <p v-typograph class="image-select__text image-select__text--rules">
            <span class="image-select__font image-select__font--text">
              Ты можешь загрузить изображение в форматах .png, .jpg, .jpeg размером не более
              {{ staticData.maxSize }} Mb
            </span>
          </p>
          <div class="image-select__buttons">
            <label class="image-select__button image-select__button--input">
              <span class="image-select__font image-select__font--button"> ЗАМЕНИТЬ фото </span>

              <CImageInput
                :max-size="staticData.maxSize"
                @change="onImageChange"
                @error="onInputError"
              />
            </label>

            <CButton
              class="image-select__button"
              type="button"
              theme="bordered-grey"
              text="Удалить фото"
              @click="removeImage"
            />
          </div>
        </div>
      </template>
    </div>

    <ImageCropPopup v-if="imageCropData" :data="imageCropData" @close="imageCropData = null" />
  </div>
</template>

<script>
import ImagePicker from '@/components/block/ImagePicker.vue';
import ImageCropPopup from '@/components/popup/ImageCropPopup.vue';

export default {
  name: 'ImageSelect',
  components: { ImageCropPopup, ImagePicker },
  props: {
    text: {
      type: String,
      default:
        'Загрузи изображение*, которое будет использовано в качестве обложки проекта на сайте.',
    },
  },
  data() {
    return {
      image: undefined,
      imageCropData: null,

      staticData: Object.seal({
        maxSize: 20,
      }),
    };
  },
  methods: {
    setImage(src) {
      this.image = src;

      this.$emit('change', src);
    },
    removeImage() {
      this.image = undefined;

      this.$emit('change', undefined);
    },
    onInputError(value) {
      this.$refs.picker.setShowError(value);
    },

    onImageChange(blob, files) {
      this.imageCropData = {
        image: {
          src: blob,
          type: files[0].type,
        },
        setCroppedImage: this.setImage,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.image-select {
  $parent: &;

  color: $color-inputs;

  @include media-breakpoint-up(md) {
    display: flex;
  }

  &__part {
    &--left {
      position: relative;
      margin-right: em(40);

      @include media-breakpoint-down(md) {
        margin-right: 0;
        margin-bottom: em(28);
      }
    }

    &--right {
      @include media-breakpoint-up(md) {
        width: em(300);
      }
      @include media-breakpoint-up(lg) {
        width: em(400);
        padding-top: em(23);
      }
    }
  }

  &__text {
    margin: 0;

    &--description {
      margin-bottom: em(10);

      @include media-breakpoint-up(md) {
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: em(20);
      }
    }

    &--rules {
      margin-bottom: em(10);

      @include media-breakpoint-up(md) {
        margin-bottom: em(18);
      }
      @include media-breakpoint-up(lg) {
        margin-bottom: em(38);
      }
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    margin: auto 0;

    @include media-breakpoint-down(lg) {
      flex-direction: column;
      align-items: flex-start;
    }

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__button {
    height: em(52);

    @include media-breakpoint-down(md) {
      width: 100%;
    }

    &--input {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: em(7) em(30);
      border-radius: em(16);
      background: $color-black;
      color: $color-white;
      margin-right: em(20);
      cursor: pointer;

      @include media-breakpoint-down(lg) {
        margin-right: 0;
        margin-bottom: em(20);
      }
    }
  }

  &__font {
    display: block;

    &--text {
      font-family: $font-family-mts-text;
      font-size: em(14);
      line-height: em(21, 14);

      @include media-breakpoint-up(md) {
        font-size: em(16);
        line-height: em(24, 16);
      }

      @include media-breakpoint-up(lg) {
        font-size: em(20);
        line-height: em(26, 20);
      }
    }

    &--tip {
      font-size: em(12);
      line-height: em(16, 12);
      font-family: $font-family-mts-compact;

      @include media-breakpoint-up(md) {
        font-size: em(14);
        line-height: em(18, 14);
      }
    }

    &--button {
      font-size: em(16);
      font-weight: 500;
      line-height: em(26);
      text-transform: uppercase;
    }
  }

  &--set {
    align-items: center;

    #{$parent} {
      &__part {
        &--left {
          position: relative;
          margin-right: em(40);

          @include media-breakpoint-down(xl) {
            margin-right: em(40);
          }

          @include media-breakpoint-down(lg) {
            margin-right: em(20);
          }

          @include media-breakpoint-down(md) {
            margin-right: 0;
          }
        }

        &--right {
          padding-top: 0;
          display: flex;

          @include media-breakpoint-up(md) {
            width: em(480);
          }
        }
      }
    }
  }
}
</style>
