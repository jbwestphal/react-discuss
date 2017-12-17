import React from 'react'
import Post from './Post'

class ByCategory extends React.Component {
  render() {
		return (
			<section className="page">
				<div className="row">
					<h4 className="page-title col s12">Posts in category "{this.props.categoryPath}"</h4>
					<Post filter={this.props.categoryPath} />
				</div>
			</section>
		)
	}
}

export default ByCategory