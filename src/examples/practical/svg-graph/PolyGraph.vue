<script setup lang="ts">
import { computed } from 'vue'
import AxisLabel from './AxisLabel.vue'
import type { Stat } from './types'
import { valueToPoint } from './util'

const props = defineProps<{
  stats: Stat[]
}>()

const points = computed(() => {
  const total = props.stats.length
  return props.stats
    .map((stat, i) => {
      const { x, y } = valueToPoint(stat.value, i, total)
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <g>
    <polygon :points="points" />
    <circle
      cx="100"
      cy="100"
      r="80"
    />
    <axis-label
      v-for="(stat, index) in stats"
      :key="stat.label"
      :stat="stat"
      :index="index"
      :total="stats.length"
    />
  </g>
</template>
