<!--
カスタマイズ可能なスロットとCSSトランジションを備えたモーダルコンポーネント
-->
<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref<boolean>(false)
</script>

<template>
  <button
    id="show-modal"
    @click="showModal = true"
  >
    Show Modal
  </button>

  <Teleport to="body">
    <Modal
      :show="showModal"
      @close="showModal = false"
    >
      <template #header>
        <h3>Custome Header</h3>
      </template>
    </Modal>
  </Teleport>
</template>

<style>

</style>
