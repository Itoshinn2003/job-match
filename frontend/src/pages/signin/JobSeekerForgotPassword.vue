<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import ResetPasswordForm from '@/components/form/ForgotPasswordForm.vue'
import { resendResetPassword } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'
import { useJobSeekerAuthStore } from '@/stores/auth'

const router = useRouter()
const isSubmitting = ref(false)
const jobseekerAuth = useJobSeekerAuthStore()
async function onSubmit(formData: { email: string }) {
  isSubmitting.value = true
  try {
    const res = await resendResetPassword({
      email: formData.email,
      redirect_url: import.meta.env.VITE_RESET_PASSWORD_URL,
    })
  } catch {
    console.log('b')
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <Header></Header>
  <ResetPasswordForm @submit="onSubmit" :isSubmitting="isSubmitting"></ResetPasswordForm>
</template>
