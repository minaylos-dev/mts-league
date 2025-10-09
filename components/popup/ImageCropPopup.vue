<template>
  <div class="image-crop-popup">
    <div class="image-crop-popup__container">
      <div class="image-crop-popup__wrapper">
        <CIcon class="image-crop-popup__rotate" name="rotate-btn" @click.native="rotate" />
        <ClientOnly>
          <Cropper
            v-if="data.image"
            ref="cropper"
            class="image-crop-popup__cropper"
            :src="data.image.src"
            :transitions="true"
            image-restriction="fit-area"
            :default-size="defaultSize"
            default-boundaries="fill"
            priority="visibleArea"
            :stencil-props="{
              aspectRatio: 1,
              resizable: true,
            }"
            :aspect-ratio="1"
            @change="onChange"
          />
        </ClientOnly>
      </div>

      <div class="image-crop-popup__holder">
        <div class="image-crop-popup__title">
          <span class="image-crop-popup__font"> Кадрируйте или поверните изображение</span>
        </div>

        <div class="image-crop-popup__buttons">
          <!--          <CButton-->
          <!--            class="image-crop-popup__button"-->
          <!--            theme="bordered-grey"-->
          <!--            text="Повернуть"-->
          <!--            @click="rotate"-->
          <!--          >-->
          <!--            <template #icon-right>-->
          <!--              <CIcon name="rotate" class="image-crop-popup__icon" />-->
          <!--            </template>-->
          <!--          </CButton>-->

          <CButton
            theme="black"
            class="image-crop-popup__button"
            text="Сохранить"
            @click="submit"
          />

          <CButton
            theme="bordered-grey"
            class="image-crop-popup__button"
            text="Отменить"
            @click="$emit('close')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';

import 'vue-advanced-cropper/dist/style.css';

export default {
  name: 'ImageCropPopup',
  components: { Cropper },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      result: undefined,
    };
  },
  methods: {
    onChange({ canvas }) {
      if (!canvas) return;

      this.result = this.optimizeCanvasToBase64(canvas);
    },

    rotate() {
      if (!this.$refs.cropper) return;

      this.$refs.cropper.rotate(90);
    },
    submit() {
      this.data.setCroppedImage(this.result);

      this.$emit('close');
    },
    defaultSize({ imageSize, visibleArea }) {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height,
      };
    },

    optimizeCanvasToBase64(
      canvas,
      quality = 0.7,
      maxWidth = 800,
      maxHeight = 800,
      format = 'image/jpeg'
    ) {
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');

      const scale = Math.min(maxWidth / canvas.width, maxHeight / canvas.height, 1);
      tempCanvas.width = canvas.width * scale;
      tempCanvas.height = canvas.height * scale;

      ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

      const base64String = tempCanvas.toDataURL(format, quality);

      return base64String;
    },
  },
};
</script>

<style scoped lang="scss">
.image-crop-popup {
  display: flex;
  flex-direction: column;

  &__cropper {
    width: em(280);
    height: em(280);

    @include media-breakpoint-down(lg) {
      width: em(240);
      height: em(240);
    }

    @include media-breakpoint-down(md) {
      width: em(280);
      height: em(280);
    }
  }

  &__container {
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      height: 100%;
      flex-direction: column;
    }
  }

  &__title {
    text-align: center;
    white-space: nowrap;
    margin-bottom: em(40);

    @include media-breakpoint-down(xl) {
      margin-bottom: em(30);
    }
  }

  &__wrapper {
    position: relative;
    margin-right: em(30);

    @include media-breakpoint-down(md) {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto 0;
      width: 100%;
    }
  }

  &__rotate {
    width: em(44);
    height: em(44);

    position: absolute;
    bottom: em(20);
    right: em(20);
    z-index: 10;
  }

  &__icon {
    width: em(26);
    height: em(26);
    margin-left: em(20);
  }

  &__buttons {
    display: flex;
    width: 100%;
    gap: em(16);

    @include media-breakpoint-down(md) {
      margin-top: auto;
      flex-direction: column;
      gap: em(8);
    }
  }

  &__button {
    margin-top: em(40);
    height: em(52);

    @include media-breakpoint-down(xl) {
      margin-top: em(30);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
      margin-top: em(10);
    }
  }

  &__font {
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

  ::v-deep .vue-advanced-cropper {
    max-width: em(380);
    max-height: em(280);
    //overflow: hidden;

    @include media-breakpoint-down(xl) {
      max-width: em(290);
      max-height: em(220);
    }

    @include media-breakpoint-down(lg) {
      max-width: em(220);
      max-height: em(160);
    }

    @include media-breakpoint-down(md) {
      max-width: unset;
      width: calc(100% - #{em(50)});
      max-height: em(280);
    }
  }

  ::v-deep .vue-preview__image {
    max-height: none !important;
  }

  ::v-deep .vue-advanced-cropper__image {
    max-height: none !important;
  }

  ::v-deep .vue-preview__wrapper {
    overflow: hidden;
    border-radius: em(24);
  }

  ::v-deep .vue-simple-line {
    border-color: $color-black-grey;
  }

  ::v-deep .vue-simple-handler {
    background: transparent;
    width: em(24);
    height: em(24);
    border: em(2) solid $color-black-grey;
    display: none;

    @include media-breakpoint-down(md) {
      width: em(16);
      height: em(16);
    }

    &--east-south {
      display: block;
      border-left: none;
      border-top: none;
      translate: calc(-50% + #{em(2)}) calc(-50% + #{em(2)});
    }

    &--east-north {
      display: block;
      border-bottom: none;
      border-left: none;
      translate: calc(-50% + #{em(2)}) calc(50% - #{em(2)});
    }

    &--west-south {
      display: block;
      border-right: none;
      border-top: none;
      translate: calc(50% - #{em(2)}) calc(-50% + #{em(2)});
    }

    &--west-north {
      display: block;
      border-bottom: none;
      border-right: none;
      translate: calc(50% - #{em(2)}) calc(50% - #{em(2)});
    }
  }
}
</style>
