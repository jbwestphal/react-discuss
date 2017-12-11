import React from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import CategoriesDropdown from './CategoriesDropdown'
import { actionAddPost } from '../actions'

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      body: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(field) {
    const target = field.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // a importacao da biblioteca via npm do form-serialize
    // ajuda no retorno de valores de um form para passar via javascript para a API
    const values = serializeForm(e.target, { hash: true })

    console.log(values)

    this.props.createContact(values)

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    return (
      <section className="page container">
        <div className="row">
          <div className="section">
            <h4>Create a Post</h4>
          </div>
          <form className="col s12" onSubmit={this.handleSubmit}>
            <input type="hidden" name="id" defaultValue={this.getRandomInt(1,1000)} />
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title" type="text" className="validate"
                  name="title"
                  defaultValue={this.state.title} />
                <label className="active">Title</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="title" type="text" className="validate"
                  name="author"
                  defaultValue={this.state.author} />
                <label className="active">Author</label>
              </div>
              <div className="col s6">
                <label className="active">Categories</label>
                <CategoriesDropdown isLink={false} />
              </div>
              <div className="input-field col s12">
                <textarea
                  id="description" className="validate materialize-textarea"
                  name="body"
                  defaultValue={this.state.body} />
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
    createContact: (post) => dispatch(actionAddPost(post)),
});

export default connect(null, mapDispatchToProps)(NewPost)