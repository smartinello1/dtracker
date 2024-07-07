<script setup>
import { onBeforeMount, ref } from 'vue'
import { supabase, supabaseSession } from '@/lib/supabaseClient';

let profile = ref({})
let session = ref()

// call supabase and fetch user profile data
onBeforeMount(async () => {
    session.value = supabaseSession
    console.log('session: ' , session.value)
    let profileQuery = await supabase.from('User').select('id,first_name,last_name,alias').eq('supabase_id',`${session.value?.session?.user?.id}`)
    console.log('profile query: ' , profileQuery)
    profile.value = profileQuery.data[0] ?? {}
    console.log('profile value: ' , profile.value)
})

async function saveProfileData() {
    console.log('profile data: ' , profile.value)
    console.log('profile data: ' , window.query)    
    let saveResult = await supabase
    console.log('saveResult' , saveResult)
}

</script>

<style scoped>

</style>

<template>
    <h1>Your Profile</h1>
    <div>
        <label for="first_name">First Name</label>
        <input id="first_name" ref="first_name" :value="profile.first_name" />
    </div>
    <div>
        <label for="last_name">Last Name</label>
        <input id="last_name" ref="last_name" :value="profile.last_name" />
    </div>
    <div>
        <label for="alias">Alias</label>
        <input id="alias" ref="alias" :value="profile.alias" />
    </div>
    <div>
        <button class="button is-primary" @click="saveProfileData">Save</button>
    </div>
</template>