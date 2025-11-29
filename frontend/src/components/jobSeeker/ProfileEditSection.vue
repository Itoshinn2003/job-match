<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { nameValidate } from '@/composables/validate'
import FormInput from '@/commons/FormInput.vue'
import FormSelect from '@/commons/FormSelect.vue'
import FormTextArea from '@/commons/FormTextarea.vue'
const props = defineProps<{
  userData: JobSeekerProfileResponse | null
  jobTypes: JobTypeResponse | null
  prefectures: PrefectureResponse | null
}>()
const emits = defineEmits(['submit'])
const userState = ref({}) as Ref<JobSeekerProfileState>

function onSubmit() {
  emits('submit', userState.value)
}
const isFirstNameValid = computed(() => {
  return nameValidate(userState.value.first_name)
})
const isLastNameValid = computed(() => {
  return nameValidate(userState.value.last_name)
})
watch(
  () => props.userData,
  (data) => {
    if (!data) return
    userState.value = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      birth_date: data.birth_date,
      self_introduction: data.self_introduction,
      selectedPrefectureId: data.prefecture?.id,
      selectedJobTypeIds: data.job_types.map((job_type) => job_type.id),
    }
  },
)
</script>

<template>
  <section class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-light">
        <h2 class="mb-0">プロフィール編集</h2>
      </div>
      <div class="card-body">
        <form class="row g-3" @submit.prevent="onSubmit()">
          <FormInput
            placeHolder="山田"
            labelFor="last_name"
            labelTitle="名前（姓）"
            type="text"
            v-model:text="userState.last_name"
            :isValid="isLastNameValid"
            errorMessage="使用できない文字が含まれています"
          ></FormInput>
          <FormInput
            placeHolder="太郎"
            labelFor="first_name"
            f
            labelTitle="名前（名）"
            type="text"
            v-model:text="userState.first_name"
            :isValid="isFirstNameValid"
            errorMessage="使用できない文字が含まれています"
          ></FormInput>

          <FormInput
            placeHolder="生年月日"
            labelFor="birth_date"
            labelTitle="生年月日"
            type="date"
            v-model:text="userState.birth_date"
          ></FormInput>

          <FormSelect
            labelFor="prefecture"
            :options="prefectures"
            labelTitle="希望勤務地"
            v-model:selected="userState.selectedPrefectureId"
            :multiple="false"
          ></FormSelect>

          <FormSelect
            labelFor="gender"
            :options="[
              { id: 'male', name: '男性' },
              { id: 'female', name: '女性' },
            ]"
            labelTitle="性別"
            v-model:selected="userState.gender"
            :multiple="false"
          ></FormSelect>

          <FormSelect
            labelFor="job_type"
            :options="jobTypes"
            labelTitle="希望職"
            v-model:selected="userState.selectedJobTypeIds"
            :multiple="true"
          ></FormSelect>

          <FormTextArea
            labelFor="selfIntro"
            labelTitle="自己PR"
            :rows="4"
            v-model:text="userState.self_introduction"
            placeholder="接客とチームマネジメントの経験が豊富で..."
          ></FormTextArea>

          <div class="col-12 text-end">
            <button type="submit" class="btn btn-primary">更新する</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
