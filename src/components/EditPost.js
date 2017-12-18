import React from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { listAllPosts, actionEditPost } from '../actions'
// import CategoriesDropdown from './CategoriesDropdown'

class EditPost extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const values = serializeForm(e.target, { hash: true })

    this.props.editPost(this.props.postId, values.title, values.body)

    // console.log(this.props.postId, values.title)

    // if (this.props.onEditPost)
    //   this.props.onEditPost()

  }

  componentDidMount() {
    // dispatching an action to update the store
    this.props.listAllPosts()
  }

  render() {
    let listPostDetail = this.props.listPostDetail

		listPostDetail = listPostDetail && listPostDetail.filter((post) => {
			return post.id === this.props.postId
		})

    return (
      <section className="page container">
        {
        listPostDetail && listPostDetail.map((post) => (
          <div className="row" key={post.id}>
            <div className="section">
              <h4 className="page-title col s12">Edit Post</h4>
            </div>
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="title" type="text" className="validate" name="title" defaultValue={post.title} />
                  <label className="active">Title</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="title" type="text" className="validate" name="author" disabled defaultValue={post.author} />
                  <label className="active">Author</label>
                </div>
                {/* <div className="col s6">
                  <label className="active">Categories</label>
                  <CategoriesDropdown isLink={false} isSelected={post.category} />
                </div> */}
                <div className="input-field col s12">
                  <textarea
                    id="description" className="validate materialize-textarea" name="body" defaultValue={post.body} />
                  <label className="active">Text</label>
                </div>
                <div className="input-field col s12 right-align">
                  <button type="button" className="waves-effect waves-light btn grey lighten-1">Clear</button> &nbsp;
                  <button type="submit" className="waves-effect waves-light btn">Publish</button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  listPostDetail: state.posts
})

const mapDispatchToProps = dispatch => ({
  listAllPosts: () => dispatch(listAllPosts()),
  editPost: (postId, title, body) => dispatch(actionEditPost(postId, title, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)