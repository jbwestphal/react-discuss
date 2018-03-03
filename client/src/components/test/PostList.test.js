import React from 'react'
import { shallow } from 'enzyme'
import PostList from '../PostList'

describe('<PostList />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<PostList posts={
      [{
        author: 'jess',
        body: 'testing texts',
        category: 'react',
        commentCount: 2,
        deleted: false,
        id: 'KMH86HLA',
        title: 'Post titlte',
        voteScore: 2
      }]
    } voteOnPost={() => {}} deletePost={() => {}} sortPost={() => {}} />))
  })
})