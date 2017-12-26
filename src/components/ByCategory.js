import React from 'react'
import PostList from './PostList'

const ByCategory = (props) => {
	return (
		<section className="page">
			<div className="row">
				<h4 className="page-title col s12">Posts in category "{props.categoryPath}"</h4>
				<PostList filter={props.categoryPath} />
			</div>
		</section>
	)
}

export default ByCategory