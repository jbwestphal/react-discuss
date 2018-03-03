import React from 'react'
import { shallow } from 'enzyme'
import { PostEdit } from '../PostEdit'

describe('<PostEdit />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<PostEdit onEditPost={() => {}} postId="" categoryId="" listPostDetail={[{
      author: "test",
      body: "test",
      id: "KO98DJMKA",
      title: "test"
    }]} />))
  })
})