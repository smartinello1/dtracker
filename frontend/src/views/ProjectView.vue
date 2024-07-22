<script setup>
import { onBeforeMount, ref } from 'vue'
import { supabase, supabaseSession } from '@/lib/supabaseClient'
import { /*useRouter,*/ useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue';

let session = ref()
// const router = useRouter()
const route = useRoute()
let projectId = ref(route.params.id)
let project = ref()
let notFound = ref(false)

onBeforeMount(async () => {
  session.value = supabaseSession
  console.log('session: ', session.value)
  loadProject()
})

async function loadProject() {
  let projectQuery = await supabase
    .from('Project')
    .select('id,name,code,start_date,end_date')
    .eq(`id`,`${projectId?.value}`)
  console.log('project detail query: ', projectQuery)

  project.value = projectQuery.data

  if(projectQuery.error) {
    console.log(`error query project detail: ${projectQuery.error}`)
    if(projectQuery.status === 400 || projectQuery.status === 404) {
        // router.push({ name: `NotFound` })
        notFound.value = true
    }
  }
}

</script>

<template>
    <div v-if="!notFound">
        Project details
    </div>
    <div v-if="notFound">
        <NotFoundView></NotFoundView>
    </div>
</template>