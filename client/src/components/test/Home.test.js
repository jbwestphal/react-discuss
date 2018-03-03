import React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../Home'

describe('<Home />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Home activeCateg={() => {}} />))
  })
})