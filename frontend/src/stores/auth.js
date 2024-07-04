import { ref } from 'vue'
import { defineStore } from 'pinia'

/*
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
*/

export const authStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userInfo = ref()

  return { isAuthenticated, userInfo }
})