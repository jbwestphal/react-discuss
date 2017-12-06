import { combineReducers } from 'redux'

import {
    // ADD_POST,
    // REMOVE_POST
    PINNED_POST,
    LIST_POSTS
} from '../actions'

function posts (state = {}, action) {
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
      const { posts } = action
      return {
        ...state,
        posts
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