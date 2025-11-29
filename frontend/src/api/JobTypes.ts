import axios from 'axios'

export const index = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/job_types`)
  return response.data.job_types as JobTypeResponse
}
