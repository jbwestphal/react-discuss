import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import * as postsAPI from '../ReadableAPI'
// import If from './If'

class PostDetail extends Component {

	state = {
		post: []
	}

	componentDidMount() {
		postsAPI.getPostDetail(this.props.postId).then((post) => {
			this.setState({ post })
		})
	}

	render() {

		const { post } = this.state

		return (
			<section className="container post-detail">

				<header className="post-detail-header">
					<h2 className="header grey-text">{post.title}</h2>
				</header>

				{/* <If test={ post.author !== undefined }> */}
					<section>
						<article className="post-detail-article">
							<div>{post.body}</div>
							<p><span className="grey-text">Author:</span> {post.author}</p>
						</article>
					</section>
				{/* </If> */}
			</section>
		)
	}
}

export default PostDetail