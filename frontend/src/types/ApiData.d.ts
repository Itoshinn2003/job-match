type JobSeekerConfirmationResponse = {
  message: string
  success: boolean
}

type JobSeekerProfileResponse = {
  id: number
  first_name: string
  last_name: string
  gender: string
  birth_date: string
  self_introduction: string
  prefecture: {
    id: number
    name: string
  }
  job_types: {
    id: number
    name: string
  }[]
}

type JobTypeResponse = {
  id: number
  name: string
}[]

type PrefectureResponse = {
  id: number
  name: string
}[]
