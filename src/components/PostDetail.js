import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as postsAPI from '../ReadableAPI'
import { convertTimeStamp, getRandomId } from '../utils'
// import If from './If'

class PostDetail extends Component {

	state = {
		post: [],
		comments: []
	}

	componentDidMount() {
		postsAPI.getPostDetail(this.props.postId).then((post) => {
			this.setState({ post })
		})
		postsAPI.getCommentsByPost(this.props.postId).then((comments) => {
			this.setState({ comments })
		})
	}

	handleSubmit = (e) => {
    e.preventDefault();

    const values = serializeForm(e.target, { hash: true })

    // this.props.createContact(values)

    // if (this.props.onCreatePost)
    //   this.props.onCreatePost()

  }

	render() {

    const timestamp = Date.now()
		const { post, comments } = this.state

		return (
			<section className="container post-detail">

				<header className="post-detail-header">
					<h2 className="header grey-text">{post.title} &nbsp; <button type="button" className="waves-effect waves-light btn">Edit post</button></h2>
				</header>
				<section>
					<article className="post-detail-article">
						<div>{post.body}</div>
						<p><span className="grey-text">Published in:</span> {convertTimeStamp(post.timestamp)}</p>
						<p><span className="grey-text">Author:</span> {post.author} &nbsp; <span className="grey-text">Category:</span> {post.category}</p>
						<p><span className="grey-text">VoteScore:</span> {post.voteScore} &nbsp; <span className="grey-text">Comments:</span> {post.commentCount}</p>
					</article>
				</section>
				<h3 className="grey-text">Post's Comments</h3>
				<div className="row">
					<form className="col s12 m6" onSubmit={this.handleSubmit}>
            <input type="hidden" name="id" defaultValue={getRandomId()} />
            <input type="hidden" name="timestamp" defaultValue={timestamp} />
            <input type="hidden" name="parentId" defaultValue={post.id} />
            <div className="row">
              <div className="input-field col s12">
                <input id="title" type="text" className="validate" name="author" />
                <label className="active">Author</label>
              </div>
              <div className="input-field col s12">
                <textarea id="description" className="validate materialize-textarea" name="body" />
                <label className="active">Text</label>
              </div>
              <div className="input-field col s12 right-align">
                <button type="submit" className="waves-effect waves-light btn">Publish</button>
              </div>
            </div>
          </form>
					<div className="col s12 m6">
						{
							comments.map(item => (
								<div key={item.id} className="card grey lighten-5">
									<div className="card-content">
										<span className="card-title">Comment by {item.author}</span>
										<p>{item.body}</p>
									</div>
									<div className="card-action">
										<span className="btn-floating green"><i className="material-icons">thumb_up</i></span> &nbsp;
										<span className="btn-floating red"><i className="material-icons">thumb_down</i></span> &nbsp;
										<span>{item.voteScore} vote(s)</span> &nbsp;&nbsp;
										<a href="#!">Edit</a>
										<a href="#!">Delete</a>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</section>
		)
	}
}

export default PostDetail