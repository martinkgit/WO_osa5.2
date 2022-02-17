import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/createForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [footerMessage, setFooterMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    localStorage.clear()
    window.location.reload(false)
  }

  const like = id  => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }

    blogService.update(changedBlog, id)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
    blogs.sort((a,b) => ( b.likes > a.likes)  ? 1 : ((a.likes > b.likes) ? -1 : 0))
  }

  const addBlog = async (blogObject) => {

    try{
      await blogService.create(blogObject)

      setFooterMessage(`${blogObject.title} by ${blogObject.author} was added`)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setTimeout(() => {
        setFooterMessage(null)
      }, 5000)
    }catch (exception) {
      setErrorMessage('could no add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const name = blog.title
    const author = blog.author
    if(window.confirm('Are you sure you want to delete this blog?')){
      try{
        await blogService.remove(id)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setFooterMessage(`${name} by ${author} was deleted`)
        setTimeout(() => {
          setFooterMessage(null)
        }, 5000)
      }
      catch(exception) {
        setErrorMessage('could no delete blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  }

  const sortBlogs = () => {
    blogs.sort((a,b) => (b.likes > a.likes)  ? 1 : ((a.likes > b.likes) ? -1 : 0))
    return blogs
  }

  const createForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button id="opencreatebutton" onClick={() => setCreateVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm
            createBlog={addBlog}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if(user===null){
    return (
      <div>
        <h2>Login</h2>
        <Notification message = {errorMessage}></Notification>

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">log in</button>
        </form>
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>

      <Footer message = {footerMessage}></Footer>
      <Notification message = {errorMessage}></Notification>

      <p>user: {user.name} <button id="logout" onClick={() => {handleLogout()}}>logout</button></p>
      {createForm()}
      <p></p>

      {sortBlogs().map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like = {() => like(blog.id)}
          deleteBlog = {() => deleteBlog(blog.id)}
          user= {user}
        />
      )}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {

    return null
  }

  return (
    <div className="error">
      <br />
      <h3>{message}</h3>
    </div>
  )
}

const Footer = ({ message }) => {
  const footerStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {

    return null
  }

  return (
    <div style={footerStyle} className = "footer">
      <br />
      <em>{message}</em>
    </div>
  )
}

export default App