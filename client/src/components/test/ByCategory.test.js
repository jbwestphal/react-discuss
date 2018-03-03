import React from 'react'
import {shallow} from 'enzyme'
import { ByCategory } from '../ByCategory'

describe('<ByCategory />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<ByCategory activeCateg={() => {}} categoryPath="" />))
  })
})
