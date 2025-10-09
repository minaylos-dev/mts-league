import routes from '@/constants/routes';

const nominations = {
  items: [
    {
      id: 1,
      title: 'Вместе',
      iconName: 'heart',
      description: 'Лучший наставник',
      startText: 'Выбери лучшего наставника в этой номинации',
      link: routes.BEST_MENTOR,
      slug: 'best-mentor',
      redirectLink: routes.VOTE.BEST_DIGITAL_PROJECT,
    },
    {
      id: 3,
      title: 'Бери и действуй',
      iconName: 'action',
      description: 'Лучший сотрудник',
      startText: 'Выбери лучшего сотрудника в этой номинации',
      link: routes.BEST_EMPLOYEE,
      slug: 'best-employee',
      redirectLink: routes.VOTE.BEST_MENTOR,
    },
    {
      id: 2,
      title: 'Быстро по сути',
      iconName: 'clock',
      description: 'Лучший внутренний проект',
      startText: 'Выбери лучший проект в этой номинации',
      link: routes.BEST_DIGITAL_PROJECT,
      slug: 'best-digital-project',
      redirectLink: routes.VOTE.BEST_PROJECT,
    },
    {
      id: 4,
      title: 'Про клиента',
      iconName: 'client',
      description: 'Лучший внешний проект',
      startText: 'Выбери лучший проект в этой номинации',
      link: routes.BEST_PROJECT,
      slug: 'best-project',
      redirectLink: routes.VOTE.BEST_EMPLOYEE,
    },
  ],
  special: [
    {
      id: 6,
      title: 'Сделай круто',
      iconName: 'fire',
      description: 'Лучшая команда',
      startText: 'Выбери лучший проект в этой номинации',
      hideButton: true,
      slug: '/president',
    },
    {
      id: 5,
      title: 'Больше чем работа',
      iconName: 'star',
      description: 'Рейтинг исследования вовлеченности',
      startText: 'Выбери лучший проект в этой номинации',
      hideButton: true,
      slug: 'rating',
    },
  ],
  companies: [
    {
      id: 7,
      title: 'МТС',
      iconName: 'star',
    },
    {
      id: 8,
      title: 'МТС 2',
      iconName: 'star',
    },
  ],
};

export const nominationsList = [...nominations.items, ...nominations.special];

export default nominations;
