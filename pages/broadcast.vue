<template>
  <div class="pages-broadcast">
    <video
      class="pages-broadcast__video"
      controls
      src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    />
  </div>
</template>

<script>
export default {
  name: 'PagesBroadcast',
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
};
</script>

<style scoped lang="scss">
.pages-broadcast {
  padding: em(150) 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #b8b9d5 0%, #c0c0d8 100%),
    radial-gradient(61.22% 41.5% at 94.92% 44.45%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%),
    radial-gradient(88.91% 74.62% at 86.33% 94.09%, rgb(218, 218, 228) 0%, rgb(218, 218, 228) 100%),
    radial-gradient(91.35% 58.22% at 53.95% 115.88%, rgb(234, 233, 231) 0%, rgb(234, 233, 231) 100%);

  @include media-breakpoint-down(xl) {
    padding: em(150) 0 em(95);
  }

  @include media-breakpoint-down(lg) {
    padding: em(95) 0 em(115);
  }

  @include media-breakpoint-down(md) {
    padding: em(80) 0 em(90);
  }

  &__video {
    width: em(1010);
    height: em(568);

    @include media-breakpoint-down(lg) {
      width: em(688);
      height: em(436);
    }

    @include media-breakpoint-down(md) {
      width: em(288);
      height: em(162);
    }
  }
}
</style>
