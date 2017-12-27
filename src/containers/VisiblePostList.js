import { connect } from 'react-redux'
import { actionDispatchVote, setVisibilityFilter } from '../_actions'
import PostList from '../components/PostList'

const getVisiblePosts = (posts, filter) => {
  switch (filter) {
    case 'SHOW_BY_VOTE':
      return [...posts].sort((a, b) => {
          if(a.voteScore > b.voteScore) return -1
          else if (a.voteScore < b.voteScore) return 1
          else return 0
        })
    case 'SHOW_BY_DATE':
      return [...posts].sort((a, b) => {
          if(a.timestamp > b.timestamp) return -1
          else if (a.timestamp < b.timestamp) return 1
          else return 0
        })
    case 'SHOW_BY_COMMENTS':
      return [...posts].sort((a, b) => {
          if(a.commentCount > b.commentCount) return -1
          else if (a.commentCount < b.commentCount) return 1
          else return 0
        })
    default:
      return posts
  }
}

const mapStateToProps = state => ({
  posts: getVisiblePosts(state.posts, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
  sortPost: (filter) => dispatch(setVisibilityFilter(filter)),
})

const VisiblePostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

export default VisiblePostList