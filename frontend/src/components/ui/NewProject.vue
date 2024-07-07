<script setup>
import { ref } from 'vue'

let modalClass = ref('modal')

function showModal() {
  modalClass.value = 'modal is-active'
}

function closeModal() {
  modalClass.value = 'modal'
}

defineExpose({
  showModal
})
</script>

<template>
  <div :class="modalClass">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <h1 class="title is-1">New Project</h1>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" />
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>
