import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setActiveCateg } from '../_actions'
import VisiblePostList from '../containers/VisiblePostList'

export class Home extends React.Component {

	componentDidMount() {
		this.props.activeCateg('SHOW_ALL')
	}

  render() {
    return (
      <section className="page">
        <div className="row">
          <h4 className="page-title col s12">List of Posts</h4>
          <VisiblePostList />
        </div>
      </section>
    )
  }
}

Home.propTypes = {
	activeCateg: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  activeCateg: (category) => dispatch(setActiveCateg(category)),
})

export default connect(null,mapDispatchToProps)(Home)