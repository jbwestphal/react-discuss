import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { listAllCategories } from '../_actions'
import If from './If'

class CategoriesDropdown extends React.Component {

  handleInputChange(field) {
    let href = this.props.isLink
    if( href ) {
      window.location.href = '/'+field
    }
  }

  componentDidMount() {
    this.props.listAllCategories()
  }

  render() {
    const { listCategories, isLink, firstValue, isSelected } = this.props

    return (
      <div className="dropdown-categs">
        <select
          name="category"
          className="browser-default"
          onChange={(field) => this.handleInputChange(field.target.value)}
          defaultValue={isSelected}
          required
        >
          <If test={isLink === true}>
          <option>{firstValue}</option>
          </If>
          {
            listCategories.categories && listCategories.categories.map((category) => (
              <option value={category.path} key={category.path}>{category.name}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

CategoriesDropdown.propTypes = {
	isLink: PropTypes.bool.isRequired,
	firstValue: PropTypes.string.isRequired,
	isSelected: PropTypes.bool
}

const mapStateToProps = state => ({
  listCategories: state.postCategories
});

const mapDispatchToProps = dispatch => ({
  listAllCategories: () => dispatch(listAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDropdown)