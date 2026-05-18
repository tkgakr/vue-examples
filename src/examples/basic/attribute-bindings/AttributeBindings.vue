<!--
ここでは、要素の属性やプロパティをステートにリアクティブにバインドしています。
:title という構文は、v-bind:title の省略形です。
-->
<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')
const isRed = ref(true)
const color = ref('green')

function toggleRed() {
  isRed.value = !isRed.value
}

function toggleColor() {
  color.value = color.value === 'green' ? 'blue' : 'green'
}
</script>

<template>
  <p>
    <span :title="message">
      ここにマウスを数秒置いてみると、動的に設定されたタイトルが表示されます。
    </span>
  </p>

  <!--
  class への v-bind では、単純な文字列に加えて、オブジェクトや配列も特別にサポートされています
  -->
  <p
    :class="{ red: isRed}"
    @click="toggleRed"
  >
    ここは赤く表示されるはずですが...クリックして表示を切り替えてください。
  </p>

  <!-- style へのバインドも、オブジェクトや配列をサポートしています -->
  <p
    :style="{ color}"
    @click="toggleColor"
  >
    ここは緑になるはずですが、クリックすれば緑と青が切り替わります。
  </p>
</template>

<style>
.red {
  color: red;
}
</style>
