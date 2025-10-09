import routes from '@/constants/routes';

export default ({ store, redirect, route }) => {
  const accessToken = store.getters['auth/getAccessToken'];

  if (!accessToken && route.query.iframe) {
    redirect(routes.MAIN + '?iframe=' + route.query.iframe);
  }

  if (accessToken && route.query.iframe) {
    redirect(routes.MAIN + '?iframe=' + route.query.iframe);
  }

  if (!accessToken && !route.query.iframe && route.fullPath !== routes.SIGN_IN) {
    redirect(routes.SIGN_IN);
  }
};
