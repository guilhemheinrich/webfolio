import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('modules/home/pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/experience',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('modules/home/pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/experience/:experience_id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'experience_page',
        component: () => import('modules/experience/pages/ExperiencePage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
