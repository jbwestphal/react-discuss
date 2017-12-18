import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertTimeStamp } from '../utils'
import { listAllPosts, actionDispatchVote } from '../actions'
import If from './If'

class Post extends React.Component {

  componentDidMount() {
    // dispatching an action to update the store
    this.props.listAllPosts()
  }

  render() {

    // getting the store up-to-date
    const listAllPosts = this.props.listPosts

    // getting props to define the filter
    const postCategory = this.props.filter

    // conditional for list all posts or posts by categories
    let listConditionalPosts = []

    if(postCategory !== false) {
      listConditionalPosts = listAllPosts && listAllPosts.filter((post) => {
        return post.category === postCategory
      })
    } else {
      listConditionalPosts = listAllPosts
    }

    const { voteOnPost } = this.props

    return (
      <div className="row">
        {
          listConditionalPosts && listConditionalPosts.map((post) => (
          <div className="col s12 l6">
            <div className="card grey lighten-4" key={post.id}>
              <div className="card-content">
                <span className="card-title">{ post.title } &nbsp; <small><strong>Categoria:</strong> { post.category }</small></span>
                <p className="grey-text truncate">{ post.body }</p><br/>
                <p><strong>Author:</strong> { post.author } &nbsp; | &nbsp; <strong>Published:</strong> {convertTimeStamp(post.timestamp)}</p>
              </div>
              <div className="card-action">
                <Link to={`/posts/${post.id}`} className="btn orange lighten-1">More</Link> &nbsp;
                <span className="btn-floating green" onClick={() => voteOnPost({postId: post.id, vote: "upVote"})}><i className="material-icons">thumb_up</i></span> &nbsp;
                <span className="btn-floating red" onClick={() => voteOnPost({postId: post.id, vote: "downVote"})}><i className="material-icons">thumb_down</i></span> &nbsp;
                <span>{post.voteScore} vote(s)</span>
              </div>
            </div>
          </div>
        ))
        }
        <If test={listConditionalPosts && listConditionalPosts.length === 0}>
          <p>No posts found in this category.</p>
        </If>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listPosts: state.posts
})

const mapDispatchToProps = dispatch => ({
  // "listAllPosts" is one props, could be any name
  // listPosts is the action
  listAllPosts: () => dispatch(listAllPosts()),
  // vote on post
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)