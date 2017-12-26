import React from 'react'
import PostList from './PostList'

const Home = () => {
  return (
    <section className="page">
      <div className="row">
        <h4 className="page-title col s12">List of Posts</h4>
        <PostList filter={false} />
      </div>
    </section>
  )
}

export default Home