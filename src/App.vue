<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { exampleRoutes } from './router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Example navigation">
      <RouterLink class="brand" to="/">Vue Examples</RouterLink>
      <nav>
        <RouterLink
          v-for="route in exampleRoutes"
          :key="route.path"
          class="nav-link"
          :to="route.path"
        >
          {{ route.meta?.title }}
        </RouterLink>
      </nav>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
