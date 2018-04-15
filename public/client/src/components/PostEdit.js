import React from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import If from './If'
import { actionEditPost } from '../_actions'

export class PostEdit extends React.Component {

  state = {
    showLoader: false
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ showLoader: true })

    const values = serializeForm(e.target, { hash: true })

    this.props.editPost(values.id, values)

    setTimeout(() => {
      if (this.props.onEditPost)
        this.props.onEditPost()
    }, 500);

  }

  goBack = () => {
    if (this.props.onEditPost)
      this.props.onEditPost()
  }

  render() {
    let listPostDetail = this.props.listPostDetail

		listPostDetail = listPostDetail && listPostDetail.filter((post) => {
			return post.id === this.props.postId
		})

    return (
      <section className="page container">
        <If test={ this.state.showLoader === true }>
          <div className="loading-wrapper">Loading...</div>
        </If>
        <If test={ this.state.showLoader === false }>
        {
        listPostDetail && listPostDetail.map((post) => (
          <div className="row" key={post.id}>
            <div className="section">
              <h4 className="page-title col s12">Edit Post</h4>
            </div>
            <form className="col s12" onSubmit={this.handleSubmit}>
              <input id="id" type="hidden" name="id" defaultValue={post.id} />
              <div className="row">
                <div className="input-field col s6">
                  <input id="title" type="text" className="validate" name="title" defaultValue={post.title} required />
                  <label className="active">Title</label>
                </div>
                <div className="input-field col s6">
                  <input id="title" type="text" className="validate" name="author" disabled defaultValue={post.author} required />
                  <label className="active">Author</label>
                </div>
                <div className="input-field col s12">
                  <textarea id="description" className="validate materialize-textarea" name="body" defaultValue={post.body} required />
                  <label className="active">Text</label>
                </div>
                <div className="input-field col s12 right-align">
                  <button type="button" className="waves-effect waves-light btn grey lighten-1" onClick={this.goBack}>Cancel</button> &nbsp;
                  <button type="submit" className="waves-effect waves-light btn">Publish</button>
                </div>
              </div>
            </form>
          </div>
        ))}
        </If>
      </section>
    )
  }
}

PostEdit.propTypes = {
	onEditPost: PropTypes.func.isRequired,
	listPostDetail: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
	postId: PropTypes.string.isRequired,
	categoryId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  listPostDetail: state.posts
})

const mapDispatchToProps = dispatch => ({
  editPost: (postId, post) => dispatch(actionEditPost(postId, post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)