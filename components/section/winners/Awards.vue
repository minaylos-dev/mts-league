<template>
  <section class="section-winners-awards">
    <CardAwards class="section-winners-awards__card" :hide-button="!staticData.showButton" />
  </section>
</template>

<script>
import CardAwards from '@/components/card/Awards.vue';

export default {
  name: 'SectionWinnersAwards',
  components: { CardAwards },
  data() {
    return {
      staticData: Object.seal({
        showButton: true,
      }),
    };
  },
};
</script>

<style scoped lang="scss">
.section-winners-awards {
  background-color: $color-white;
  padding: em(40);

  @include media-breakpoint-down(md) {
    padding: em(40) em(16);
  }

  &__card {
    width: 100%;
  }
}
</style>
