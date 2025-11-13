import { ref } from 'vue'

export function useSubmitState() {
  const isSubmitting = ref(false)
  const validationError = ref('')

  const startSubmitting = () => {
    isSubmitting.value = true
    validationError.value = ''
  }

  const finishSubmitting = () => {
    isSubmitting.value = false
  }

  const setValidationError = (error: any) => {
    validationError.value = error
  }

  return { isSubmitting, validationError, startSubmitting, finishSubmitting, setValidationError }
}
