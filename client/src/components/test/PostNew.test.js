import React from 'react'
import { shallow } from 'enzyme'
import { PostNew } from '../PostNew'

describe('<PostNew />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<PostNew onCreatePost={() => {}} createPost={() => {}} />))
  })
})