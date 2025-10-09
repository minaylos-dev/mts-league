<template>
  <div class="layout-secondary">
    <LayoutHeader class="layout-secondary__header" darker-theme />

    <Nuxt class="layout-secondary__page" />

    <LayoutFooter />

    <Popup class="layout-secondary__popup" />
  </div>
</template>

<script>
import LayoutHeader from '@/components/layout/Header.vue';

const Popup = () => import('@/components/layout/Popup.vue');
const LayoutFooter = () => import('@/components/layout/Footer.vue');
export default {
  name: 'SecondaryLayout',
  components: { LayoutHeader, LayoutFooter, Popup },
};
</script>

<style scoped lang="scss">
.layout-secondary {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $zLevel8;
  }

  &__popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: $zLevel9;
  }
}
</style>
