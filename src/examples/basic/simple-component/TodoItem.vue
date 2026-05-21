<script setup lang="ts">
import type { Todo } from './types'

defineProps<{
  todo: Todo
}>()
</script>

<template>
  <li>{{ todo.text }}</li>
</template>
