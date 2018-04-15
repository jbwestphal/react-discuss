import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'

describe('<Header />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Header />))
  })
})