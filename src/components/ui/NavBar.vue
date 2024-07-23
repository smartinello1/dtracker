<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import router from '@/router'
import { supabase } from '@/lib/supabaseClient'

const session = ref()
let theme = ref(document.documentElement.dataset.theme)

onBeforeMount(() => {
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

function changeColorScheme() {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  theme.value = document.documentElement.dataset.theme
}

const buttonCssClass = computed(() => {
  return theme.value === 'dark' ? 'button is-light' : 'button is-dark'
})

function goToLogin() {
  router.push({ path: '/auth' })
}

function handleMenuLink(event) {
  console.log('pathname: ', event.target.name)
  router.push({ path: event.target.name })
}
</script>

<style scoped>
.navbar-item > img {
  max-height: 2.75rem;
}

.navbar-item > img.is-rounded {
  max-height: 4rem;
  cursor: pointer;
}
</style>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" @click="handleMenuLink" :name="session ? '/dashboard' : '/'">
        <img
          alt="Vue logo"
          @click="handleMenuLink"
          :name="session ? '/dashboard' : '/'"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
      </a>
    </div>
    <!-- navbar for unauthenticated users - START -->
    <div class="navbar-menu" v-if="!session">
      <div class="navbar-start">
        <a @click="handleMenuLink" name="/" class="navbar-item"> Home </a>

        <a @click="handleMenuLink" name="/about" class="navbar-item"> About </a>

        <a @click="handleMenuLink" name="/" class="navbar-item"> Documentation </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" @click="goToLogin"> Log in </a>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar for unauthenticated users - END -->

    <!-- navbar for authenticated users - START -->
    <div class="navbar-menu" v-if="session">
      <div class="navbar-start">
        <a @click="handleMenuLink" name="/dashboard" class="navbar-item"> Dashboard </a>

        <a @click="handleMenuLink" name="/project" class="navbar-item"> Projects </a>

        <a @click="handleMenuLink" name="/task" class="navbar-item"> Tasks </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <button :class="buttonCssClass" @click="changeColorScheme">Change Theme</button>
        </div>
        <figure class="image is-64x64 navbar-item">
          <img
            class="is-rounded"
            src="https://bulma.io/assets/images/placeholders/128x128.png"
            @click="handleMenuLink"
            name="/profile"
          />
        </figure>
        <div class="navbar-item">
          <div class="buttons">
            <a :class="buttonCssClass" @click="handleClickLogout"> Log out </a>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar for authenticated users - END -->
  </nav>
</template>
