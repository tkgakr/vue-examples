<script setup>
import { computed, onUnmounted, ref } from 'vue'

const duration = ref(15 * 1000)
const elapled = ref(0)

let lastTime
let handle

const update = () => {
  elapled.value = performance.now() - lastTime
  if (elapled.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapled.value = 0
  lastTime = performance.now()
  update()
}

const progressRate = computed(() =>
  Math.min(elapled.value / duration.value, 1),
)

reset()

onUnmounted(() => {
  cancelAnimationFrame(handle)
},
)
</script>

<template>
  <label>
    経過時間: <progress :value="progressRate" />
  </label>

  <div>{{ (elapled / 1000).toFixed(1) }}s</div>

  <div>
    設定時間: <input
      v-model="duration"
      type="range"
      min="1"
      max="30000"
    >
    {{ (duration / 1000).toFixed(1) }}s
  </div>

  <button @click="reset">
    Reset
  </button>
</template>

<style>
.elapsed-container {
  width: 300px;
}

.elapsed-bar {
  background-color: red;
  height: 10px;
}
</style>
