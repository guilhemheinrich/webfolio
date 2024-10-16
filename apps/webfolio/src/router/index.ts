import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    scrollBehavior: (to, from, savedPosition) => {
      // Si la position est sauvegardée (comme avec le bouton Précédent)
      if (savedPosition) {
        return savedPosition;
      } else if (to.params.scrollPosition) {
        // Restaurer la position de scroll manuellement sauvegardée
        return { top: to.params.scrollPosition };
      } else {
        // Sinon, scroller en haut de la page
        return { top: 0 };
      }
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
