<script setup>
import { ref } from 'vue'
import { supabase } from '../../lib/supabaseClient'

let tasks = ref()

async function getTasks() {
  const { data } = await supabase.schema('company1').from('Task').select('id,name')
  console.log('data: ', data)
  tasks.value = data
}

getTasks()
</script>

<template>
  <main>
    <h1>You are in the dashboard</h1>
    <button @click="getTasks">get data</button>
    <li v-for="(item, index) in tasks" :key="item.id">{{ index }} - {{ item.name }}</li>
  </main>
</template>
