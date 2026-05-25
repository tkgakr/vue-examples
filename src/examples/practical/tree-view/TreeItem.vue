<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNode } from './types'

const props = defineProps<{
  model: TreeNode
}>()

const isOpen = ref(false)
const isFolder = computed(() => {
  return !!props.model.children && props.model.children.length > 0
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  if (!props.model.children) {
    props.model.children = []
  }
  props.model.children.push({ name: 'new stuff' })
}
</script>

<template>
  <li>
    <div
      :class="{ bold: isFolder}"
      @click="toggle"
      @dblclick="changeType"
    >
      {{ model.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul
      v-show="isOpen"
      v-if="isFolder"
    >
      <!-- コンポーネントは自分自身を再帰的にレンダリングすることができる -->
      <TreeItem
        v-for="(child, index) in model.children"
        :key="index"
        class="item"
        :model="child"
      />
      <li
        class="add"
        @click="addChild"
      >
        +
      </li>
    </ul>
  </li>
</template>
