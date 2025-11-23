<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
  labelFor: string
  labelTitle: string
  rows: number
  text: string | undefined
  placeholder: string
}>()
</script>
<template>
  <label :for="props.labelFor" class="form-label">{{ props.labelTitle }}</label>
  <textarea
    :id="props.labelFor"
    class="form-control"
    :rows="props.rows"
    :placeholder="props.placeholder"
  ></textarea>
</template>
