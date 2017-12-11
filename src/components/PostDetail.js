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

		const date = new Date(post.timestamp*1000)
		const dateDay = date.getDate()
		const dateMonth = date.getMonth()+1
		const dateYear = date.getFullYear()

		const finalDate = dateDay+'/'+dateMonth+'/'+dateYear

		return (
			<section className="container post-detail">

				<header className="post-detail-header">
					<h2 className="header grey-text">{post.title}</h2>
				</header>
				<section>
					<article className="post-detail-article">
						<div>{post.body}</div>
						<p><span className="grey-text">Published in:</span> {finalDate}</p>
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