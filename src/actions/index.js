export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

// action creators
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