
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':noteId', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: "/signup",
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/signUp.vue'),
      }
    ]
  },
  {
    path: "/login",
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/logIn.vue'),
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
