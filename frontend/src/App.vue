<script setup>

import { RouterLink, RouterView } from 'vue-router'
// import { ref } from 'vue'
import router from '@/router';
import { supabase } from '../lib/supabaseClient'
import { authStore } from '@/stores/auth'

const store = authStore()

async function checkAuth() {
  console.log('store.isAuthenticated: ' , store.isAuthenticated)
  console.log('store.isAuthenticated: ' , store.isAuthenticated)
  return store.isAuthenticated
}

checkAuth()

async function handleClickLogout() {
  let error = await supabase.auth.signOut()
  console.log('error: ' , error)
  if(error.error) {
    alert('error: ' + error.message)
  } else {
    // isAuthenticated.value = false
    store.isAuthenticated = false
    store.userInfo = undefined
    router.push({ path: '/' })
  }
}

</script>

<template>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <nav v-if="!store.isAuthenticated">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/auth">Auth</RouterLink>
        </nav>
        <nav v-else>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <button @click="handleClickLogout">Logout</button>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
