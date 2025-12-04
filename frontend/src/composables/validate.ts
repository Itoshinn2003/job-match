export const emailValidate = (email: string) => {
  return !!email.match(/^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/)
}
export const passwordValidate = (password: string) => {
  return password.length >= 8 && password.length <= 20
}

export const nameValidate = (name?: string) => {
  return !!name?.match(/^[a-zA-Zぁ-んァ-ヶ一-龠々ー]+$/u)
}
