import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../ReadableAPI'
import { listPosts } from '../actions'
import If from './If'

class Post extends React.Component {

  componentDidMount() {
    getPosts().then((posts) => {
      this.props.listAllPosts(posts)
    })
  }

  render() {

    const listAllPosts = this.props.listPosts.posts
    const postCategory = this.props.filter
    let listConditionalPosts = []

    if(postCategory !== false) {
      listConditionalPosts = listAllPosts && listAllPosts.filter((post) => {
        return post.category === postCategory
      })
    } else {
      listConditionalPosts = listAllPosts
    }

    return (
      <div className="col s12 l6">
        {listConditionalPosts && listConditionalPosts.map((post) => (

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
              <a className="btn deep-orange lighten-1"><i className="material-icons">star</i> Rate</a>
            </div>
          </div>
        ))}
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
    listAllPosts: (data) => dispatch(listPosts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)