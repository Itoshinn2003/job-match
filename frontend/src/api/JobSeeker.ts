import axios from 'axios'
import { endpoints } from '@/router/devise'

export const create = async (params: JobSeekerRegistration) => {
  const response = await axios.post(endpoints.REGISTRATION_ENDPOINT, params)
  return response.data as { id: number; message: string }
}

export const signIn = async (params: JobSeekerSignIn) => {
  const response = await axios.post('http://localhost:3001/api/jobseekers/sign_in', params)
  return response.data as { id: number; message: string }
}

export const resendEmail = async (params: JobSeekerConfirmation) => {
  const response = await axios.post(endpoints.CONFIRMATION_ENDPOINT, params)
  return response.data as { id: number; message: string }
}
