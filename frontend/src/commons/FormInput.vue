<script setup lang="ts">
import { ref, computed } from 'vue'

const emits = defineEmits(['update:text'])
const props = defineProps({
  placeHolder: {
    type: String,
    required: true,
  },
  labelFor: {
    type: String,
    required: true,
  },
  labelTitle: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
})
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
  <div class="mb-5">
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
