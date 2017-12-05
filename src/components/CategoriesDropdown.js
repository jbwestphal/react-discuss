import React from 'react'
import { getCategories } from '../ReadableAPI'

class CategoriesDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: {}
    }
  }

  handleInputChange(field) {
    let href = this.props.isLink
    if( href ) {
      window.location.href = '/'+field+'/posts'
    }
  }

  componentDidMount() {
    getCategories().then((categories) => {
      this.setState({ categories })
    })
  }

  render() {

    const { categories } = this.state
    let listCategs = ''

    if( categories.categories !== undefined ) {
			listCategs = categories.categories.map((category) => (
				<option value={category.path} key={category.path}>{category.name}</option>
			))
		}

    return (
      <div className="dropdown-categs">
        <select
          name="category" className="browser-default"
          onChange={(field) => this.handleInputChange(field.target.value)}
          defaultValue="Categories">
          <option>Categories</option>
          {listCategs}
        </select>
      </div>
    )
  }
}

export default CategoriesDropdown