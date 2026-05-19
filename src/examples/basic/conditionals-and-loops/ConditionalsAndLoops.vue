<!--
v-if および v-for ディレクティブを使用すると、条件に応じて、またはループ内でコンテンツを描画することができます。
-->
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const list = ref([1, 2, 3])
</script>

<template>
  <button
    id="toggle-list-button"
    @click="show = !show"
  >
    Toggle List
  </button>
  <button
    id="push-number-button"
    @click="list.push(list.length + 1)"
  >
    Push Number
  </button>
  <button
    id="pop-number-button"
    @click="list.pop()"
  >
    Pop Number
  </button>
  <button
    id="reverse-list-button"
    @click="list.reverse()"
  >
    Reverse List
  </button>

  <ul v-if="show && list.length">
    <li
      v-for="item of list"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
  <p v-else-if="list.length">
    List is not empty, but hidden.
  </p>
  <p v-else>
    List is empty.
  </p>
</template>
