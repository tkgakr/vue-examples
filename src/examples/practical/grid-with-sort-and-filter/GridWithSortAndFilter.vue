<!--
再利用可能なグリッドコンポーネントを作成し、外部データと組み合わせて使用する例。
-->
<script setup>
import { ref } from 'vue'
import DemoGrid from './Grid.vue'

const searchQuery = ref('')
const gridColumns = ['name', 'power']
const gridData = [
  { name: 'Chuck Norris', power: Infinity },
  { name: 'Bruce Lee', power: 9000 },
  { name: 'Jackie Chan', power: 7000 },
  { name: 'Jet Li', power: 8000 },
]
</script>

<template>
  <form id="search">
    Search <input
      v-model="searchQuery"
      name="query"
    >
  </form>
  <DemoGrid
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery"
  />
</template>
