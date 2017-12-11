import { combineReducers } from 'redux'

import {
    // ADD_POST,
    // REMOVE_POST
    PINNED_POST,
    LIST_POSTS,
    VOTE_POST
} from '../actions'

function posts (state = {}, action) {

  const { posts, result, postId, voteScore } = action

  switch (action.type) {
    // case ADD_POST:

    // const { title, body, author } = action

    //   return {
    //     ...state, {
    //     title,
    //     body,
    //     author
    //   }
    //
    //   }
    // case REMOVE_POST:
    //   return {
    //     ...state,
    //     id
    //   }
    case LIST_POSTS:
      return {
        ...state,
        posts
      }

    case VOTE_POST:

      return {
        ...state,
      }

    case PINNED_POST:
      const { id } = action
      return {
        ...state,
        id
      }
    default:
      return state
  }
}

function comments (state = {}, action) {
  switch (action.type) {
    // case ADD_POST :

    //   // const {recipe} = action

    //   return {
    //     ...state,
    //     id
    //   }

    default:
      return state
  }
}

export default combineReducers({
  posts, comments,
})