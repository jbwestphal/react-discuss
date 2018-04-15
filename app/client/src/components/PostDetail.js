import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { getRandomId } from '../utils'
import If from './If'
import Post from './Post'
import CommentCard from './CommentCard'
import { actionDispatchVote, actionDeletePost, actionAddComment } from '../_actions'

export class PostDetail extends React.Component {

	state = {
		loadingPost: false,
		loadingComment: false,
	}

	handleDeletePost(postId) {
		this.setState({ loadingPost: true })
		this.props.deletePost(postId)

		setTimeout(() => {
			if (this.props.handleDeletePost)
				this.props.handleDeletePost()
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
		}, 300);
  }

	render() {

    const timestamp = Date.now()
		const { voteOnPost, listComments, postId } = this.props
		const { loadingPost, loadingComment } = this.state

		const post = this.props.post.filter((post) => {
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
					<If test={ post.length !== 0 }>
						{
							post.map((post, index) => (
								<div className="row" key={post.id}>
									<Post
										key={index}
										post={post}
										width="l12"
										btnDetail={false}
										truncate={false}
										onClickVote={(vote) => voteOnPost({postId: post.id, vote: vote})}
										onDeletePost={() => this.handleDeletePost(post.id)}
									/>
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
					<If test={ post.length === 0 }>
						<section className="section">
							<h4>Post not found, go back to home</h4>
						</section>
					</If>
				</If>
			</section>
		)
	}
}

PostDetail.propTypes = {
  post: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    commentCount: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired
  })).isRequired,
	postId: PropTypes.string,
	voteOnPost: PropTypes.func,
	deletePost: PropTypes.func,
	addCommentPost: PropTypes.func,
	listComments: PropTypes.array
}

const mapStateToProps = state => ({
  post: state.posts
})

const mapDispatchToProps = dispatch => ({
  // actions for posts
  voteOnPost: (postId, vote) => dispatch(actionDispatchVote(postId, vote)),
  deletePost: (postId) => dispatch(actionDeletePost(postId)),
	// actions for comments
  addCommentPost: (comment) => dispatch(actionAddComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)