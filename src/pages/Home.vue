<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { exampleRoutes } from '@/router'

type ExampleGroup = {
  category: string
  routes: typeof exampleRoutes
}

const groupedRoutes = computed<ExampleGroup[]>(() => {
  const groups = new Map<string, typeof exampleRoutes>()

  for (const route of exampleRoutes) {
    const category = String(route.meta?.category ?? 'Other')
    const routes = groups.get(category) ?? []

    routes.push(route)
    groups.set(category, routes)
  }

  return Array.from(groups, ([category, routes]) => ({ category, routes }))
})
</script>

<template>
  <section class="home">
    <h1>Vue Examples</h1>

    <section
      v-for="group in groupedRoutes"
      :key="group.category"
      class="example-group"
      :aria-labelledby="`${group.category}-heading`"
    >
      <h2 :id="`${group.category}-heading`">{{ group.category }}</h2>
      <ul>
        <li v-for="route in group.routes" :key="route.path">
          <RouterLink :to="route.path">{{ route.meta?.title }}</RouterLink>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 24px;
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-size: 2.25rem;
}

.example-group {
  display: grid;
  gap: 10px;
}

ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
}
</style>
