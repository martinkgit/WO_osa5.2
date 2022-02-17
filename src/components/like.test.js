import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Clicking like calls event handler twice',async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'TestUser',
    url: '12afsfa3123',
    user: 'TestUser'
  }

  const mockHandler = jest.fn()

  const user = {
    username: 'TestUser'
  }


  const deleteBlog = {
  }

  const component = render(
    <Blog blog={blog}
      like = {mockHandler}
      deleteBlog = {() => deleteBlog(blog.id)}
      user= {user}/>
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)


})