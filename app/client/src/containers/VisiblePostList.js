import { connect } from 'react-redux'
import { actionDispatchVote, actionDeletePost, setVisibilityFilter } from '../_actions'
import { getSortedPosts } from '../utils'
import PostList from '../components/PostList'

const mapStateToProps = state => ({
  posts: getSortedPosts(state.posts, state.visibilityFilter, state.activeCategory)
})

const mapDispatchToProps = dispatch => ({
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
  deletePost: (postId) => dispatch(actionDeletePost(postId)),
  sortPost: (filter) => dispatch(setVisibilityFilter(filter)),
})

const VisiblePostList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)

export default VisiblePostList