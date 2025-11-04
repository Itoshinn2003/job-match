<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSign.vue'
import { create } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const validationError = ref('')
async function onSubmit(formData: JobSeekerFormData) {
  isSubmitting.value = true
  validationError.value = ''
  try {
    const res = await create({
      email: formData.email,
      password: formData.password,
      confirm_success_url: import.meta.env.VITE_CONFIRM_SUCCESS_URL,
    })
    router.push({ name: 'EmailSent', query: { email: formData.email } })
  } catch (error: any) {
    validationError.value = error.response.data.errors.full_messages
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm
    @submit="onSubmit"
    title="新規登録"
    :isSubmitting="isSubmitting"
    :validationError="validationError"
  >
    <router-link :to="{ name: 'SignInJobSeeker' }" class="btn"
      >ログインに移動</router-link
    ></JobSeekerSignUpForm
  >
</template>
