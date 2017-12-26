import React from 'react'
import { shallow } from 'enzyme'
import If from '../If'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('<If />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<If />))
  })
})