export const emailValidate = (email: String) => {
  return email.match(/.+@.+\..+/)
}
export const passwordValidate = (password: String) => {
  return password.length >= 8 && password.length <= 20
}
