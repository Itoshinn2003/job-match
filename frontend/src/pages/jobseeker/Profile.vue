<script setup lang="ts">
import { ref, Ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerProfileSection from '@/components/jobSeeker/ProfileSection.vue'
import { profile } from '@/api/JobSeekerProfile'
import { useRouter } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const router = useRouter()
const jobseekerAuth = useJobSeekerAuthStore()
const userData = ref(null) as Ref<JobSeekerProfileResponse | null>
async function fetchProfile() {
  profile({
    accessToken: jobseekerAuth.accessToken,
    client: jobseekerAuth.client,
    uid: jobseekerAuth.uid,
  }).then((response) => {
    userData.value = response
  })
}
fetchProfile()
</script>
<template>
  <Header></Header>
  <JobSeekerProfileSection :userData="userData"></JobSeekerProfileSection>
</template>
