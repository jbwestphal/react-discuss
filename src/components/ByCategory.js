import React from 'react'
import { connect } from 'react-redux'
import { setActiveCateg } from '../_actions'
import VisiblePostList from '../containers/VisiblePostList'

class ByCategory extends React.Component {

	componentDidMount() {
		this.props.activeCateg(this.props.categoryPath)
	}

	render() {
		return (
			<section className="page">
				<div className="row">
					<h4 className="page-title col s12">Posts in category "{this.props.categoryPath}"</h4>
					<VisiblePostList />
				</div>
			</section>
		)
	}
}

const mapDispatchToProps = dispatch => ({
  activeCateg: (category) => dispatch(setActiveCateg(category)),
})

export default connect(null,mapDispatchToProps)(ByCategory)