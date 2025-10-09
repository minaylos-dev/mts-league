<template>
  <input ref="input" type="file" class="c-image-input" accept="image/*" @change="loadImage" />
</template>

<script>
export default {
  name: 'CImageInput',
  props: {
    maxSize: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    loadImage(event) {
      this.$emit('error', false);

      const files = event.target.files;

      if (!files || !files[0]) return;

      const fileSize = files[0].size / 1024 ** 2;

      if (fileSize > this.maxSize) {
        this.$emit('error', true);

        return;
      }

      const blob = URL.createObjectURL(files[0]);

      const reader = new FileReader();

      reader.onload = () => {
        this.$emit('change', blob, files);
      };

      reader.readAsArrayBuffer(files[0]);
    },
  },
};
</script>

<style scoped lang="scss">
.c-image-input {
  display: none;
}
</style>
