<script setup lang="ts">
import FormInput from '@/commons/FormInput.vue'
import { ref, computed } from 'vue'
import { emailValidate } from '@/composables/validate'

const emit = defineEmits(['submit'])
const props = defineProps({
  isSubmitting: Boolean,
  validationError: String,
})
const email = ref('')
const isEmailValid = computed(() => {
  return emailValidate(email.value)
})
function onSubmit() {
  emit('submit', { email: email.value })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="p-5">
    <h1 class="mb-3">パスワードを忘れた方へ</h1>
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
      v-model:text="email"
    ></FormInput>
    <button
      type="submit"
      :disabled="!isEmailValid || props.isSubmitting"
      class="btn btn-primary mx-auto"
    >
      {{ props.isSubmitting ? '送信中' : '送信' }}
    </button>
  </form>
</template>
