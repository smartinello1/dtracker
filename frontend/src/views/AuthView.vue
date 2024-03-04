<template>
  <div class="auth-container">
    <h1>Sign in or Sign up</h1>
    <label for="email"></label>
    <input @keyup="changeEmailHandler" id="email" type="email"/>
    {{ email }}
    <button @click="inviteHandler">Invite</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>

import { supabase } from '../../lib/supabaseClient'
import { ref } from 'vue'

console.log('supabase: ' , supabase)

// If supabase client not found, redirect to home
if(!supabase) {
    //
}

let email = ref()

async function inviteHandler(event) {
    console.log('inviteHandler: ' , event)
    let { data, error } = await supabase.auth.signUp({
        email: 'martinellosimone01@gmail.com',
        password: 'example-password',
    })
    console.log('data invite: ', data, error)

}

function changeEmailHandler(event) {
    email.value = event.target.value
    console.log('email: ' , email.value)
}

</script>
