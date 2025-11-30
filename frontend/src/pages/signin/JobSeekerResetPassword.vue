<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import ResetPasswordForm from '@/components/form/ResetPasswordForm.vue'
import { resetPassword } from '@/api/JobSeeker'
import { useRouter, useRoute } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'
import { useSubmitState } from '@/composables/submitState'

const route = useRoute()
const router = useRouter()
const { isSubmitting, startSubmitting, finishSubmitting } = useSubmitState()
const jobseekerAuth = useJobSeekerAuthStore()
async function onSubmit(formData: { password: string; password_confirmation: string }) {
  startSubmitting()
  try {
    const accessToken = route.query['access-token']
    const client = route.query.client
    const uid = route.query.uid
    const res = await resetPassword(
      {
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
      {
        accessToken: accessToken,
        client: client,
        uid: uid,
      },
    )
  } finally {
    finishSubmitting()
    router.push({ name: 'SignInJobSeeker' })
  }
}
</script>
<template>
  <Header></Header>
  <ResetPasswordForm @submit="onSubmit" :isSubmitting="isSubmitting"></ResetPasswordForm>
</template>
