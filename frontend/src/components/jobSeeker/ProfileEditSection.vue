<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import FormInput from '@/commons/FormInput.vue'
import FormSelect from '@/commons/FormSelect.vue'
import FormTextArea from '@/commons/FormTextarea.vue'
const props = defineProps<{
  userData: JobSeekerProfileResponse | null
  jobTypes: JobTypeResponse | null
  prefectures: PrefectureResponse | null
}>()
const userState = ref({}) as Ref<JobSeekerProfileState>

function useSubmit() {
  console.log(userState)
}
onMounted(() => {
  userState.value = {
    id: props.userData?.id,
    first_name: props.userData?.first_name,
    last_name: props.userData?.last_name,
    gender: props.userData?.gender,
    birth_date: props.userData?.birth_date,
    self_introduction: props.userData?.self_introduction,
    selectedPrefectureId: props.userData?.prefecture.id,
    selectedJobTypeIds: props.userData?.job_types.map((job_type) => job_type.id),
  }
})
</script>

<template>
  <section class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-light">
        <h2 class="mb-0">プロフィール編集</h2>
      </div>
      <div class="card-body">
        <form class="row g-3" @submit="useSubmit()">
          <FormInput
            placeHolder="山田"
            labelFor="last_name"
            labelTitle="名前（姓）"
            type="text"
            v-model:text="userState.last_name"
          ></FormInput>
          <FormInput
            placeHolder="太郎"
            labelFor="first_name"
            labelTitle="名前（名）"
            type="text"
            v-model:text="userState.first_name"
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
