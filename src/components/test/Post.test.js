import React from 'react'
import {shallow} from 'enzyme'
import { Post } from '../Post'

describe('<Post />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<Post post={
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