<script setup lang="ts">
import { computed, ref } from 'vue'

type FlightType = 'one-way flight' | 'return flight'

const flightType = ref<FlightType>('one-way flight')
const departureDate = ref(dateToString(new Date()))
const returnDate = ref(departureDate.value)

const isReturn = computed(() => flightType.value === 'return flight')

const canBook = computed(
  () => !isReturn.value
    || stringToDate(returnDate.value) > stringToDate(departureDate.value),
)

function book(): void {
  alert(
    isReturn.value
      ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
      : `You have booked a one-way flight leaving on ${departureDate.value}.`,
  )
}

function stringToDate(str: string): Date {
  const [y, m, d] = str.split('-')
  return new Date(+y, +m - 1, +d)
}

function dateToString(date: Date): string {
  return (
    date.getFullYear()
    + '-'
    + pad(date.getMonth() + 1)
    + '-'
    + pad(date.getDate())
  )
}

function pad(n: number, s: string = String(n)): string {
  return s.length < 2 ? `0${s}` : s
}
</script>

<template>
  <select v-model="flightType">
    <option value="one-way flight">
      One-way Flight
    </option>
    <option value="return flight">
      Return Flight
    </option>
  </select>

  <input
    id="departure-date"
    v-model="departureDate"
    type="date"
  >
  <input
    id="return-date"
    v-model="returnDate"
    type="date"
    :disabled="!isReturn"
  >

  <button
    :disabled="!canBook"
    @click="book"
  >
    Book
  </button>

  <p>{{ canBook ? '' : 'Return date must be after departure date.' }}</p>
</template>

<style>
select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>
