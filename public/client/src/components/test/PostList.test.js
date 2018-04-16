import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import PostList from '../PostList'

describe('<PostList />', () => {

  const posts = [{
    author: 'jess',
    body: 'testing texts',
    category: 'react',
    commentCount: 2,
    deleted: false,
    id: 'KMH86HLA',
    title: 'Post titlte',
    voteScore: 2
  }]

  it('shallow renders correctly', () => {
    expect(shallow(<PostList posts={posts} voteOnPost={() => {}} deletePost={() => {}} sortPost={() => {}} />))
  })

  it('expects to map trough an array of items and creates a Post for each one of them', () => {
    const wrapper = mount(
    <MemoryRouter>
      <PostList posts={posts} voteOnPost={() => {}} deletePost={() => {}} sortPost={() => {}} />
    </MemoryRouter>)

    expect(wrapper.find('div.post-container').length).toBe(1)
  })
})