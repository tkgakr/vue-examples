<script setup lang="ts">
defineProps({
  todo: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li>{{ todo.text }}</li>
</template>
