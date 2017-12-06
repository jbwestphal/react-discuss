import React from 'react'
// import { getCategoriesByPosts } from '../ReadableAPI'
// import If from './If'
import Post from './Post'

class ByCategory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {

  }

  render() {

    // const { posts } = this.state

		return (
			<section className="page">
				<div className="row">
					<h4>Posts in category "{this.props.categoryPath}"</h4>
					<Post filter={this.props.categoryPath} />
				</div>
			</section>
		)
	}
}

export default ByCategory