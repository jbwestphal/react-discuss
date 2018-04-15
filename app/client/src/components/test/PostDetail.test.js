import React from 'react'
import {shallow} from 'enzyme'
import { PostDetail } from '../PostDetail'

describe('<PostDetail />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<PostDetail post={
      [
        {
          author: 'jess',
          body: 'testing texts',
          category: 'react',
          commentCount: 2,
          deleted: false,
          id: 'KMH86HLA',
          title: 'Post titlte',
          voteScore: 2
        }
      ]
    } />))
  })
})