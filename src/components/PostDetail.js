import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import * as postsAPI from '../ReadableAPI'
import { convertTimeStamp } from '../utils'
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
				<section>
					<article className="post-detail-article">
						<div>{post.body}</div>
						<p><span className="grey-text">Published in:</span> {convertTimeStamp(post.timestamp)}</p>
						<p><span className="grey-text">Author:</span> {post.author} &nbsp; <span className="grey-text">Category:</span> {post.category}</p>
						<p><span className="grey-text">VoteScore:</span> {post.voteScore} &nbsp; <span className="grey-text">Comments:</span> {post.commentCount}</p>
					</article>
				</section>
				<h3 className="grey-text">Post's Comments</h3>
			</section>
		)
	}
}

export default PostDetail