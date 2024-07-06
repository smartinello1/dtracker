<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { supabase } from '../lib/supabaseClient'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

async function handleClickLogout() {
  let error = await supabase.auth.signOut()
  console.log('error: ', error)
  if (error.error) {
    alert('error: ' + error.message)
  } else {
    
    router.push({ path: '/' })
  }
}

function goToLogin() {
  router.push({ path: '/auth' })
}

function handleMenuLink(event) {
  console.log('pathname: ', event.target.name)
  router.push({ path: event.target.name })
}

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <nav v-if="!session">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
    </nav>
    <nav v-else>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <button @click="handleClickLogout">Logout</button>
    </nav>
  </header> -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" @click="handleMenuLink" name="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
          <a @click="handleMenuLink" name="/" class="navbar-item">
            Home
          </a>

          <a @click="handleMenuLink" name="/about" class="navbar-item">
            About
          </a>

          <a @click="handleMenuLink" name="/" class="navbar-item">
            Documentation
          </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="goToLogin">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

</style>
