import axios from 'axios'

export const profile = async (params: JobSeekerAuthentication) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/jobseeker_profiles/profile`,
    {
      headers: {
        'access-token': params.accessToken,
        client: params.client,
        uid: params.uid,
      },
    },
  )
  return response.data as JobSeekerProfileResponse
}
