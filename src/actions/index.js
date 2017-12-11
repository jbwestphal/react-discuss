
import * as ReadAPI from '../ReadableAPI'
export const LIST_POSTS = 'LIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const PINNED_POST = 'PINNED_POST'
export const VOTE_POST = 'VOTE_POST'

// action creators

// export function recievePosts (posts) {
// 	return {
// 		type: LIST_POSTS,
// 		posts
// 	}
// }

export const recievePosts = (posts = {}) => ({
  type: LIST_POSTS,
  posts
});

export const listAllPosts = (posts) => dispatch => (
  ReadAPI
		.getPosts()
		.then(posts => {
			dispatch(recievePosts(posts))
		})
);

export const recieveVote = ({ result, id, voteScore }) => ({
  type: VOTE_POST,
  id,
	voteScore
});

export const actionDispatchVote = ({postId, vote}) => dispatch => (
  ReadAPI
		.voteOnPost(postId, vote)
		.then(result => {
			dispatch(recieveVote(result, postId, vote))
		})
);

export function addPost ({ title, body, author }) {
	return {
		type: ADD_POST,
		title,
		body,
		author,
	}
}

export function removePost ({ id }) {
	return {
		type: REMOVE_POST,
		id,
	}
}

export function pinnedPost ({ id }) {
	return {
		type: PINNED_POST,
		id,
	}
}