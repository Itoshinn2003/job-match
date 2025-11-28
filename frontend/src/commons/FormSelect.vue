<script setup lang="ts">
import { ref, computed } from 'vue'
const emits = defineEmits(['update:selected'])
const props = defineProps<{
  labelFor: string
  labelTitle: string
  options: any
  selected?: number | number[] | null
  multiple: boolean
}>()

const touched = ref(false)

const value = computed({
  get() {
    return props.selected
  },
  set(value) {
    emits('update:selected', value)
    if (!touched.value) {
      touched.value = true
    }
  },
})
</script>

<template>
  <div class="mb-3">
    <label :for="props.labelFor" class="form-label">{{ props.labelTitle }}</label>
    <select class="form-select" :id="props.labelFor" :multiple="props.multiple">
      <option v-for="option in props.options" :value="option.id">{{ option.name }}</option>
    </select>
  </div>
</template>
