<!--
この例では、v-onディレクティブを使用したユーザー入力の処理方法を示している。
-->
<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  // ref の値には、その `.value` プロパティを介してアクセス/変更する。
  message.value = message.value.split('').reverse().join('')
}

function notify() {
  alert('navigation was prevented')
}
</script>

<template>
  <!--
  Note: テンプレート内では .value を指定する必要はない。
  refs は、テンプレート内で自動的に 「アンラップ」されるため。
  -->
  <h1>{{ message }}</h1>

  <!--
  method/function にバインドする。
  `@ckick` は `v-on:click` の省略記法。
  -->
  <button @click="reverseMessage">
    Reverce Message
  </button>

  <!-- インラインで式を書くこともできる。 -->
  <button @click="message += '!'">
    Append "!"
  </button>

  <!--
  Vueでは、e.preventDefault() や e.stopPropagation() など、
  一般的なタスクのための修飾子も提供されている。
  -->
  <a
    href="https://vuejs.org"
    @click.prevent="notify"
  >
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>
