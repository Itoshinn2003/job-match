<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import ResetPasswordForm from '@/components/form/ResetPasswordForm.vue'
import { resetPassword } from '@/api/JobSeeker'
import { useRouter, useRoute } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const jobseekerAuth = useJobSeekerAuthStore()
async function onSubmit(formData: { password: string; password_confirmation: string }) {
  isSubmitting.value = true
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
        headers: {
          accessToken: accessToken,
          client: client,
          uid: uid,
        },
      },
    )
    router.push({ name: 'signinJobSeeker' })
  } catch {
    router.push({ name: 'SigninJobSeeker' })
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <Header></Header>
  <ResetPasswordForm @submit="onSubmit" :isSubmitting="isSubmitting"></ResetPasswordForm>
</template>
