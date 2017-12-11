import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { listAllPosts, actionDispatchVote } from '../actions'
// import * as ReadAPI from '../ReadableAPI'
import If from './If'

class Post extends React.Component {

  componentDidMount() {
    // dispatching an action to update the store
    this.props.listAllPosts()
  }

  // votePost(postId, vote) {
  //   console.log(postId, vote)

  //   this.props.voteOnPost(postId, vote)

  //   // ReadAPI.voteOnPost(postId, vote).then(result => console.log(result));


  // }

  render() {

    // getting the store up-to-date
    const listAllPosts = this.props.listPosts.posts

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

    const { voteOnPost } = this.props;

    return (
      <div className="col s12 l6">
        {
          listConditionalPosts && listConditionalPosts.map((post) => (
          <div className="card grey lighten-4" key={post.id}>
            <div className="card-content">
              <span className="card-title">{ post.title } &nbsp; <small><strong>Categoria:</strong> { post.category }</small></span>
              <p className="grey-text truncate">{ post.body }</p><br/>
              <p><strong>Author:</strong> { post.author } &nbsp; | &nbsp; <strong>Published:</strong> { post.timestamp }</p>
            </div>
            <div className="card-action">
              <Link to={`posts/${post.id}`} className="btn orange lighten-1">More</Link> &nbsp;
              <a className="btn light-blue lighten-1"
                ><i className="material-icons">turned_in_not</i> Fixed</a> &nbsp;
              <span className="btn-floating green" onClick={() => voteOnPost({postId: post.id, vote: "upVote"})}><i className="material-icons">thumb_up</i></span> &nbsp;
              <span className="btn-floating red" onClick={() => voteOnPost({postId: post.id, vote: "downVote"})}><i className="material-icons">thumb_down</i></span> &nbsp;
              <span>{post.voteScore}</span>
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
});

const mapDispatchToProps = dispatch => ({
    // "listAllPosts" is one props, could be any name
    // listPosts is the action
    listAllPosts: () => dispatch(listAllPosts()),
    // vote on post
    voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote), listAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)