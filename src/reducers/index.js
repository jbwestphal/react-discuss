import { combineReducers } from 'redux'

// import {
//     ADD_POST,
//     REMOVE_POST
// } from '../actions'

// creating a new reducer to handle the recipes
// that's way, it won't create duplicate data if
// the user choose the same meal more than 1 day
function posts (state = {}, action) {
  switch (action.type) {
    // case ADD_POST:

    //   // const {recipe} = action

    //   return {
    //     ...state,
    //     title,
    //     body,
    //     author
    //   }
    // case REMOVE_POST:
    //   return {
    //     ...state,
    //     id
    //  }
    default:
      return state
  }
}

// the reducer calendar
function comments (state = {}, action) {
  switch (action.type) {
    // case ADD_POST :

    //   // const {recipe} = action

    //   return {
    //     // returning the current state with spread syntax
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