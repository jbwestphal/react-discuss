import React from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { getRandomId } from '../utils'
import { actionAddPost } from '../actions'
import CategoriesDropdown from './CategoriesDropdown'

class NewPost extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const values = serializeForm(e.target, { hash: true })

    this.props.createPost(values)

    if (this.props.onCreatePost)
      this.props.onCreatePost()

  }

  render() {
    let timestamp = Date.now()
    return (
      <section className="page container">
        <div className="row">
          <div className="section">
            <h4 className="page-title col s12">Create a Post</h4>
          </div>
          <form className="col s12" onSubmit={this.handleSubmit}>
            <input type="hidden" name="id" defaultValue={getRandomId()} />
            <input type="hidden" name="timestamp" defaultValue={timestamp} />
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title" type="text" className="validate"
                  name="title" />
                <label className="active">Title</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="title" type="text" className="validate"
                  name="author" />
                <label className="active">Author</label>
              </div>
              <div className="col s6">
                <label className="active">Categories</label>
                <CategoriesDropdown isLink={false} firstValue="Categories" />
              </div>
              <div className="input-field col s12">
                <textarea
                  id="description" className="validate materialize-textarea"
                  name="body" />
                <label className="active">Text</label>
              </div>
              <div className="input-field col s12 right-align">
                <button type="button" className="waves-effect waves-light btn grey lighten-1">Clear</button> &nbsp;
                <button type="submit" className="waves-effect waves-light btn">Publish</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createPost: (post) => dispatch(actionAddPost(post)),
});

export default connect(null, mapDispatchToProps)(NewPost)