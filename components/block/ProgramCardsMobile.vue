<template>
  <div ref="cards" class="block-program-cards-mobile">
    <CardProgram
      v-for="card in items"
      :key="card.number"
      class="block-program-cards-mobile__card"
      :number="card.number"
      :date="card.date"
      :name="card.name"
      :description="card.description"
    />
  </div>
</template>

<script>
const CardProgram = () => import('@/components/card/Program.vue');

export default {
  name: 'BlockProgramCardsMobile',
  components: { CardProgram },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.block-program-cards-mobile {
  &__card {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: em(10);
    }
  }
}
</style>
