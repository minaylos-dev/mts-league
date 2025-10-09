import routes from '@/constants/routes';

export default ({ redirect, route }) => {
  const redirectRoutes = [
    routes.BEST_DIGITAL_PROJECT,
    routes.BEST_PROJECT,
    routes.BEST_MENTOR,
    routes.BEST_EMPLOYEE,
    routes.VOTE.BEST_MENTOR,
    routes.VOTE.BEST_DIGITAL_PROJECT,
    routes.VOTE.BEST_PROJECT,
  ];

  redirectRoutes.forEach((redirectRoute) => {
    if (route.fullPath.includes(redirectRoute)) {
      // redirect();
      redirect(routes.MAIN);
    }
  });
};
