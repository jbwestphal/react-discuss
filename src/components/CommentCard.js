import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { convertTimeStamp } from '../utils'
import If from './If'
import Modal from './Modal'
import { actionListComments, actionDeleteComment, actionDispatchVoteComment, actionEditComment } from '../_actions'

class CommentCard extends React.Component {

	constructor() {
    super()
    this.state = {
      loadingModal: false,
			loadingComment: false,
    }

    this.openCommentsModal = this.openCommentsModal.bind(this)
  }

	componentDidMount() {
		// dispatch action to load post comments
		this.props.commentsPost(this.props.parentId)
	}

  handleCommentEdit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true })
    this.props.editCommentPost(values.id, values)

		let modal = document.querySelectorAll('.modal-custom')

    this.setState({ loadingModal: true })

		setTimeout(() => {
			for (let i = 0; i < modal.length; i++) {
				modal[i].style.display = 'none';
			}
      this.setState({ loadingModal: false })
		}, 400);
  }

	handleDeleteComment(commentId) {
		this.setState({ loadingComment: true })
		this.props.deleteComment(commentId)

		setTimeout(() => {
			this.setState({ loadingComment: false })
		}, 400);
	}

	openCommentsModal = (el) => {
		let target = el.target
		target.parentNode.querySelector('.modal-custom').style.display = 'block';
	}

  render() {

    const timestamp = Date.now()
		const { voteOnComment, listComments, parentId } = this.props
		const { loadingModal, loadingComment } = this.state

    return (
      <div className="col s12 m6">
        <If test={ loadingComment === true }>
          <div className="loading-wrapper">Loading...</div>
        </If>
        <If test={ loadingComment === false }>
          {
            listComments && listComments.filter((item) => {
              return (item.parentId === parentId) && (item.deleted === false)
            }).sort((a, b) => b['voteScore'] - a['voteScore']).map(item => (
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
                  <button className="waves-effect waves-light btn" onClick={(el) => this.openCommentsModal(el)}>Edit</button> &nbsp;
                  <button className="waves-effect waves-light btn  deep-orange darken-4" onClick={() => this.handleDeleteComment(item.id)}>Delete</button>
                  <Modal>
                    <h4>Edit Comment</h4>
                    <If test={ loadingModal === true }>
                      <div className="loading-wrapper">Loading...</div>
                    </If>
                    <If test={ loadingModal === false }>
                      <form className="col s12" onSubmit={this.handleCommentEdit}>
                        <input type="hidden" name="timestamp" defaultValue={timestamp} />
                        <input type="hidden" name="id" defaultValue={item.id} />
                        <div className="row">
                          <div className="col s12">
                            <p className="section">Author: <strong>{item.author}</strong></p>
                          </div>
                          <div className="input-field col s12">
                            <textarea
                              id="textComment"
                              className="validate materialize-textarea"
                              name="body"
                              defaultValue={item.body} />
                            <label className="active">Text</label>
                          </div>
                          <div className="input-field col s12 right-align">
                            <button type="submit" className="waves-effect waves-light btn">Publish</button>
                          </div>
                        </div>
                      </form>
                    </If>
                  </Modal>
                </div>
              </div>
            ))
          }
        </If>
      </div>
    )
  }
}

CommentCard.propTypes = {
  listComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  })).isRequired
}

const mapStateToProps = state => ({
  listComments: state.comments
})

const mapDispatchToProps = dispatch => ({
  commentsPost: (postId) => dispatch(actionListComments(postId)),
  editCommentPost: (commentId, comment) => dispatch(actionEditComment(commentId, comment)),
  deleteComment: (commentId) => dispatch(actionDeleteComment(commentId)),
	voteOnComment: (commentId, vote) => dispatch(actionDispatchVoteComment(commentId, vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard)