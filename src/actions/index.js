export const LIST_POSTS = 'LIST_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const PINNED_POST = 'PINNED_POST'

// action creators

export function listPosts (posts = {}) {
	return {
		type: LIST_POSTS,
		posts
	}
}

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