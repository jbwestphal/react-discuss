
import * as ReadAPI from '../ReadableAPI'
export const LIST_CATEGORIES = 'LIST_CATEGORIES'
export const LIST_POSTS = 'LIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'

// list categories
export const recieveCategs = (categories) => ({
  type: LIST_CATEGORIES,
  categories
});

export const listAllCategories = () => dispatch => (
  ReadAPI
		.getCategories()
		.then(result => {
			dispatch(recieveCategs(result))
		})
);

// list posts
export const recievePosts = (posts) => ({
  type: LIST_POSTS,
  posts
});

export const listAllPosts = () => dispatch => (
  ReadAPI
		.getPosts()
		.then(result => {
			dispatch(recievePosts(result))
		})
);

// recieve votes for posts
export const recieveVote = (result) => ({
  type: VOTE_POST,
  result
});

export const actionDispatchVote = ({postId, vote}) => dispatch => (
  ReadAPI
		.voteOnPost(postId, vote)
		.then(result => {
			dispatch(recieveVote(result))
		})
);

// add posts
export const recievePostAdded = (post) => ({
  type: ADD_POST,
  post
});

export const actionAddPost = (post) => dispatch => (
  ReadAPI
		.createPost(post)
		.then(result => {
			console.log(result)
			dispatch(recievePostAdded(result))
		})
);

// remove post
export const recievePostDeleted = (result) => ({
  type: REMOVE_POST,
  result
});

export const actionDeletePost = (postId) => dispatch => (
  ReadAPI
		.removePost(postId)
		.then(result => {
			dispatch(recievePostDeleted(result))
		})
);