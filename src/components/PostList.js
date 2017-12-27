import React from 'react'
import PropTypes from 'prop-types'
import If from './If'
import Post from './Post'

class PostList extends React.Component {

  render() {

    // getting the store up-to-date
    // const listAllPosts = this.props.listPosts

    // // getting props to define the filter
    // const postCategory = this.props.filter

    // // conditional for list all posts or posts by categories
    // let listConditionalPosts = []

    // if(postCategory !== false) {
    //   listConditionalPosts = listAllPosts && listAllPosts.filter((post) => {
    //     return post.category === postCategory
    //   })
    // } else {
    //   listConditionalPosts = listAllPosts
    // }

    const { posts, voteOnPost, sortPost } = this.props

    return (
      <div className="row">
        <div className="col s12">
          <button className="btn" onClick={() => sortPost('SHOW_BY_DATE')}>Order By Date</button> &nbsp;
          <button className="btn" onClick={() => sortPost('SHOW_BY_VOTE')}>Order By VoteScore</button> &nbsp;
          <button className="btn" onClick={() => sortPost('SHOW_BY_COMMENTS')}>Order By Comments</button> &nbsp;
        </div>

        {/* {listConditionalPosts && listConditionalPosts.map((post, index) => ( */}
        {posts.map((post, index) => (
          <Post key={index} post={post} onClickVote={(vote) => voteOnPost({postId: post.id, vote: vote})} />
        ))}

        <If test={posts.length === 0}>
          <p>No posts found.</p>
        </If>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  })).isRequired,
  filter: PropTypes.string.isRequired,
  voteOnPost: PropTypes.func.isRequired,
  sortPost:  PropTypes.func.isRequired
}

export default PostList