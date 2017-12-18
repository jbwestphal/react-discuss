import { combineReducers } from 'redux'

import {
    LIST_CATEGORIES,
    LIST_POSTS,
    ADD_POST,
    VOTE_POST,
    REMOVE_POST
} from '../actions'

function postCategories (state = [], action) {
  switch (action.type) {
    case LIST_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function posts (state = [], action) {

  const { posts } = action

  switch (action.type) {

    case ADD_POST:
      return [
        ...state,
        action.post
      ]

    case LIST_POSTS:
      return posts

    case VOTE_POST:
      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, voteScore: action.result.voteScore}
            : item
      )

    case REMOVE_POST:
      return posts

    // case SAVED:
    //   const { comment } = action;
    //   const { parentId } = comment;

    //   return {
    //     ...state,
    //     [parentId]: [...state[parentId] || [], comment.id],
    //   };

    default:
      return state
  }
}

function comments (state = [], action) {
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
  postCategories, posts, comments,
})