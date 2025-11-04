<script setup lang="ts">
import FormInput from '@/commons/FormInput.vue'
import { ref, computed } from 'vue'
import { passwordValidate } from '@/composables/validate'

const emit = defineEmits(['submit'])
const props = defineProps({
  isSubmitting: Boolean,
  validationError: String,
})
const formData = ref({
  password: '',
  password_confirmation: '',
})
const isPasswordValid = computed(() => {
  return passwordValidate(formData.value.password)
})
const isPasswordConfirmationValid = computed(() => {
  return passwordValidate(formData.value.password_confirmation)
})
function onSubmit() {
  emit('submit', {
    password: formData.value.password,
    password_confirmation: formData.value.password_confirmation,
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="p-5">
    <h1 class="mb-3">パスワード再設定</h1>
    <ul>
      <li v-for="error in validationError" class="text-danger list-unstyled">
        {{ error }}
      </li>
    </ul>
    <FormInput
      placeHolder="パスワード"
      labelFor="password"
      labelTitle="パスワード"
      type="password"
      :isValid="isPasswordValid"
      errorMessage="正しいパスワード形式で入力してください"
      v-model:text="formData.password"
    ></FormInput>
    <FormInput
      placeHolder="パスワード"
      labelFor="password"
      labelTitle="パスワード再入力"
      type="password"
      :isValid="isPasswordConfirmationValid"
      errorMessage="正しいパスワード形式で入力してください"
      v-model:text="formData.password_confirmation"
    ></FormInput>
    <button
      type="submit"
      :disabled="!isPasswordValid || !isPasswordConfirmationValid || props.isSubmitting"
      class="btn btn-primary mx-auto"
    >
      {{ props.isSubmitting ? '送信中' : '送信' }}
    </button>
  </form>
</template>
