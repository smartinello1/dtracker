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
  <div class="container is-max-desktop py-6" v-if="showNotification">
    <div class="notification is-primary has-text-centered">
      <button class="delete" @click="closeNotification"></button>
      {{ $t('profilePage.saveSuccessMessage') }}
    </div>
  </div>
  <div class="container is-max-desktop pt-6">
    <div class="card has-background">
      <h1 class="title is-1 has-text-centered p-6">
        {{ $t('profilePage.title') }}
      </h1>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">{{ $t('profilePage.first_name') }}</label>
              <div class="control">
                <input class="input" id="first_name" v-model="profile.first_name" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">{{ $t('profilePage.last_name') }}</label>
              <div class="control">
                <input class="input" id="last_name" v-model="profile.last_name" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">{{ $t('profilePage.alias') }}</label>
              <div class="control">
                <input class="input" id="alias" v-model="profile.alias" />
              </div>
            </div>
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
