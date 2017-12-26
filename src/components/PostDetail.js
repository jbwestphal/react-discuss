import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { convertTimeStamp, getRandomId } from '../utils'
import If from './If'
import CommentCard from './CommentCard'
import { actionDispatchVote, actionDeletePost, actionAddComment } from '../_actions'

class PostDetail extends React.Component {

	constructor () {
    super();
    this.state = {
			loadingPost: false,
			loadingComment: false,
		}
  }

	handleDeletePost(postId) {
		this.setState({ loadingPost: true })
		this.props.deletePost(postId)

		setTimeout(() => {
			window.location.href = '/'
		}, 300);
	}

	handleCommentSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    this.props.addCommentPost(values)
		document.getElementsByName('formComment')[0].reset();
		this.setState({ loadingComment: true })

		setTimeout(() => {
			this.setState({ loadingComment: false })
		}, 300);
  }

	render() {

    const timestamp = Date.now()
		const { voteOnPost, listComments, postId } = this.props
		const { loadingPost, loadingComment } = this.state

		let listPostDetail = this.props.listPostDetail

		listPostDetail = listPostDetail && listPostDetail.filter((post) => {
			return post.id === postId
		})

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
											<CommentCard listComments={listComments} parentId={postId} />
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

PostDetail.propTypes = {
  listPostDetail: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  })).isRequired
}

const mapStateToProps = state => ({
  listPostDetail: state.posts
})

const mapDispatchToProps = dispatch => ({
  // actions for posts
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
  deletePost: (postId) => dispatch(actionDeletePost(postId)),
	// actions for comments
  addCommentPost: (comment) => dispatch(actionAddComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)