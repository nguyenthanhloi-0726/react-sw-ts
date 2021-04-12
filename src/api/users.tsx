import axios from 'axios'

const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')

export { getUsers }

export default {
  getUsers
}
