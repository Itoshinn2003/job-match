// 生年月日から年齢表示
export const calculateAge = (birthDay: any) => {
  const today = new Date()
  let age = today.getFullYear() - birthDay.year
  const thisYearsBirthDay = new Date(today.getFullYear(), birthDay.month - 1, birthDay.date)
  if (today > thisYearsBirthDay) {
    age--
  }
  return age
}

export const getFullName = (firstName: string | undefined, lastName: string | undefined) => {
  if (firstName == undefined && lastName == undefined) {
    return '未入力'
  } else if (firstName == undefined) {
    return lastName
  } else {
    return firstName
  }
}
