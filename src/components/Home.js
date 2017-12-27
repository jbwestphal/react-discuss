import React from 'react'
import VisiblePostList from '../containers/VisiblePostList'

const Home = () => {
  return (
    <section className="page">
      <div className="row">
        <h4 className="page-title col s12">List of Posts</h4>
        <VisiblePostList />
      </div>
    </section>
  )
}

export default Home