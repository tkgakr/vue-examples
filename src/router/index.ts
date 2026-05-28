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
  {
    path: '/basic/form-bindings',
    component: () => import('@/examples/basic/form-bindings/FormBindings.vue'),
    meta: { category: 'Basic', title: 'Form Bindings' },
  },
  {
    path: '/basic/simple-component',
    component: () => import('@/examples/basic/simple-component/SimpleComponent.vue'),
    meta: { category: 'Basic', title: 'Simple Component' },
  },
  {
    path: '/practical/markdown-editor',
    component: () => import('@/examples/practical/markdown-editor/MarkdownEditor.vue'),
    meta: { category: 'Practical', title: 'Markdown Editor' },
  },
  {
    path: '/practical/fetching-data',
    component: () => import('@/examples/practical/fetching-data/FetchingData.vue'),
    meta: { category: 'Practical', title: 'Fetching Data' },
  },
  {
    path: '/practical/grid-with-sort-and-filter',
    component: () => import('@/examples/practical/grid-with-sort-and-filter/GridWithSortAndFilter.vue'),
    meta: { category: 'Practical', title: 'Grid With Sort And Filter' },
  },
  {
    path: '/practical/tree-view',
    component: () => import('@/examples/practical/tree-view/TreeView.vue'),
    meta: { category: 'Practical', title: 'Tree View' },
  },
  {
    path: '/practical/svg-graph',
    component: () => import('@/examples/practical/svg-graph/SvgGraph.vue'),
    meta: { category: 'Practical', title: 'Svg Graph' },
  },
  {
    path: '/practical/modal-with-transitions',
    component: () => import('@/examples/practical/modal-with-transitions/ModalWithTransitions.vue'),
    meta: { category: 'Practical', title: 'Modal With Transitions' },
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
