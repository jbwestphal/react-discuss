import { combineReducers } from 'redux'

import {
    LIST_CATEGORIES,
    LIST_POSTS,
    ADD_POST,
    VOTE_POST,
    REMOVE_POST,
    LIST_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    VOTE_COMMENT,
    MINUS_COMMENT_COUNT,
    ADD_COMMENT_COUNT
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

    case LIST_POSTS:
      return posts

    case ADD_POST:
      return [
        ...state,
        action.post
      ]

    case VOTE_POST:
      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, voteScore: action.result.voteScore}
            : item
      )

    case REMOVE_POST:
      return state

    case ADD_COMMENT_COUNT:
      return state.map(item =>
          (item.id === action.result.parentId)
            ? {...item, commentCount: item.commentCount + 1}
            : item
      )

    case MINUS_COMMENT_COUNT:
      return state.map(item =>
          (item.id === action.result.parentId)
            ? {...item, commentCount: item.commentCount - 1}
            : item
      )

    default:
      return state
  }
}

function comments (state = [], action) {

  const { comments, comment, result } = action
  switch (action.type) {

    case LIST_COMMENTS:
      return comments

    case ADD_COMMENT:
      return [
        ...state,
        comment
      ]

    case REMOVE_COMMENT:
      return state.filter(item => (item.id !== result.id))

    case VOTE_COMMENT:
      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, voteScore: action.result.voteScore}
            : item
      )

    default:
      return state
  }
}

export default combineReducers({
  postCategories, posts, comments,
})