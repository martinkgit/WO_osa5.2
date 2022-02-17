import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'TestUser',
    url: '12afsfa3123',
    user: 'TestUser'
  }

  const user = {
    username: 'TestUser'
  }
  const like = {

  }

  const deleteBlog = {
  }

  const component = render(
    <Blog blog={blog}
      like = {() => like(blog.id)}
      deleteBlog = {() => deleteBlog(blog.id)}
      user= {user}/>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library',
    'TestUser',
    '12afsfa3123'
  )


})