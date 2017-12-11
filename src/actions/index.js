
import * as ReadAPI from '../ReadableAPI'
export const LIST_POSTS = 'LIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'

export const recievePosts = (posts) => ({
  type: LIST_POSTS,
  posts
});

export const listAllPosts = (posts) => dispatch => (
  ReadAPI
		.getPosts()
		.then(result => {
			dispatch(recievePosts(result))
		})
);

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


export function removePost ({ id }) {
	return {
		type: REMOVE_POST,
		id,
	}
}