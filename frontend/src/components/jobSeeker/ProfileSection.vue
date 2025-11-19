<script setup lang="ts">
const props = defineProps<{
  userData: JobSeekerProfileResponse | null
}>()
</script>
<template>
  <section class="container py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">プロフィール</h2>
      </div>
      <div class="card-body">
        <dl class="row mb-0">
          <dt class="col-sm-3">名前</dt>
          <dd class="col-sm-9">{{ userData?.first_name }} {{ userData?.last_name }}</dd>

          <dt class="col-sm-3">性別</dt>
          <dd class="col-sm-9">{{ userData?.gender }}</dd>

          <dt class="col-sm-3">年齢</dt>
          <dd class="col-sm-9">{{ userData?.birth_date }}歳</dd>

          <dt class="col-sm-3">出身</dt>
          <dd class="col-sm-9">まだダミー</dd>

          <dt class="col-sm-3">希望職</dt>
          <dd class="col-sm-9">まだダミー</dd>

          <dt class="col-sm-3">自己PR</dt>
          <dd class="col-sm-9">
            {{ userData?.self_introduction }}
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>
