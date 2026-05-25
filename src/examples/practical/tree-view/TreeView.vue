<script setup lang="ts">
import { ref } from 'vue'
import TreeItem from './TreeItem.vue'
import type { TreeNode } from './types'

const treeData = ref<TreeNode>({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }],
        },
        { name: 'hello' },
        { name: 'world' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }],
        },
      ],
    },
  ],

})

</script>

<template>
  <ul>
    <TreeItem
      v-model="treeData"
      class="item"
    />
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
