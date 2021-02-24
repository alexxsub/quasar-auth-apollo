
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/upload',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/upload.vue') }
    ]
  },
  {
    path: '/upload2',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/upload2.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/profile.vue') }
    ]
  },
  {
    path: '/director',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/director.vue') }
    ]
  },
  {
    path: '/manager',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager.vue') }
    ]
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/users.vue') }
    ]
  },
  {
    path: '/table',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/table.vue') }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
