// Common functions

export function getRandomId() {
  let text = ""
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

export function convertTimeStamp(timestamp) {
  const date = new Date(timestamp*1000)
  const dateDay = date.getDate()
  const dateMonth = date.getMonth()+1
  const dateYear = date.getFullYear()

  return dateDay+'/'+dateMonth+'/'+dateYear
}