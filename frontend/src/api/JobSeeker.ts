import axios from 'axios'

const REGISTRATION_ENDPOINT = 'http://localhost:3001/api/jobseekers'

type JobSeekerRegistration = {
  email: string
  password: string
  confirm_success_url: string
}

export const create = async (q: JobSeekerRegistration) => {
  const response = await axios.post(REGISTRATION_ENDPOINT, q)
  return response.data as { id: number; message: string }
}
