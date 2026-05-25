<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  model: Object,
})

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length
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
        v-for="model in model.children"
        class="item"
        :model="model"
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
