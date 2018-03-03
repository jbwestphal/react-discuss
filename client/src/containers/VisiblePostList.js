import { connect } from 'react-redux'
import { actionDispatchVote, actionDeletePost, setVisibilityFilter } from '../_actions'
import PostList from '../components/PostList'

const getSortedPosts = (posts, filter, category) => {
  switch (category) {
    case "SHOW_ALL":
      return [...posts].sort((a, b) => b[filter] - a[filter]);
    default:
      return posts
        .filter(post => post.category === category)
        .sort((a, b) => b[filter] - a[filter])
  }
}

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