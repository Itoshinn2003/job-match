<script setup lang="ts">
import { ref, computed } from 'vue'

const emits = defineEmits(['update:text'])
const props = defineProps<{
  placeHolder: string
  labelFor: string
  labelTitle: string
  type: string
  text: string | undefined
  isValid?: boolean
  errorMessage?: string
}>()
const touched = ref(false)

const value = computed({
  get() {
    return props.text
  },
  set(value) {
    emits('update:text', value)
    if (!touched.value) {
      touched.value = true
    }
  },
})
</script>

<template>
  <div class="mb-3">
    <label :for="props.labelFor" class="form-label">{{ props.labelTitle }}</label>
    <p v-show="!isValid && touched" class="text-danger">{{ errorMessage }}</p>
    <input
      :type="props.type"
      class="form-control w-50"
      :id="props.labelFor"
      :placeholder="props.placeHolder"
      v-model="value"
    />
  </div>
</template>
