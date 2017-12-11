import { combineReducers } from 'redux'

import {
    ADD_POST,
    // REMOVE_POST
    LIST_POSTS,
    VOTE_POST
} from '../actions'

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
      // const {id_post, vote} = action
      console.log(state.posts)

      return state.map(item =>
          (item.id === action.result.id)
            ? {...item, voteScore: action.result.voteScore}
            : item
      )

    // case DELETED:
    //     const { comment } = action;
    //     const { id, parentId } = comment;
    //     return {
    //       ...state,
    //       [parentId]: state[parentId].filter(i => i !== id),
    //     };
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