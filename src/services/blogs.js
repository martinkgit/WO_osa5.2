import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (updatedObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



export default { getAll, update , create, setToken, remove }