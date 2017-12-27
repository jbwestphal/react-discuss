import { combineReducers } from 'redux'

import {
    LIST_CATEGORIES,
    LIST_POSTS,
    ADD_POST,
    EDIT_POST,
    VOTE_POST,
    REMOVE_POST,
    LIST_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,
    VOTE_COMMENT,
    MINUS_COMMENT_COUNT,
    ADD_COMMENT_COUNT,
    EDIT_COMMENT,
    SORT_POSTS
} from '../_actions'

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
      return (
        posts.sort(function(a, b){
          return a.voteScore - b.voteScore
        })
      )

    case ADD_POST:
      return [
        ...state,
        action.post
      ]

    case EDIT_POST:
      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, body: action.result.body, title: action.result.title, timestamp: action.result.timestamp}
            : item
      )

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

    case SORT_POSTS:
      return (action.sortKey === 'byDate') ?
        [...state].sort((a, b) => {
          if(a.timestamp > b.timestamp) return -1
          else if (a.timestamp < b.timestamp) return 1
          else return 0
        }) :
        [...state].sort((a, b) => {
          if(a.voteScore > b.voteScore) return -1
          else if (a.voteScore < b.voteScore) return 1
          else return 0
        })


    default:
      return state
  }
}

function visibilityFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
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

    case EDIT_COMMENT:
      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, body: action.result.body, timestamp: action.result.timestamp}
            : item
      )

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
  postCategories, posts, comments, visibilityFilter
})