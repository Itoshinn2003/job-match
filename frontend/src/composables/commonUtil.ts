export const calculateAge = (birthDay: any) => {
  if (!birthDay) {
    return '未入力'
  }
  const today = new Date()
  const birthday = new Date(birthDay)
  let age = today.getFullYear() - birthday.getFullYear()

  const hasBirthdayPassed =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())

  if (!hasBirthdayPassed) {
    age--
  }
  return `${age}歳`
}

export const getFullName = (firstName: string | undefined, lastName: string | undefined) => {
  if (!firstName && !lastName) {
    return '未入力'
  } else {
    return `${lastName ?? ''}${firstName ?? ''}`
  }
}
