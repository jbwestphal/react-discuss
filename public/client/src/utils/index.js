export const getRandomId = () => {
  let text = ""
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

export const convertTimeStamp = (timestamp) => {
  const timeStamp = parseInt(timestamp, 0)
  const date = new Date(timeStamp)
  const dateDay = date.getDate()
  const dateMonth = date.getMonth()+1
  const dateYear = date.getFullYear()

  return dateDay+'/'+dateMonth+'/'+dateYear
}

export const getSortedPosts = (posts, filter, category) => {
  switch (category) {
    case "SHOW_ALL":
      return [...posts].sort((a, b) => b[filter] - a[filter]);
    default:
      return posts
        .filter(post => post.category === category)
        .sort((a, b) => b[filter] - a[filter])
  }
}