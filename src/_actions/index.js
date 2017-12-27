import * as ReadAPI from '../ReadableAPI'

// categories actions
export const LIST_CATEGORIES = 'LIST_CATEGORIES'

// posts actions
export const LIST_POSTS = 'LIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'
export const SORT_POSTS = 'SORT_POSTS'

// comments actions
export const LIST_COMMENTS = 'LIST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT_COUNT = 'ADD_COMMENT_COUNT'
export const MINUS_COMMENT_COUNT = 'MINUS_COMMENT_COUNT'

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/* ACTIONS CREATORS */

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

// list categories
export const recieveCategs = (categories) => ({
  type: LIST_CATEGORIES,
  categories
})

export const listAllCategories = () => dispatch => (
  ReadAPI
		.getCategories()
		.then(result => {
			dispatch(recieveCategs(result))
		})
)

// list posts
export const recievePosts = (posts) => ({
  type: LIST_POSTS,
  posts
})

export const listAllPosts = () => dispatch => (
  ReadAPI
		.getPosts()
		.then(result => {
			dispatch(recievePosts(result))
		})
)

// recieve votes for posts
export const recieveVote = (result) => ({
  type: VOTE_POST,
  result
})

export const actionDispatchVote = ({postId, vote}) => dispatch => (
  ReadAPI
		.voteOnPost(postId, vote)
		.then(result => {
			dispatch(recieveVote(result))
		})
)

// add posts
export const recievePostAdded = (post) => ({
  type: ADD_POST,
  post
})

export const actionAddPost = (post) => dispatch => (
  ReadAPI
		.createPost(post)
		.then(result => {
			dispatch(recievePostAdded(result))
		})
)

// edit post
export const recievePostEdited = (result) => ({
  type: EDIT_POST,
  result
})

export const actionEditPost = (postId, post) => dispatch => (
  ReadAPI
		.editPost(postId, post)
		.then(result => {
			dispatch(recievePostEdited(result))
		})
)

// remove post
export const recievePostDeleted = (result) => ({
  type: REMOVE_POST,
  result
})

export const actionDeletePost = (postId) => dispatch => (
  ReadAPI
		.removePost(postId)
		.then(result => {
			dispatch(recievePostDeleted(result))
		})
)


// sort posts
export const actionSortPosts = (sortKey) => ({
  type: SORT_POSTS,
  sortKey
})


// list comments
export const recieveComments = (comments) => ({
  type: LIST_COMMENTS,
  comments
})

export const actionListComments = (postId) => dispatch => (
  ReadAPI
		.getCommentsByPost(postId)
		.then(result => {
			dispatch(recieveComments(result))
		})
)

// add comments
export const recieveCommentAdded = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const recieveCommentCountPostAdd = (result) => ({
  type: ADD_COMMENT_COUNT,
  result
})

export const actionAddComment = (comment) => dispatch => (
  ReadAPI
		.createComment(comment)
		.then(result => {
			dispatch(recieveCommentAdded(result))
			dispatch(recieveCommentCountPostAdd(result))
		})
)

// edit comments
export const recieveCommentEdited = (result) => ({
  type: EDIT_COMMENT,
  result
})

export const actionEditComment = (commentId, comment) => dispatch => (
  ReadAPI
		.editComment(commentId, comment)
		.then(result => {
			dispatch(recieveCommentEdited(result))
		})
)

// remove comment
export const recieveCommentDeleted = (result) => ({
  type: REMOVE_COMMENT,
  result
})

export const recieveCommentCountPostMinus = (result) => ({
  type: MINUS_COMMENT_COUNT,
  result
})

export const actionDeleteComment = (commentId) => dispatch => (
  ReadAPI
		.removeComment(commentId)
		.then(result => {
			dispatch(recieveCommentDeleted(result))
			dispatch(recieveCommentCountPostMinus(result))
		})
)

// recieve votes for comments
export const recieveVoteComment = (result) => ({
  type: VOTE_COMMENT,
  result
})

export const actionDispatchVoteComment = ({commentId, vote}) => dispatch => (
  ReadAPI
		.voteOnComment(commentId, vote)
		.then(result => {
			dispatch(recieveVoteComment(result))
		})
)