<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello World')
</script>

<template>
  <section class="example-page" aria-labelledby="hello-world-heading">
    <h1 id="hello-world-heading" class="example-title">{{ message }}</h1>
  </section>
</template>
