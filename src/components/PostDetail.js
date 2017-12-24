import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import { convertTimeStamp, getRandomId } from '../utils'
import If from './If'
import Modal from './Modal'
import {
	actionDispatchVote, actionDeletePost,
	actionListComments, actionAddComment, actionDeleteComment, actionDispatchVoteComment } from '../actions'

class PostDetail extends React.Component {

	constructor () {
    super();
    this.state = {
		loadingPost: false,
		loadingComment: false,
		commentsModalOpen: false,
	}

    this.openCommentsModal = this.openCommentsModal.bind(this);
    this.closeCommentsModal = this.closeCommentsModal.bind(this);
  }

	componentDidMount() {
		this.props.commentsPost(this.props.postId)
	}

	handleDeletePost(postId) {
		this.setState({ loadingPost: true })
		this.props.deletePost(postId)

		setTimeout(() => {
			window.location.href = '/'
		}, 600);
	}

	handleCommentSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    this.props.addCommentPost(values)
		document.getElementsByName('formComment')[0].reset();
		this.setState({ loadingComment: true })

		setTimeout(() => {
			this.setState({ loadingComment: false })
		}, 400);
  }

	handleDeleteComment(commentId) {
		this.setState({ loadingComment: true })
		this.props.deleteComment(commentId)

		setTimeout(() => {
			this.setState({ loadingComment: false })
		}, 400);
	}

	openCommentsModal = () => this.setState(() => ({ commentsModalOpen: true }))
  closeCommentsModal = () => this.setState(() => ({ commentsModalOpen: false }))

	render() {

    const timestamp = Date.now()
		const { voteOnPost, listComments, postId, voteOnComment } = this.props
		const { loadingPost, loadingComment, commentsModalOpen } = this.state

		let listPostDetail = this.props.listPostDetail

		listPostDetail = listPostDetail && listPostDetail.filter((post) => {
			return post.id === postId
		})

		// order comments by date
		// this.props.listComments.sort(function(a, b){
		// 	return a.timestamp + b.timestamp
		// })

		return (
			<section className="container post-detail">

				<If test={ loadingPost === true }>
          <div className="loading-wrapper">Loading...</div>
        </If>

				<If test={ loadingPost === false }>
					<div className="section">
						<Link to="/" className="waves-effect waves-light blue darken-1 btn"><i className="material-icons">arrow_back</i> Go back</Link>
					</div>
					{
						listPostDetail && listPostDetail.map((post) => (
							<div className="row" key={post.id}>
								<div className="col s12">
									<section className="card grey lighten-4">
										<article className="card-content">
											<header className="card-title orange-text">{post.title}</header>
											<p>
												<span className="grey-text">Published in:</span> {convertTimeStamp(post.timestamp)} &nbsp; | &nbsp;
												<span className="grey-text">Author:</span> {post.author} &nbsp; | &nbsp;
												<span className="grey-text">Category:</span> {post.category}
											</p>
											<section className="section">
												<p className="flow-text">{post.body}</p>
											</section>
										</article>
										<div className="card-action">
											<span className="btn-floating green" onClick={() => voteOnPost({postId: post.id, vote: "upVote"})}><i className="material-icons">thumb_up</i></span> &nbsp;
											<span className="btn-floating red" onClick={() => voteOnPost({postId: post.id, vote: "downVote"})}><i className="material-icons">thumb_down</i></span> &nbsp;
											<span>{post.voteScore} vote(s)</span> &nbsp;
											<Link to={`/posts/${post.id}/edit`} type="button" className="waves-effect waves-light btn">Edit</Link> &nbsp;
											<button type="button" className="waves-effect waves-light btn deep-orange darken-4" onClick={() => this.handleDeletePost(post.id)}>Delete</button>
										</div>
									</section>
								</div>

								<div className="col s12">
									<h5 className="grey-text">{post.commentCount} post's comments</h5>
									<div className="row">
										<form className="col s12 m6 form-comment-post" name="formComment" onSubmit={this.handleCommentSubmit}>
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
										<If test={ loadingComment === true }>
											<div className="loading-wrapper">Loading...</div>
										</If>
										<If test={ loadingComment === false }>
											<div className="col s12 m6">
												{
													listComments && listComments.filter((item) => {
														return (item.parentId === postId) && (item.deleted === false)
													}).map(item => (
														<div key={item.id} className="card grey lighten-5">
															<div className="card-content">
																<span className="card-title"><small>Comment by <strong>{item.author}</strong></small></span>
																<p><span className="grey-text">Published in:</span> {convertTimeStamp(item.timestamp)}</p>
																<p>{item.body}</p>
															</div>
															<div className="card-action">
																<span className="btn-floating green" onClick={() => voteOnComment({commentId: item.id, vote: "upVote"})}><i className="material-icons">thumb_up</i></span> &nbsp;
																<span className="btn-floating red" onClick={() => voteOnComment({commentId: item.id, vote: "downVote"})}><i className="material-icons">thumb_down</i></span> &nbsp;
																<span>{item.voteScore} vote(s)</span> &nbsp;&nbsp;
																<button className="waves-effect waves-light btn" onClick={this.openCommentsModal}>Edit</button> &nbsp;
																<button className="waves-effect waves-light btn  deep-orange darken-4" onClick={() => this.handleDeleteComment(item.id)}>Delete</button>
															</div>
															<Modal
																isOpen={commentsModalOpen}
															>
																<h4>Edit Comment</h4>
																<If test={commentsModalOpen}>
																	<form className="col s12">
																		<input type="hidden" name="timestamp" defaultValue={timestamp} />
																		<div className="row">
																			<div className="input-field col s12">
																				<textarea
																					id="textComment"
																					className="validate materialize-textarea"
																					name="body"
																					defaultValue={item.body} />
																				<label className="active">Text</label>
																			</div>
																			<div className="input-field col s12 right-align">
																				<button
																					type="button"
																					className="waves-effect waves-light btn grey lighten-1"
																					onClick={this.closeCommentsModal}>Cancel</button> &nbsp;
																				<button type="submit" className="waves-effect waves-light btn">Publish</button>
																			</div>
																		</div>
																	</form>
																</If>
															</Modal>
														</div>
													))
												}
											</div>
										</If>

									</div>
								</div>
							</div>
						))
					}
				</If>
			</section>
		)
	}
}

const mapStateToProps = state => ({
  listPostDetail: state.posts,
  listComments: state.comments
})

const mapDispatchToProps = dispatch => ({
  // actions for posts
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
  deletePost: (postId) => dispatch(actionDeletePost(postId)),
	// actions for comments
  commentsPost: (postId) => dispatch(actionListComments(postId)),
  addCommentPost: (comment) => dispatch(actionAddComment(comment)),
  deleteComment: (commentId) => dispatch(actionDeleteComment(commentId)),
	voteOnComment: (commentId, vote) => dispatch(actionDispatchVoteComment(commentId, vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)