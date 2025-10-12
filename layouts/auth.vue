<template>
  <div id="app" class="layout-auth">
    <img class="layout-auth__logo" src="/images/logo.svg" alt="logo" />

    <Nuxt class="layout-auth__page" />

    <Popup class="layout-auth__popup" />
  </div>
</template>

<script>
const Popup = () => import('@/components/layout/Popup.vue');

export default {
  name: 'AuthLayout',
  components: { Popup },
};
</script>

<style scoped lang="scss">
.layout-auth {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100dvh;

  &__popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: $zLevel9;
  }

  &__logo {
    position: absolute;
    left: em(56);
    top: em(14);
    width: em(80);
    height: em(80);

    @include media-breakpoint-down(lg) {
      width: em(56);
      height: em(56);
    }

    @include media-breakpoint-down(md) {
      width: em(46);
      height: em(46);
      left: em(16);
    }
  }
}
</style>
