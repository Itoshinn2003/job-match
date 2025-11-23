type JobType = {
  id: number
  name: string
}

type JobSeekerProfileState = {
  id?: number
  first_name?: string
  last_name?: string
  gender?: string
  birth_date?: string
  self_introduction?: string
  selectedPrefectureId?: number
  selectedJobTypeIds?: number[]
}
