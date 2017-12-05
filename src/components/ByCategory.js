import React from 'react'
import { getCategoriesByPosts } from '../ReadableAPI'
import If from './If'
import Post from './Post'

class ByCategory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    getCategoriesByPosts(this.props.categoryPath).then((posts) => {
      this.setState({ posts })
			console.log(posts)
    })
  }

  render() {

    const { posts } = this.state

		return (
			<section className="page">
				<div className="row">
					<h4>Posts in category "{this.props.categoryPath}"</h4>
					<If test={posts.length !== 0}>
					<Post posts={posts} />
					</If>

					<If test={posts.length === 0}>
					<p>No posts found in this category.</p>
					</If>
				</div>
			</section>
		)
	}
}

export default ByCategory