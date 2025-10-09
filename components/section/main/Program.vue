<template>
  <section class="section-main-program">
    <BlockRunningLine class="section-main-program__line" text="О программе признания" />

    <BlockProgramCards
      class="section-main-program__cards section-main-program__cards--desktop"
      :items="staticData.cards"
    />
    <BlockProgramCardsMobile
      class="section-main-program__cards section-main-program__cards--mobile"
      :items="staticData.cards"
    />

    <div class="section-main-program__decor"></div>
  </section>
</template>

<script>
const BlockRunningLine = () => import('@/components/block/RunningLine.vue');
const BlockProgramCards = () => import('@/components/block/ProgramCards.vue');
const BlockProgramCardsMobile = () => import('@/components/block/ProgramCardsMobile.vue');

export default {
  name: 'SectionMainProgram',
  components: { BlockProgramCardsMobile, BlockRunningLine, BlockProgramCards },
  data() {
    return {
      staticData: Object.seal({
        cards: [
          {
            number: 1,
            date: '28 октября — <br/> 10 ноября',
            name: 'Подача заявок',
            description: 'Отправь свой проект либо номинируй себя или коллегу',
          },
          {
            number: 2,
            date: '18 —  1 <br/> декабря',
            name: 'Народное голосование',
            description: 'Голосуй за понравившиеся проекты или участников',
          },
          {
            number: 3,
            date: '18 —  1 <br/> декабря',
            name: 'Голосование экспертов',
            description: 'Слово за экспертами, которые оценят проекты',
          },
          {
            number: 4,
            date: '9—31 <br/> декабря',
            name: 'Выбор победителей',
            description: 'Жюри выберет победителей из ТОП-номинантов по рейтингу',
          },
        ],
      }),
    };
  },
};
</script>

<style scoped lang="scss">
.section-main-program {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: em(244);
  padding-bottom: em(140);

  @include media-breakpoint-down(xl) {
    padding-top: em(170);
    padding-bottom: em(110);
  }

  @include media-breakpoint-down(lg) {
    padding: em(160) em(40) em(90);
  }

  @include media-breakpoint-down(md) {
    padding: em(100) em(16) em(40);
  }

  &__decor {
    position: absolute;
    z-index: $zLevel0;
    bottom: em(0);
    right: em(-100);
    width: em(480);
    height: em(280);
    background-image: url($img-path + 'main/intro/coin.png');
    background-size: contain;
    background-repeat: no-repeat;
    animation: levitate linear infinite 10s;

    @include media-breakpoint-down(lg) {
      display: none;
    }

    @include media-breakpoint-down(md) {
      display: none;
    }
  }

  &__line {
    position: absolute;
    top: em(130);
    left: 0;
    right: 0;

    @include media-breakpoint-down(xl) {
      top: em(60);
    }

    @include media-breakpoint-down(lg) {
      top: em(40);
    }

    @include media-breakpoint-down(md) {
      top: em(40);
    }
  }

  &__cards {
    position: relative;
    z-index: 1;

    &--desktop {
      @include media-breakpoint-down(lg) {
        display: none;
      }
    }

    &--mobile {
      width: 100%;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }
}
</style>
