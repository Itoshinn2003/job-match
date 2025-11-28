import axios from 'axios'

export const index = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/prefectures`)
  return response.data as PrefectureResponse
}
