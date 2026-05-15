import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const exampleRoutes = [
  {
    path: '/basic/hello-world',
    component: () => import('@/examples/basic/hello-world/HelloWorld.vue'),
    meta: { category: 'Basic', title: 'Hello World' },
  },
] satisfies RouteRecordRaw[]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
  ...exampleRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
