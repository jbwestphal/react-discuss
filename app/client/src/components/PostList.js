import React from 'react'
import PropTypes from 'prop-types'
import If from './If'
import Post from './Post'

const PostList = (props) => {

  const { posts, voteOnPost, deletePost, sortPost } = props

  return (
    <div className="row">
      <div className="col s12">
        <button className="btn" onClick={() => sortPost('timestamp')}>Order By Date</button> &nbsp;
        <button className="btn" onClick={() => sortPost('voteScore')}>Order By VoteScore</button> &nbsp;
        <button className="btn" onClick={() => sortPost('commentCount')}>Order By Comments</button> &nbsp;
      </div>

      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          width="l6"
          onClickVote={(vote) => voteOnPost({postId: post.id, vote: vote})}
          onDeletePost={() => deletePost(post.id)} />
      ))}

      <If test={posts.length === 0}>
        <p>No posts found.</p>
      </If>
    </div>
  )
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
  voteOnPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  sortPost:  PropTypes.func.isRequired
}

export default PostList