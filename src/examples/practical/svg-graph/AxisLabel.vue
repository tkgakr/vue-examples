<script setup>
import { computed } from 'vue'
import { valueToPoint } from './util.js'

const props = defineProps({
  stat: {
    type: Object,
    default: () => ({ label: '', value: 0 }),
  },
  index: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
})

const point = computed(() =>
  valueToPoint(+props.stat.value + 10, props.index, props.total),
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
