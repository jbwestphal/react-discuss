import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Post } from '../Post'

describe('<Post />', () => {

  const item = {
    author: 'jess',
    body: 'testing texts',
    category: 'react',
    commentCount: 2,
    deleted: false,
    id: 'KMH86HLA',
    title: 'Post title',
    voteScore: 2
  }

  // self render
  it('shallow without crashing', () => {
    expect(shallow(<Post onClickVote={() => {}} onDeletePost={() => {}} width="" post={item} />))
  })

  // children testing render
  it('mounts correctly', () => {
    expect(mount(
    <MemoryRouter>
      <Post onClickVote={() => {}} onDeletePost={() => {}} width="" post={item} />
    </MemoryRouter>
    ))
  })

  it('renders detailButton if btnDetail is equals to true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Post btnDetail={true} onClickVote={() => {}} onDeletePost={() => {}} width="" post={item} />
      </MemoryRouter>);

    expect(wrapper.find('a.detailButton').length).toBe(1)
  })

  it('DONT renders detailButton if btnDetail is equals to false', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Post btnDetail={false} onClickVote={() => {}} onDeletePost={() => {}} width="" post={item} />
      </MemoryRouter>);

    expect(wrapper.find('a.detailButton').length).toBe(0)
  })
})