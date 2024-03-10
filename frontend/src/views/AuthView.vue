<template>
  <div class="auth-container">
    <div class="authcard">
      <h1 class="auth-title">Sign up</h1>

      <div style="padding: 1rem 0">
        <label for="email" style="display: block">Email:</label>
        <input
          @keyup="handleChangeEmail"
          id="email"
          type="email"
          placeholder="Insert your email..."
        />
      </div>

      <div style="padding: 1rem 0">
        <label for="password" style="display: block">Password:</label>
        <input
          @keyup="handleChangePassword"
          id="password"
          type="password"
          placeholder="Insert your password..."
        />
      </div>

      <div class="signup-btns-container">
        <button @click="signUpHandler">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.auth-title {
  text-align: var(--text-align-center);
}

.signup-btns-container {
  text-align: var(--text-align-center);
  padding: 1rem;
}
</style>

<script setup>
import { supabase } from '../../lib/supabaseClient'
import { ref } from 'vue'

// If supabase client not found, redirect to home
if (!supabase) {
  // TODO: Handle errors SupabaseClient
}

let email = ref()
let password = ref()

async function signUpHandler(event) {
  event.preventDefault()
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: 'http://localhost:5173/dashboard' // TODO: Change url
    }
  })

  console.log('error: ', error)
  if(error) {
    // TODO: Manage errors on signUp process
    alert('error: ' + error.message)
  } else {
    if (data.user.confirmation_sent_at && !data?.session?.access_token) {
    alert('Confirmation Email Sent')
    document.querySelector('#access-token').value = data.session.access_token
    document.querySelector('#refresh-token').value = data.session.refresh_token
    document.cookie = `at=${data.session.access_token}`
    document.cookie = `rt=${data.session.refresh_token}`
    console.log('document.cookie ' , document.cookie)
    alert('Logged in as ' + data.user.email)
  }
  }
}

function handleChangeEmail(event) {
  email.value = event.target.value
  console.log('email: ', email.value)
}

function handleChangePassword(event) {
  password.value = event.target.value
  console.log('password: ', password.value)
}
</script>
