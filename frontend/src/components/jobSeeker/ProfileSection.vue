<script setup lang="ts">
import { getFullName } from '@/composables/commonUtil'

const props = defineProps<{
  userData: JobSeekerProfileResponse | null
}>()
</script>
<template>
  <section class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">プロフィール</h2>
        <button class="btn btn-secondary btn-sm">
          <router-link :to="{ name: 'JobSeekerProfileEdit' }" class="text-white">編集</router-link>
        </button>
      </div>
      <div class="card-body">
        <dl class="row mb-0">
          <dt class="col-sm-3">名前</dt>
          <dd class="col-sm-9">
            {{ getFullName(userData?.first_name, userData?.last_name) }}
          </dd>

          <dt class="col-sm-3">性別</dt>
          <dd class="col-sm-9">{{ userData?.gender ?? '未入力' }}</dd>

          <dt class="col-sm-3">年齢</dt>
          <dd class="col-sm-9">{{ userData?.birth_date ?? '未入力' }}歳</dd>

          <dt class="col-sm-3">希望勤務地</dt>
          <dd class="col-sm-9">{{ userData?.prefecture?.name ?? '未入力' }}</dd>

          <dt class="col-sm-3">希望職</dt>
          <dd class="col-sm-9">
            {{
              userData?.job_types.length
                ? userData?.job_types.map((job_type) => job_type.name).join(',')
                : '未入力'
            }}
          </dd>

          <dt class="col-sm-3">自己PR</dt>
          <dd class="col-sm-9">
            {{ userData?.self_introduction ?? '未入力' }}
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>
