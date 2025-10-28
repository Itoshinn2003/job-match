<script setup lang="ts">
import Header from '@/components/Header.vue'
import { resendEmail } from '@/api/JobSeeker'
import { useRoute } from 'vue-router'

const route = useRoute()

function onClick() {
  resendEmail({
    email: route.query.email,
    redirect_url: import.meta.env.VITE_CONFIRM_SUCCESS_URL,
  })
}
</script>
<template>
  <Header></Header>
  <h2 class="text-center text-success my-4">確認メールを送信しました</h2>
  <button class="btn btn-primary d-block mx-auto" @click="onClick">再送する</button>
</template>
