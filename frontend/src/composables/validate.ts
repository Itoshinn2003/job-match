export const emailValidate = (email: string) => {
  return !!email.match(/.+@.+\..+/)
}
export const passwordValidate = (password: string) => {
  return password.length >= 8 && password.length <= 20
}
