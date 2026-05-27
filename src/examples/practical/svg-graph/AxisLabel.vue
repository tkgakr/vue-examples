<script setup lang="ts">
import { computed } from 'vue'
import type { Stat } from './types'
import { valueToPoint } from './util'

const props = defineProps<{
  stat: Stat
  index: number
  total: number
}>()

const point = computed(() =>
  valueToPoint(props.stat.value + 10, props.index, props.total),
)
</script>

<template>
  <text
    :x="point.x"
    :y="point.y"
  >
    {{ stat.label }}
  </text>
</template>
