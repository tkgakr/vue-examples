<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TreeNode } from './types'

const model = defineModel<TreeNode>({ required: true })

const isOpen = ref(false)
const isFolder = computed(() => {
  return !!model.value.children && model.value.children.length > 0
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    model.value.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  if (!model.value.children) {
    model.value.children = []
  }
  model.value.children.push({ name: 'new stuff' })
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
        v-for="(_, index) in model.children"
        :key="index"
        v-model="model.children![index]"
        class="item"
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
