import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../Footer'

describe('<Footer />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Footer />))
  })
})