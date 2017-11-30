import React from 'react'

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

  render() {
    return (
      <section className="page container">
        <div className="row">
          <div class="section">
            <h4>Create a Post</h4>
          </div>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title" type="text" className="validate"
                  name="title"
                  onChange={this.handleInputChange}
                  value={this.state.title} />
                <label className="active">Title</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="title" type="text" className="validate"
                  name="author"
                  onChange={this.handleInputChange}
                  value={this.state.author} />
                <label className="active">Author</label>
              </div>
              <div className="col s6">
                <label className="active">Categories</label>
                <select
                  name="category" className="browser-default"
                  onChange={this.handleInputChange}
                  value={this.state.category}>
                  <option value="">Select an option</option>
                  <option value="1">Categorie 1</option>
                  <option value="2">Categorie 2</option>
                  <option value="3">Categorie 3</option>
                </select>
              </div>
              <div className="input-field col s12">
                <textarea
                  id="description" className="validate materialize-textarea"
                  name="body"
                  onChange={this.handleInputChange}
                  value={this.state.body} />
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

export default NewPost