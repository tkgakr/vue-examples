<script setup lang="ts">
import { ref, shallowReactive } from 'vue'

interface Circle {
  cx: number
  cy: number
  r: number
}

const history = shallowReactive<Circle[][]>([[]])
const index = ref(0)
const circles = ref<Circle[]>([])
const selected = ref<Circle>()
const adjusting = ref(false)

function onClick({ offsetX: x, offsetY: y }: MouseEvent) {
  if (adjusting.value) {
    adjusting.value = false
    selected.value = undefined
    push()
    return
  }

  selected.value = [...circles.value].reverse().find(({ cx, cy, r }) => {
    const dx = cx - x
    const dy = cy - y
    return Math.sqrt(dx * dx + dy * dy) <= r
  })

  if (!selected.value) {
    circles.value.push({
      cx: x,
      cy: y,
      r: 50,
    })
    push()
  }
}

function adjust(circle: Circle) {
  selected.value = circle
  adjusting.value = true
}

function push() {
  history.length = ++index.value
  history.push(clone(circles.value))
}

function undo() {
  circles.value = clone(history[--index.value])
}

function redo() {
  circles.value = clone(history[++index.value])
}

function clone(circles: Circle[]): Circle[] {
  return circles.map((c) => ({ ...c }))
}
</script>

<template>
  <svg @click="onClick">
    <foreignObject
      x="0"
      y="40%"
      width="100%"
      height="200"
    >
      <p class="tip">
        <!--
        Click on the canvas to draw a circle. Click on a circle to select it.
        Right-click on the canvas to adjust the radius of the selected circle.
      -->
        キャンバスをクリックして円を描きます。円をクリックして選択します。
        キャンバスを右クリックして、選択した円の半径を調整します。
      </p>
    </foreignObject>
    <circle
      v-for="(circle, i) in circles"
      :key="i"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle === selected ? '#ccc' : '#fff'"
      @click="selected = circle"
      @contextmenu.prevent="adjust(circle)"
    />
  </svg>

  <div class="controls">
    <button
      :disabled="index <= 0"
      @click="undo"
    >
      Undo
    </button>
    <button
      :disabled="index >= history.length - 1"
      @click="redo"
    >
      Redo
    </button>
  </div>

  <div
    v-if="adjusting"
    class="dialog"
    @click.stop
  >
    <!-- <p>Adjust radius of circle at ({{ selected.cx }}, {{ selected.cy }})</p> -->
    <p>({{ selected?.cx }}, {{ selected?.cy }}) における円の半径を調整してください</p>
    <input
      v-model="selected!.r"
      type="range"
      min="1"
      max="300"
    >
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
}

svg {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  background-color: #eee;
}

circle {
  stroke: #000
}

.controls {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.controls button + button {
  margin-left: 6px;
}

.dialog {
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 175px);
  background: #fff;
  width: 400px;
  height: 100px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0,0,0, 0.25);
}

.dialog input {
  display: block;
  width: 200px;
  margin: 0px auto;
}

.tip {
  text-align: center;
  padding: 0 50px;
  color: #bbb;
}
</style>
