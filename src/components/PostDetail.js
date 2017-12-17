import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import serializeForm from 'form-serialize'
import * as postsAPI from '../ReadableAPI'
import { convertTimeStamp, getRandomId } from '../utils'
import { listAllPosts, actionDispatchVote } from '../actions'
// import If from './If'

class PostDetail extends Component {

	state = {
		comments: []
	}

	componentDidMount() {
		postsAPI.getCommentsByPost(this.props.postId).then((comments) => {
			this.setState({ comments })
		})

		this.props.listAllPosts()
	}

	handleCommentSubmit = (e) => {
    e.preventDefault();

    // const values = serializeForm(e.target, { hash: true })

    // this.props.createContact(values)

    // if (this.props.onCreatePost)
    //   this.props.onCreatePost()

  }

	render() {

    const timestamp = Date.now()
		const { comments } = this.state

		let listPostDetail = this.props.listPostDetail

		listPostDetail = listPostDetail && listPostDetail.filter((post) => {
			return post.id === this.props.postId
		})

		const { voteOnPost } = this.props

		return (
			<section className="container post-detail">
				<div className="section">
					<Link to="/" className="waves-effect waves-light blue darken-1 btn"><i className="material-icons">arrow_back</i> Go back</Link>
				</div>
				{
					listPostDetail && listPostDetail.map((post) => (
						<div className="row" key={post.id}>
							<div className="col s12">
								<section className="card grey lighten-4">
									<div className="card-content">
										<header className="card-title orange-text">{post.title}</header>
										<p><span className="grey-text">Published in:</span> {convertTimeStamp(post.timestamp)}</p>
										<p><span className="grey-text">Author:</span> {post.author} &nbsp; <span className="grey-text">Category:</span> {post.category}</p>
										<p className="grey-text">{post.body}</p>
									</div>
									<div className="card-action">
										<span className="btn-floating green" onClick={() => voteOnPost({postId: post.id, vote: "upVote"})}><i className="material-icons">thumb_up</i></span> &nbsp;
              			<span className="btn-floating red" onClick={() => voteOnPost({postId: post.id, vote: "downVote"})}><i className="material-icons">thumb_down</i></span> &nbsp;
										<span>{post.voteScore} vote(s)</span> &nbsp;
										<button type="button" className="waves-effect waves-light btn">Edit</button> &nbsp;
										<button type="button" className="waves-effect waves-light btn deep-orange darken-4">Delete</button>
									</div>
								</section>
							</div>

							<div className="col s12">
								<h5 className="grey-text">{post.commentCount} post's comments</h5>
								<div className="row">
									<form className="col s12 m6" onSubmit={this.handleCommentSubmit}>
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
							</div>
						</div>
					))
				}
			</section>
		)
	}
}

const mapStateToProps = state => ({
  listPostDetail: state.posts
})

const mapDispatchToProps = dispatch => ({
  // "listAllPosts" is one props, could be any name
  // listPosts is the action
  listAllPosts: () => dispatch(listAllPosts()),
  // vote on post
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)