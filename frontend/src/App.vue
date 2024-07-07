<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/ui/Navbar.vue';
// import { onMounted, ref } from 'vue'
// import router from '@/router'
// import { supabase } from '../lib/supabaseClient'

// const session = ref()

// onMounted(() => {
//   supabase.auth.getSession().then(({ data }) => {
//     session.value = data.session
//   })

//   supabase.auth.onAuthStateChange((_, _session) => {
//     session.value = _session
//   })
// })

// async function handleClickLogout() {
//   let error = await supabase.auth.signOut()
//   console.log('error: ', error)
//   if (error.error) {
//     alert('error: ' + error.message)
//   } else {
    
//     router.push({ path: '/' })
//   }
// }

// function goToLogin() {
//   router.push({ path: '/auth' })
// }

// function handleMenuLink(event) {
//   console.log('pathname: ', event.target.name)
//   router.push({ path: event.target.name })
// }

</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>

<style scoped>

</style>
