import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const exampleRoutes = [
  {
    path: '/basic/hello-world',
    component: () => import('@/examples/basic/hello-world/HelloWorld.vue'),
    meta: { category: 'Basic', title: 'Hello World' },
  },
  {
    path: '/basic/handling-input',
    component: () => import('@/examples/basic/handling-input/HandlingInput.vue'),
    meta: { category: 'Basic', title: 'Handling User Input' },
  },
  {
    path: '/basic/attribute-bindings',
    component: () => import('@/examples/basic/attribute-bindings/AttributeBindings.vue'),
    meta: { category: 'Basic', title: 'Attribute Bindings' },
  },
  {
    path: '/basic/conditionals-and-loops',
    component: () => import('@/examples/basic/conditionals-and-loops/ConditionalsAndLoops.vue'),
    meta: { category: 'Basic', title: 'Conditionals And Loops' },
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
