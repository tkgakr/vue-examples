<script setup lang="ts">
import { reactive, ref } from 'vue'
import PolyGraph from './PolyGraph.vue'
import type { Stat } from './types'

const newLabel = ref('')
const stats = reactive<Stat[]>([
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 },
])

function add() {
  if (!newLabel.value) return
  stats.push({
    label: newLabel.value,
    value: 100,
  })
  newLabel.value = ''
}

function remove(stat: Stat) {
  if (stats.length > 3) {
    stats.splice(stats.indexOf(stat), 1)
  } else {
    alert('Can\'t delete more!')
  }
}
</script>

<template>
  <div id="demo">
    <svg
      width="200"
      height="200"
    >
      <PolyGraph :stats="stats" />
    </svg>

    <!-- controls -->
    <div
      v-for="stat in stats"
      :key="stat.label"
    >
      <label>{{ stat.label }}</label>
      <input
        v-model.number="stat.value"
        type="range"
        min="0"
        max="100"
      >
      <span>{{ stat.value }}</span>
      <button
        class="remove"
        @click="remove(stat)"
      >
        X
      </button>
    </div>

    <form
      id="add"
      @submit.prevent="add"
    >
      <input
        v-model="newLabel"
        name="newlabel"
      >
      <button type="submit">
        Add a Stat
      </button>
    </form>

    <pre id="raw">{{ stats }}</pre>
  </div>
</template>

<style scoped>
#demo {
  position: relative;
  width: 600px;
  height: 500px;
}

:deep(polygon) {
  fill: #42b983;
  opacity: 0.75;
}

:deep(circle) {
  fill: transparent;
  stroke: #999;
}

:deep(text) {
  font-size: 10px;
  fill: #666;
}

label {
  display: inline-block;
  margin-left: 10px;
  width: 20px;
}

#raw {
  position: absolute;
  top: 0;
  left: 300px;
}
</style>
