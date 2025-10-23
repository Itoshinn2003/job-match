<script setup lang="ts">
import FormInput from '@/commons/FormInput.vue'
import { ref, computed } from 'vue'
import { emailValidate, passwordValidate } from '@/composables/validate'

const emit = defineEmits(['submit'])

const formData = ref({
  email: '',
  password: '',
})
const isEmailValid = computed(() => {
  return emailValidate(formData.value.email)
})
const isPasswordValid = computed(() => {
  return passwordValidate(formData.value.password)
})

function onSubmit() {
  emit('submit', { email: formData.value.email, password: formData.value.password })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="p-5">
    <h1 class="mb-3">新規登録フォーム</h1>
    <FormInput
      placeHolder="example@gmail.com"
      labelFor="email"
      labelTitle="メールアドレス"
      type="email"
      :isValid="isEmailValid"
      errorMessage="正しいメールアドレス形式で入力してください"
      v-model:text="formData.email"
    ></FormInput>
    <FormInput
      placeHolder="パスワード"
      labelFor="password"
      labelTitle="パスワード"
      type="password"
      :isValid="isPasswordValid"
      errorMessage="8文字以上20文字以下で入力してください"
      v-model:text="formData.password"
    ></FormInput>

    <button
      type="submit"
      :disabled="!isEmailValid || !isPasswordValid"
      class="btn btn-primary mx-auto"
    >
      新規登録
    </button>
  </form>
</template>
