<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

const names = reactive<string[]>(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
const selected = ref<string>('')
const prefix = ref<string>('')
const first = ref<string>('')
const last = ref<string>('')

const filterNames = computed(() =>
  names.filter((n) => n.toLowerCase().startsWith(prefix.value.toLowerCase())),
)

watch(selected, (name) => {
  const [surname = '', givenName = ''] = name.split(', ')
  last.value = surname
  first.value = givenName
})

function create(): void {
  if (hasValidInput()) {
    const fullName = `${last.value}, ${first.value}`
    if (!names.includes(fullName)) {
      names.push(fullName)
      first.value = last.value = ''
    }
  }
}

function update(): void {
  if (hasValidInput() && selected.value) {
    const i = names.indexOf(selected.value)
    if (i === -1) {
      return
    }
    names[i] = selected.value = `${last.value}, ${first.value}`
  }
}

function del(): void {
  if (selected.value) {
    const i = names.indexOf(selected.value)
    if (i === -1) {
      return
    }
    names.splice(i, 1)
    selected.value = first.value = last.value = ''
  }
}

function hasValidInput(): boolean {
  return Boolean(first.value.trim() && last.value.trim())
}
</script>

<template>
  <div>
    <input
      v-model="prefix"
      placeholder="Filter prefix"
    >
  </div>

  <select
    v-model="selected"
    size="5"
  >
    <option
      v-for="name in filterNames"
      :key="name"
    >
      {{ name }}
    </option>
  </select>

  <label>Name: <input v-model="first"></label>
  <label>Surname: <input v-model="last"></label>

  <div class="buttons">
    <button @click="create">
      Create
    </button>
    <button @click="update">
      Update
    </button>
    <button @click="del">
      Delete
    </button>
  </div>
</template>

<style>
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>
