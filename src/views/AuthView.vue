<script setup>
import router from '@/router'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

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
  if (error) {
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
  if (!email.value) {
    document.querySelector('#email').setCustomValidity('Error!')
    inputError = true
  }

  if (!password.value) {
    document.querySelector('#password').setCustomValidity('Error!')
    inputError = true
  }

  if (inputError) {
    return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert('Error login: ' + error.message)
  } else {
    console.log('data login: ', data)
    console.log('data login: ', data.user.id)

    // query user data
    const userQuery = await supabase
      .from('User')
      .select('id,first_name,last_name,tenant_id')
      .eq('supabase_id', `${data.user.id}`)
    console.log('user data: ', userQuery.data)
    console.log('error: ', userQuery.error)

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
}

function handleChangePassword(event) {
  event.preventDefault()
  password.value = event.target.value
}
</script>

<style></style>

<template>
  <div class="container is-max-desktop pt-6">
    <div class="card has-background">
      <h1 class="title is-1 has-text-centered p-6">
        {{ !showSignUp ? $t('authPage.titleSignIn') : $t('authPage.titleSignUp') }}
      </h1>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            
            <div class="field">
              <label class="label">{{ $t('authPage.emailField') }}</label>
              <div class="control">
                <input class="input" type="email" id="email" @keyup="handleChangeEmail" />
              </div>
            </div>

            <div class="field">
              <label class="label">{{ $t('authPage.passwordField') }}</label>
              <div class="control">
                <input class="input" type="password" id="password" @keyup="handleChangePassword" />
              </div>
            </div>

          </div>

          <div v-if="!showSignUp">
            <button class="button is-primary" @click="signInHandler">{{ $t('authPage.titleSignIn') }}</button>
            <div>
              {{ $t('authPage.dontHaveAccount') }},
              <a style="cursor: pointer" @click="signUpViewHandler">{{ $t('authPage.titleSignUp') }}</a>
            </div>
          </div>

          <div v-if="showSignUp">
            <button class="button is-primary" @click="signUpHandler">{{ $t('authPage.titleSignUp') }}</button>
            <div>
              {{ $t('authPage.alreadyHaveAccount') }} <a style="cursor: pointer" @click="signInViewHandler">{{ $t('authPage.titleSignIn') }}</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
