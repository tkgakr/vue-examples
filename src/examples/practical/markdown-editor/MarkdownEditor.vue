<script setup lang="ts">
import { debounce } from 'lodash-es'
import { marked } from 'marked'
import { computed, ref } from 'vue'

const input = ref('# hello')

const output = computed(() => marked(input.value))

// 入力が止まって100ms後にまとめて更新
// v-model だと入力の都度 上記 `marked` を実行してしまうため、
// あえて v-bind と v-on を分けて書いている。
const update = debounce((e) => {
  input.value = e.target.value
}, 100)
</script>

<template>
  <div class="editor">
    <textarea
      class="input"
      :value="input"
      @input="update"
    />
    <!--
    'v-html' directive can lead to XSS attack.
    XSS の危険があるが学習用で公開しないため、サンプル通りサニタイズせずそのままHTML化する
    -->
    <div
      class="output"
      v-html="output"
    />
  </div>
</template>

<style>
body {
  margin: 0;
}

.editor {
  height: 100vh;
  display: flex;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, nonospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
