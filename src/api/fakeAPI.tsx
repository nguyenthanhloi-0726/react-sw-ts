import axios from 'axios'

const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')

const getTodo = () => axios.get('https://jsonplaceholder.typicode.com/todo')

const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')

export { getUsers, getTodo, getPosts }

export default {
  getUsers,
  getTodo,
  getPosts
}
