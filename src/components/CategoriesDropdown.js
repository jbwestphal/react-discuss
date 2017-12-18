import React from 'react'
import { connect } from 'react-redux'
import { listAllCategories } from '../actions'

class CategoriesDropdown extends React.Component {

  handleInputChange(field) {
    let href = this.props.isLink
    if( href ) {
      window.location.href = '/'+field+'/posts'
    }
  }

  componentDidMount() {
    this.props.listAllCategories()
  }

  render() {

    const categories = this.props.listCategories

    return (
      <div className="dropdown-categs">
        <select
          name="category"
          className="browser-default"
          onChange={(field) => this.handleInputChange(field.target.value)}
          defaultValue={this.props.isSelected}
        >
          <option>{this.props.firstValue}</option>
          {
            categories.categories && categories.categories.map((category) => (
              <option value={category.path} key={category.path}>{category.name}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listCategories: state.postCategories
});

const mapDispatchToProps = dispatch => ({
  listAllCategories: () => dispatch(listAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDropdown)