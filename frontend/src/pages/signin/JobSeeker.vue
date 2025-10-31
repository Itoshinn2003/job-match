<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSignUp.vue'
import { signIn } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

async function onSubmit(formData: JobSeekerFormData) {
  isSubmitting.value = true
  try {
    await signIn({
      email: formData.email,
      password: formData.password,
    })
  } catch {
    console.log('a')
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm
    @submit="onSubmit"
    title="ログイン"
    :isSubmitting="isSubmitting"
  ></JobSeekerSignUpForm>
</template>
