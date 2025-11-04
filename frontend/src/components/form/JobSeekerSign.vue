<script setup lang="ts">
import FormInput from '@/commons/FormInput.vue'
import { ref, computed } from 'vue'
import { emailValidate, passwordValidate } from '@/composables/validate'

const emit = defineEmits(['submit'])
const props = defineProps({
  title: String,
  isSubmitting: Boolean,
  validationError: String,
})
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
    <h1 class="mb-3">{{ props.title }}フォーム</h1>
    <ul>
      <li v-for="error in validationError" class="text-danger list-unstyled">
        {{ error }}
      </li>
    </ul>
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
      :disabled="!isEmailValid || !isPasswordValid || props.isSubmitting"
      class="btn btn-primary mx-auto"
    >
      {{ props.isSubmitting ? '送信中' : props.title }}
    </button>
    <br></br>
    <slot />
  </form>
</template>
