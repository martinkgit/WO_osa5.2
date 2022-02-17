import React, { useState } from 'react'
const Blog = ({ blog, like, deleteBlog, user }) => {

  const [urlVisible, setUrlVisible] = useState(false)

  const viewUrl = (blog) => {
    const hideWhenVisible = { display: urlVisible ? 'none' : '' }
    const showWhenVisible = { display: urlVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button id="opencreatebutton" onClick={() => setUrlVisible(true)}>view url</button>
        </div>
        <div style={showWhenVisible}>
        Url: {blog.url}
          <button onClick={() => setUrlVisible(false)}>hide</button>
        </div>
      </div>
    )
  }


  const blogUser = blog.user
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(blogUser.username===user.username){
    return(
      <div style={blogStyle}>
        {blog.title} by {blog.author} , likes: {blog.likes}
        <button onClick={() => {like(blog.id)}}>Like</button>
        <button onClick={() => {deleteBlog(blog.id)}}>Delete</button>
        {viewUrl(blog)}
      </div>
    )
  }
  else{
    return(
      <div style={blogStyle}>
        {blog.title} by {blog.author} , likes: {blog.likes}
        <button onClick={() => {like(blog.id)}}>Like</button>
      </div>
    )
  }
}

export default Blog