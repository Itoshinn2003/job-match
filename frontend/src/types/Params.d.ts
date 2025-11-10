type JobSeekerRegistration = {
  email: string
  password: string
  confirm_success_url: string
}
type JobSeekerSignIn = {
  email: string
  password: string
}
type JobSeekerConfirmation = {
  email: string
  redirect_url: string
}
type JobSeekerFormData = {
  email: string
  password: string
}
type JobSeekerResetPassword = {
  password: string
  password_confirmation: string
  reset_password_token: string
}
type JobSeekerResendPassword = {
  password: string
  password_confirmation: string
}

type JobSeekerAuthentication = {
  accessToken: any
  client: any
  uid: any
}
