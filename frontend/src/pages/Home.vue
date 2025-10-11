<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="container min-vh-100 d-flex flex-column justify-content-between">
    <Header></Header>
    <main class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <p class="lead text-center mb-4">ようこそ！</p>
      <RouterLink to="/signup/job_seeker"
        ><button class="btn px-5 btn-primary btn-lg">新規登録する</button></RouterLink
      >
    </main>
    <footer class="py-3 border-top text-center text-muted">
      <p class="mb-0">© 2025 JOB-MATCH</p>
    </footer>
  </div>
</template>
