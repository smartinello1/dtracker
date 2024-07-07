<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

let tasks = ref()

async function getTasks() {
  const { data } = await supabase.from('Task').select('id,name,code,subject,description')
  console.log('data: ', data)
  tasks.value = data
}

async function getUserData() {
  const sessionInfo = await supabase.auth.getSession()
  console.log('sessionInfo: ' , sessionInfo)
  
  if(sessionInfo.error) {
    return
  }

  const { data, error } = await supabase.from('User').select('id,first_name,last_name,tenant_id').eq('supabase_id',`${sessionInfo.data.session.user.id}`)
  console.log('user data: ' , data)
  console.log('error: ' , error)
}

getTasks()
</script>

<template>
  <main>
    <h1>You are in the dashboard</h1>
    <button class="button is-primary" @click="getTasks">get data</button>
    <li v-for="(item, index) in tasks" :key="item.id">{{ index }} - {{ item.name }}</li>

    <div>
      <button class="button is-primary" @click="getUserData">Get User</button>
    </div>
  </main>
</template>
