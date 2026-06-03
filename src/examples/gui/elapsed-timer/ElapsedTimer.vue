<script setup>
import { computed, onUnmounted, ref } from 'vue'

// 1. タイマーの目標時間と、開始してからの経過時間をリアクティブな値として持つ。(単位 ms)
const duration = ref(15 * 1000)
const elapled = ref(0)

// 2. 前回リセットした時刻と、requestAnimationFrame のIDを保持する。
let lastTime
let handle

// 3. 現在時刻との差分から経過時間を更新し、目標時間に達するまで次のフレームで再実行する。
const update = () => {
  elapled.value = performance.now() - lastTime
  if (elapled.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    // requestAnimationFrame は update を即時実行せず、次の描画直前に1回だけ呼び出すよう予約する。
    // update の中で次回分を予約し続けることで、描画タイミングに合わせた更新ループになる。
    handle = requestAnimationFrame(update)
  }
}

// 4. 経過時間を0に戻し、現在時刻を基準にしてタイマーを最初から動かす。
const reset = () => {
  elapled.value = 0
  lastTime = performance.now()
  update()
}

// 5. progress 要素に渡すため、経過時間が目標時間に対してどれだけ進んだかを0から1の範囲に収める。
const progressRate = computed(() =>
  Math.min(elapled.value / duration.value, 1),
)

// 6. コンポーネントが表示された時点でタイマーを開始する。
reset()

// 7. 画面を離れるときに予約済みのアニメーションフレームを取り消す。
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
