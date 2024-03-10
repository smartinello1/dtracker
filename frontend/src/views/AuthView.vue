<template>
  <div class="auth-container">
    <div class="authcard">
      <h1 class="auth-title">Sign up</h1>

      <div style="padding: 1rem 0">
        <label for="email">Email:</label>
        <input
          @keyup="handleChangeEmail"
          id="email"
          type="email"
          placeholder="Insert your email..."
        />
      </div>

      <div style="padding: 1rem 0">
        <label for="password">Password:</label>
        <input
          @keyup="handleChangePassword"
          id="password"
          type="password"
          placeholder="Insert your password..."
        />
      </div>

      <div class="signin-btns-container" v-if="!showSignUp">
        <button @click="signInHandler">Sign In</button>
        <div>
          Don't you have an account, <a style="cursor: pointer;" @click="signUpViewHandler">sign up</a>
        </div>
      </div>

      <div class="signup-btns-container" v-if="showSignUp">
        <button @click="signUpHandler">Sign Up</button>
        <div>
          Already have an account? <a style="cursor: pointer;" @click="signInViewHandler">sign in</a>
        </div>
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

.signin-btns-container {
  text-align: var(--text-align-center);
  padding: 1rem;
}
</style>

<script setup>
import router from '@/router';
import { supabase } from '../../lib/supabaseClient'
import { ref } from 'vue'

// If supabase client not found, redirect to home
if (!supabase) {
  // TODO: Handle errors SupabaseClient
}

let email = ref()
let password = ref()

let showSignUp = ref(false)

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
    } else {
      alert('Logged in as ' + data.user.email)
    }
  }
}

async function signInHandler(event) {
  event.preventDefault()
  let inputError = false
  if(!email.value) {
    document.querySelector('#email').setCustomValidity('Error!')
    inputError = true
  }

  if(!password.value) {
    document.querySelector('#password').setCustomValidity('Error!')
    inputError = true
  }

  if(inputError) {
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if(error) {
    alert('Error login: ' + error.message)
  } else {
    router.push({ path: '/dashboard' })
  }
}

function signUpViewHandler(event) {
  event.preventDefault()
  showSignUp.value = true
}

function signInViewHandler(event) {
  event.preventDefault()
  showSignUp.value = false
}

function handleChangeEmail(event) {
  event.preventDefault()
  email.value = event.target.value
  console.log('email: ', email.value)
}

function handleChangePassword(event) {
  event.preventDefault()
  password.value = event.target.value
  console.log('password: ', password.value)
}
</script>
