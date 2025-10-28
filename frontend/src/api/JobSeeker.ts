import axios from 'axios'

export const create = async (params: JobSeekerRegistration) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/jobseekers`, params)
  return response.data as { id: number; message: string }
}

export const signIn = async (params: JobSeekerSignIn) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseekers/sign_in`,
    params,
  )
  return response.data as { id: number; message: string }
}

export const resendEmail = async (params: JobSeekerConfirmation) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseekers/confirmation`,
    params,
  )
  return response.data as { id: number; message: string }
}
