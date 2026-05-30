<!--
組み込みの <TransitionGroup> を使用したFLIP リストの遷移。
https://aerotwist.com/blog/flip-your-animations/
-->
<script setup lang="ts">
import { shuffle as _shuffle } from 'lodash-es'
import { ref } from 'vue'

const getInitialItems = (): number[] => [1, 2, 3, 4, 5]
const items = ref<number[]>(getInitialItems())
let id = items.value.length + 1

function insert(): void {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}

function reset(): void {
  items.value = getInitialItems()
  id = items.value.length + 1
}

function shuffle(): void {
  items.value = _shuffle(items.value)
}

function remove(item: number): void {
  const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}
</script>

<template>
  <button @click="insert">
    Insert at random index
  </button>
  <button @click="reset">
    Reset
  </button>
  <button @click="shuffle">
    Shuffle
  </button>

  <TransitionGroup
    tag="ul"
    name="fade"
    class="container"
  >
    <li
      v-for="item in items"
      :key="item"
      class="item"
    >
      {{ item }}
      <button @click="remove(item)">
        x
      </button>
    </li>
  </TransitionGroup>
</template>

<style>
.container {
  position: relative;
  padding: 0;
  list-style-type: none;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

/* 1. トランジションを定義する */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 表示開始時と非表示終了時の状態を定義する */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 非表示になる要素をレイアウトフローから外し、移動アニメーションが
      正しく計算されるようにする */
.fade-leave-active {
  position: absolute;
}
</style>
