import axios from 'axios'

export const create = async (registration: { email: String; password: String }) => {
  console.log('s')
  const response = await axios.post('http://localhost:3001/api/jobseekers', { registration })
  return response.data as { id: number; message: string }
}
