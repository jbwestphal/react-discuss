import React from 'react'
import {shallow} from 'enzyme'
import Modal from '../Modal'

describe('<Modal />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<Modal />))
  })
})
