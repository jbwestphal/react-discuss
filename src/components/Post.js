import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { convertTimeStamp } from '../utils'
import If from './If'

const Post = ({ onClickVote, onDeletePost, post, width, btnDetail, truncate }) => {

  return (
    <div className={`col s12 ${width}`}>
      <div className="card grey lighten-4">
        <div className="card-content">
          <span className="card-title">{ post.title } &nbsp; <small><strong>Categoria:</strong> { post.category }</small></span>
          <p className={`grey-text ${(truncate === undefined) ? 'truncate' : '' }`}>{ post.body }</p><br/>
          <p>
            <strong>Author:</strong> { post.author } &nbsp; | &nbsp;
            <strong>Published:</strong> {convertTimeStamp(post.timestamp)} &nbsp; | &nbsp;
            <strong>Comments:</strong> {post.commentCount}
          </p>
        </div>
        <div className="card-action">
          <span className="btn-floating green" onClick={() => onClickVote("upVote")}><i className="material-icons">thumb_up</i></span> &nbsp;
          <span className="btn-floating red" onClick={() => onClickVote("downVote")}><i className="material-icons">thumb_down</i></span> &nbsp;
          <span>{post.voteScore} vote(s)</span> &nbsp;
          <If test={btnDetail !== false}>
            <Link to={`/posts/${post.id}`} className="btn orange lighten-1">+ Details</Link> &nbsp;
          </If>
          <Link to={`/posts/${post.id}/edit`} type="button" className="waves-effect waves-light btn">Edit</Link> &nbsp;
          <button type="button" className="waves-effect waves-light btn deep-orange darken-4" onClick={() => onDeletePost(post.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  }).isRequired,
  onClickVote: PropTypes.func.isRequired
}

export default Post