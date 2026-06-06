<script setup lang="ts">
import type { VNode } from 'vue'
import { ref } from 'vue'
import { cells, evalCell } from './store'

const props = defineProps<{
  c: number
  r: number
}>()

const editing = ref(false)

function update(e: Event) {
  editing.value = false
  cells[props.c][props.r] = (e.target as HTMLInputElement).value.trim()
}
</script>

<template>
  <div
    class="cell"
    :title="cells[c][r]"
    @click="editing = true"
  >
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vue:mounted="(vnode: VNode) => (vnode.el as HTMLInputElement).focus()"
    >
    <span v-else>
      {{ evalCell(cells[c][r]) }}
    </span>
  </div>
</template>

<style>
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>
