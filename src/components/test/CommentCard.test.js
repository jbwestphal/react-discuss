import React from 'react'
import {shallow} from 'enzyme'
import CommentCard from '../CommentCard'

describe('<CommentCard />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<CommentCard />))
  })
})
