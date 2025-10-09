<template>
  <div ref="cards" class="block-program-cards">
    <div class="block-program-cards__container">
      <div v-for="(column, index) in sortedItems" :key="index" class="block-program-cards__column">
        <CardProgram
          v-for="card in column"
          :key="card.number"
          class="block-program-cards__card"
          :number="card.number"
          :date="card.date"
          :name="card.name"
          :description="card.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

import CardProgram from '@/components/card/Program.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'BlockProgramCards',
  components: { CardProgram },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedItems() {
      const odd = this.items.filter((item) => item.number % 2);
      const even = this.items.filter((item) => !(item.number % 2));

      return [odd, even];
    },
  },
  mounted() {
    this.animateCardsEnter();
  },
  methods: {
    animateCardsEnter() {
      const cards = document.querySelectorAll('.block-program-cards__card');

      cards.forEach((card) => {
        gsap.to(card, {
          translateY: '0',
          autoAlpha: 1,
          scrollTrigger: { trigger: card, start: 'top bottom' },
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.block-program-cards {
  &__container {
    display: flex;
    overflow: hidden;
  }

  &__column {
    width: em(500);

    &:last-child {
      padding-top: em(63);
      margin-left: em(10);
    }
  }

  &__card {
    transform: translateY(100%);
    opacity: 0;
    visibility: hidden;

    &:not(:last-child) {
      margin-bottom: em(10);
    }
  }
}
</style>
