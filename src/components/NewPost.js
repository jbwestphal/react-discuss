import React from 'react'

const NewPost = () => {

	return (
		<section className="page container">
			<div className="row">
				<h4>Create a Post</h4>
      	<form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="title" type="text" className="validate" />
              <label>Title</label>
            </div>
            <div className="input-field col s6">
              <input id="description" type="text" className="validate" />
              <label>Description</label>
            </div>
            <div className="input-field col s12 right-align">
              <button type="submit" className="waves-effect waves-light btn grey lighten-1">Clear</button> &nbsp;
              <button type="submit" className="waves-effect waves-light btn">Create post</button>
            </div>
          </div>
        </form>
			</div>
    </section>
	)
}

export default NewPost