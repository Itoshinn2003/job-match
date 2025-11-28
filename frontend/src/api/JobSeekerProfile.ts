import axios from 'axios'
import { useJobSeekerAuthStore } from '@/stores/auth'
export const profile = async (params: JobSeekerAuthentication) => {
  const jobseekerAuth = useJobSeekerAuthStore()
  const headers = {
    'access-token': params.accessToken,
    client: params.client,
    uid: params.uid,
  }
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseeker_profiles/profile`,
    {
      headers,
      data: {},
    },
  )
  jobseekerAuth.setCredentials(response.headers)
  return response.data as JobSeekerProfileResponse
}

export const update = async (params: JobSeekerProfileState, headers: JobSeekerAuthentication) => {
  const jobseekerAuth = useJobSeekerAuthStore()
  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseeker_profiles/${params.id}`,
    params,
    {
      headers: {
        'access-token': headers.accessToken,
        client: headers.client,
        uid: headers.uid,
      },
    },
  )
  jobseekerAuth.setCredentials(response.headers)
  return response.data as JobSeekerProfileResponse
}
