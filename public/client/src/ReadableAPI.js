let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPosts = () =>
  fetch(`/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostDetail = (postId) =>
  fetch(`/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const removePost = (postId) =>
  fetch(`/posts/${postId}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data)

export const createPost = (post) =>
  fetch(`/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post),
  }).then(res => res.json())
    .then(data => data)

export const editPost = (postId, body) =>
  fetch(`/posts/${postId}`, {
    method: 'PUT',
    headers : {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then(data => data)

export const voteOnPost = (postId, vote) =>
  fetch(`/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
    .then(data => data)

export const getCommentsByPost = (postId) =>
  fetch(`/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const createComment = (body) =>
  fetch(`/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const editComment = (commentId, body) =>
  fetch(`/comments/${commentId}`, {
    method: 'PUT',
    headers : {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const getCommentSingle = (id) =>
  fetch(`/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const voteOnComment = (commentId, vote) =>
  fetch(`/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
    .then(data => data)

export const removeComment = (commentId) =>
  fetch(`/comments/${commentId}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data)

export const getCategories = () =>
  fetch(`/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCategoriesByPosts = (categoryId) =>
  fetch(`/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)