<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import JobSeekerSignUpForm from '@/components/form/JobSeekerSignUp.vue'
import { create } from '@/api/JobSeeker'

function onSubmit(userData: { email: String; password: String }) {
  // async create(params: {
  //     email: userData.email,
  //     password: userData.password,
  // })
  console.log(userData)
}
</script>
<template>
  <Header></Header>
  <JobSeekerSignUpForm @submit="onSubmit"></JobSeekerSignUpForm>
</template>
