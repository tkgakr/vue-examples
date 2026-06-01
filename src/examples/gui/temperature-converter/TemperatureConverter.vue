<script setup lang="ts">
import { ref } from 'vue'

const c = ref<number>(0)
const f = ref<number>(32)

function setC(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  c.value = v
  f.value = v * (9 / 5) + 32
}

function setF(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  f.value = v
  c.value = (v - 32) * (5 / 9)
}
</script>

<template>
  <input
    id="celsius"
    type="number"
    :value="c"
    @change="setC"
  > Celsius =
  <input
    id="fahrenheit"
    type="number"
    :value="f"
    @change="setF"
  > Fahrenheit
</template>
