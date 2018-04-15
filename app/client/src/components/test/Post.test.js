import React from 'react'
import { shallow, mount } from 'enzyme'
import { Post } from '../Post'

describe('<Post />', () => {

  const item = {
    author: 'jess',
    body: 'testing texts',
    category: 'react',
    commentCount: 2,
    deleted: false,
    id: 'KMH86HLA',
    title: 'Post titlte',
    voteScore: 2
  }

  it('shallow without crashing', () => {
    expect(shallow(<Post onClickVote={() => {}} onDeletePost={() => {}} width="" post={item} />))
  })
})