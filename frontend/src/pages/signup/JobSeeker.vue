<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSign.vue'
import { useSubmitState } from '@/composables/submitState'
import { create } from '@/api/JobSeeker'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isSubmitting, validationError, startSubmitting, finishSubmitting, setValidationError } =
  useSubmitState()
async function onSubmit(formData: JobSeekerFormData) {
  startSubmitting()
  try {
    const res = await create({
      email: formData.email,
      password: formData.password,
      confirm_success_url: import.meta.env.VITE_CONFIRM_SUCCESS_URL,
    })
    router.push({ name: 'EmailSent', query: { email: formData.email } })
  } catch (error: any) {
    setValidationError(error.response.data.errors.full_messages)
  } finally {
    finishSubmitting()
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
