<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerProfileEditSection from '@/components/jobSeeker/ProfileEditSection.vue'
import { profile, update } from '@/api/JobSeekerProfile'
import { index as jobTypeIndex } from '@/api/JobTypes'
import { index as prefectureIndex } from '@/api/Prefectures'
import { useSubmitState } from '@/composables/submitState'
import { useRouter } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const router = useRouter()
const jobseekerAuth = useJobSeekerAuthStore()
const { isSubmitting, validationError, startSubmitting, finishSubmitting, setValidationError } =
  useSubmitState()
const userData = ref({}) as Ref<JobSeekerProfileResponse>
const jobTypes = ref(null) as Ref<JobTypeResponse | null>
const prefectures = ref(null) as Ref<PrefectureResponse | null>
async function fetchFormInfo() {
  profile({
    accessToken: jobseekerAuth.accessToken,
    client: jobseekerAuth.client,
    uid: jobseekerAuth.uid,
  }).then((response) => {
    userData.value = response
  })

  jobTypeIndex().then((response) => {
    jobTypes.value = response
  })
  prefectureIndex().then((response) => {
    prefectures.value = response
  })
}
fetchFormInfo()

async function onSubmit(userState: JobSeekerProfileState) {
  startSubmitting()
  try {
    const res = await update(userState, {
      accessToken: jobseekerAuth.accessToken,
      client: jobseekerAuth.client,
      uid: jobseekerAuth.uid,
    })
    router.push({ name: 'JobSeekerProfile' })
  } catch (error) {
  } finally {
    finishSubmitting()
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerProfileEditSection
    @submit="onSubmit"
    :userData="userData"
    :prefectures="prefectures"
    :jobTypes="jobTypes"
    :isSubmitting="isSubmitting"
    :validationError="validationError"
  ></JobSeekerProfileEditSection>
</template>
