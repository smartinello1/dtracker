<script setup>
import { onBeforeMount, ref } from 'vue'
import { supabase, supabaseSession } from '@/lib/supabaseClient'

let profile = ref({})
let session = ref()
let showNotification = ref(false)

// call supabase and fetch user profile data
onBeforeMount(async () => {
  session.value = supabaseSession
  console.log('session: ', session.value)
  let profileQuery = await supabase
    .from('User')
    .select('id,first_name,last_name,alias')
    .eq('supabase_id', `${session.value?.session?.user?.id}`)
  console.log('profile query: ', profileQuery)
  profile.value = profileQuery.data[0] ?? {}
  console.log('profile value: ', profile.value)
})

async function saveProfileData() {
  console.log('profile data: ', profile.value)
  const { error } = await supabase
    .from('User')
    .update({
      first_name: profile.value.first_name,
      last_name: profile.value.last_name,
      alias: profile.value.alias
    })
    .eq('id', `${profile.value.id}`)
  console.log('error save: ', error)

  if (!error) {
    showNotification.value = true
    window.setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }
}

function closeNotification() {
  showNotification.value = false
}
</script>

<style></style>

<template>
  <div class="container is-max-desktop">
    <div class="notification is-primary has-text-centered" v-if="showNotification">
      <button class="delete" @click="closeNotification"></button>
      {{ $t('profilePage.saveSuccessMessage') }}
    </div>
  </div>
  <div class="container is-max-desktop">
    <div class="card has-background-primary-dark">
      <h1 class="title is-1 has-text-centered has-text-primary p-6">
        {{ $t('profilePage.title') }}
      </h1>
      <div class="card-content">
        <div class="field px-6">
          <label class="label px-6">{{ $t('profilePage.first_name') }}</label>
          <div class="control px-6">
            <input class="input" id="first_name" v-model="profile.first_name" />
          </div>
        </div>
        <div class="field px-6">
          <label class="label px-6">{{ $t('profilePage.last_name') }}</label>
          <div class="control px-6">
            <input class="input" id="last_name" v-model="profile.last_name" />
          </div>
        </div>
        <div class="field px-6">
          <label class="label px-6">{{ $t('profilePage.alias') }}</label>
          <div class="control px-6">
            <input class="input" id="alias" v-model="profile.alias" />
          </div>
        </div>
      </div>
      <div class="has-text-centered p-6">
        <button class="button is-primary" @click="saveProfileData">
          {{ $t('profilePage.saveButton') }}
        </button>
      </div>
      <!-- <footer class="card-footer">
                <a class="card-footer-item" @click="saveProfileData">
                    {{ $t('profilePage.saveButton') }}
                </a>
            </footer> -->
    </div>
  </div>
</template>
