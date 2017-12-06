import React from 'react'
import Post from './Post'

const Home = () => {
  return (
    <section className="page">
      {/* <div className="row"> */}
        {/* <h4 className="page-title col s12">Your Pinned Posts</h4>
        <div className="col s12 l6">
          <div className="card grey lighten-4">
            <div className="card-content">
              <span className="card-title">Post Title</span>
              <p className="truncate">I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
              <p><strong>Author:</strong> Jess Westphal &nbsp; | &nbsp; <strong>Published:</strong> 2017-05-19</p>
            </div>
            <div className="card-action">
              <Link to="/post/:id" className="btn orange lighten-1">More</Link> &nbsp;
              <a className="btn light-blue lighten-1"><i className="material-icons">turned_in</i> Remove</a> &nbsp;
              <a className="btn deep-orange lighten-1"><i className="material-icons">star</i> Rate</a>
            </div>
          </div>
        </div>*/}
      {/* </div> */}
      <div className="row">
        <h4 className="page-title col s12">List of Posts</h4>
          <Post filter={false} />
      </div>
    </section>
  )
}

export default Home