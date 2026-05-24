<script setup lang="ts" generic="T extends Record<string, string | number>">
import { computed, ref } from 'vue'

type ColumnKey = keyof T & string
type SortOrder = 1 | -1

const props = defineProps<{
  data: T[]
  columns: ColumnKey[]
  filterKey?: string
}>()

const sortKey = ref<ColumnKey | ''>('')
// 各カラムのソート順を保持するオブジェクトを生成する。
// columns 配列を reduce でたたみ込み、各カラム名をキー、初期値 1（昇順）を値とする
// オブジェクトを構築する。例: ['name', 'power'] → { name: 1, power: 1 }
// 第2型引数 <Record<string, SortOrder>> は、初期値 {} の型を明示的に指定するためのもの
// （指定しないと {} は空オブジェクト型と推論され、o[key] = 1 が型エラーになる）。
const sortOrders = ref<Record<string, SortOrder>>(
  props.columns.reduce<Record<string, SortOrder>>((o, key) => {
    o[key] = 1
    return o
  }, {}),
)

const filteredData = computed<T[]>(() => {
  let data = props.data
  let filterKey = props.filterKey
  if (filterKey) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterKey!) > -1
      })
    })
  }
  // ソート処理: sortKey が指定されている場合のみ実行する。
  const key = sortKey.value
  if (key) {
    // order は 1（昇順）または -1（降順）。比較結果に掛けることで方向を反転できる。
    const order = sortOrders.value[key]
    // 元配列を破壊しないよう slice() でコピーしてから sort する。
    data = data.slice().sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      // 比較結果（-1 / 0 / 1）に order を掛けて昇順・降順を切り替える。
      // T の値型を string | number に制約しているため、ここで > 演算子をそのまま使える。
      return (av === bv ? 0 : av > bv ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key: ColumnKey) {
  sortKey.value = key
  sortOrders.value[key] = (sortOrders.value[key] * -1) as SortOrder
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th
          v-for="key in columns"
          :key="key"
          :class="{ active: sortKey == key }"
          @click="sortBy(key)"
        >
          {{ capitalize(key) }}
          <span
            class="arrow"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(entry, index) in filteredData"
        :key="index"
      >
        <td
          v-for="key in columns"
          :key="key"
        >
          {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>
    No matches found.
  </p>
</template>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
