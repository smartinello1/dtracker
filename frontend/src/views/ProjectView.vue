<script setup>
import { onBeforeMount, ref } from 'vue'
import { supabase, supabaseSession } from '@/lib/supabaseClient'
import NewProject from '@/components/ui/NewProject.vue'

const projects = ref()
let selectedProject = ref()
let session = ref()
let modal = ref(NewProject)

onBeforeMount(async () => {
  session.value = supabaseSession
  console.log('session: ', session.value)
  loadProject()
})

async function loadProject() {
  let projectsQuery = await supabase
    .from('Project')
    .select('id,name,code,start_date,end_date')
    .limit(10)
  console.log('projects query: ', projectsQuery)
  projects.value = projectsQuery.data
  console.log('projects value: ', projects.value)
}

function updateProjectSelection(event) {
  console.log('event: ', event.target.name)
  let tmpSelectedProject
  projects.value.forEach((p) => {
    p.isActive = p.code === event.target.name
    if (p.isActive) {
      tmpSelectedProject = p
    }
  })
  selectedProject.value = tmpSelectedProject
}

function openModalNewProject() {
  console.log('show modal: ', modal.value)
  modal.value.showModal()
}

function handleProjectCreated() {
  loadProject()
}
</script>

<template>
  <NewProject ref="modal" @project-created="handleProjectCreated" />
  <div class="columns">
    <aside class="menu column is-2">
      <button class="button is-primary my-3" @click="openModalNewProject">
        {{ $t('projectPage.createNewProjectButton') }}
      </button>
      <h1 class="my-3">{{ $t('projectPage.projectsTitle') }}</h1>
      <ul class="menu-list" v-if="projects?.length > 0">
        <li v-for="project in projects" :key="project.code">
          <a
            :class="project.isActive ? 'is-active is-primary' : ''"
            @click="updateProjectSelection"
            :name="project.code"
            >{{ project.name }} ({{ project.code }})</a
          >
        </li>
      </ul>
    </aside>
    <div class="container column is-10" v-if="projects?.length > 0">
      <div class="section">
        <h1 class="title is-1">
          {{ selectedProject ? selectedProject.name : $t('projectPage.selectAProjectTitle') }}
        </h1>
        <div class="card" v-if="selectedProject">
          <div class="card-content">
            <div class="content">
              {{ $t('projectPage.nameField') }}: {{ selectedProject.name }}
              {{ $t('projectPage.codeField') }}: {{ selectedProject.code }}
              <br />
              {{ $t('projectPage.startDateField') }}:
              <time :datetime="selectedProject.start_date">{{
                selectedProject.start_date ? selectedProject.start_date : '-'
              }}</time>
              &nbsp; {{ $t('projectPage.endDateField') }}:
              <time :datetime="selectedProject.end_date">{{
                selectedProject.end_date ? selectedProject.end_date : '-'
              }}</time>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container columns is-10">
      <div class="section">
        <h1 class="title is-1">Create a project to get started</h1>
      </div>
    </div> -->
  </div>
</template>
