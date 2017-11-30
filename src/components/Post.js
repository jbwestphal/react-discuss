import React from 'react'
import { Link } from 'react-router-dom'
// import If from '../Components/If'

function Post ({ posts }) {
  return (
    <div className="col s12 l6">
      {posts.map((post) => (
        <div className="card grey lighten-4" key={post.id}>
          <div className="card-content">
            <span className="card-title">{ post.title } &nbsp; <small><strong>Categoria:</strong> { post.category }</small></span>
            <p className="grey-text truncate">{ post.body }</p><br/>
            <p><strong>Author:</strong> { post.author } &nbsp; | &nbsp; <strong>Published:</strong> { post.timestamp }</p>
          </div>
          <div className="card-action">
            <Link to={`posts/${post.id}`} className="btn orange lighten-1">More</Link> &nbsp;
            <a className="btn light-blue lighten-1"><i className="material-icons">turned_in_not</i> Fixed</a> &nbsp;
            <a className="btn deep-orange lighten-1"><i className="material-icons">star</i> Rate</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Post