import React from 'react'
import {shallow} from 'enzyme'
import { CommentCard } from '../CommentCard'

describe('<CommentCard />', () => {
  it('shallow without crashing', () => {
    expect(shallow(<CommentCard listComments={
      [
        {
          id: 'JNS98SAMJA',
          parentId: 'MKO08HDNAK',
          body: 'texts comments',
          author: 'jess west',
          voteScore: 4,
          deleted: false,
          parentDeleted: false
        }
      ]
    } />))
  })
})
