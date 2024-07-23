<script setup>
import { ref } from 'vue'
import { supabase, supabaseSession } from '@/lib/supabaseClient'

const emit = defineEmits(['projectCreated'])

let modalClass = ref('modal')
let project = ref({})
let name = ref('name')
let code = ref('code')
let start_date = ref('start_date')
let end_date = ref('end_date')

function showModal() {
  modalClass.value = 'modal is-active'
}

function closeModal() {
  modalClass.value = 'modal'
}

function validate() {
  let hasError = false

  console.log('name.value: ', name.value.nextSibling)

  if (!project.value.name) {
    hasError = true
    name.value.classList.add('is-danger')
    name.value.nextSibling.classList.remove('is-hidden')
  } else {
    name.value.classList.remove('is-danger')
    name.value.nextSibling.classList.add('is-hidden')
  }

  if (!project.value.code) {
    hasError = true
    code.value.classList.add('is-danger')
    code.value.nextSibling.classList.remove('is-hidden')
  } else {
    code.value.classList.remove('is-danger')
    code.value.nextSibling.classList.add('is-hidden')
  }

  return hasError
}

async function saveNewProject() {
  let hasError = validate()

  if (hasError) {
    return
  }
  let profileQuery = await supabase
    .from('User')
    .select('id,tenant_id')
    .eq('supabase_id', `${supabaseSession.session?.user?.id}`)
  console.log('profile query: ', profileQuery)
  let tenant_id = profileQuery.data[0]?.tenant_id ?? ''

  console.log('supabaseSession: ', supabaseSession)
  const { error } = await supabase.from('Project').insert({
    tenant_id: tenant_id,
    name: project.value.name,
    code: project.value.code,
    start_date: project.value.start_date,
    end_date: project.value.end_date
  })

  // TODO: Manage errors
  if (error) {
    console.log('error: ', error)
    return
  }
  closeModal()
  emit('projectCreated')
}

defineExpose({
  showModal
})
</script>

<template>
  <div :class="modalClass">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="card has-background p-6">
        <h1 class="title is-3 px-6 pt-1 pb-6 has-text-centered">
          {{ $t('projectPage.newProjectTitle') }}
        </h1>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label class="label">{{ $t('projectPage.nameField') }}</label>
              <input class="input" ref="name" v-model="project.name" maxlength="255" />
              <p class="help is-danger is-hidden">{{ $t('projectPage.fieldIsRequired') }}</p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">{{ $t('projectPage.codeField') }}</label>
              <input class="input" ref="code" v-model="project.code" maxlength="255" />
              <p class="help is-danger is-hidden">{{ $t('projectPage.fieldIsRequired') }}</p>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">{{ $t('projectPage.startDateField') }}</label>
              <input class="input" type="date" ref="start_date" v-model="project.start_date" />
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label class="label">{{ $t('projectPage.endDateField') }}</label>
              <input class="input" type="date" ref="end_date" v-model="project.end_date" />
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column has-text-centered mt-6">
            <button
              class="button"
              :arial-label="$t('projectPage.cancelButton')"
              @click="closeModal"
            >
              {{ $t('projectPage.cancelButton') }}
            </button>
            <button
              class="button is-primary ml-3"
              :arial-label="$t('projectPage.saveButton')"
              @click="saveNewProject"
            >
              {{ $t('projectPage.saveButton') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      :arial-label="$t('projectPage.cancelButton')"
      @click="closeModal"
    ></button>
  </div>
</template>
