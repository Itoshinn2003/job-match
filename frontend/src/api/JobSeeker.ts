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
  return response
}

export const resendEmail = async (params: JobSeekerConfirmation) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseekers/confirmation`,
    params,
  )
  return response.data as { id: number; message: string }
}

export const resendResetPassword = async (params: JobSeekerConfirmation) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseekers/password`,
    params,
  )
  return response.data as { id: number; message: string }
}

export const resetPassword = async (
  params: { password: string; password_confirmation: string },
  headers: { headers: { accessToken: any; client: any; uid: any } },
) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseekers/password`,
    params,
    {
      headers: {
        'access-token': headers.headers.accessToken,
        client: headers.headers.client,
        uid: headers.headers.uid,
      },
    },
  )
  return response.data as { id: number; message: string }
}
