import React, { useState } from 'react'
import { setLoading } from 'store/actions/root'
import { useAppDispatch } from 'store/hooks'
import { getUsers as getUsersAPI } from 'api/users'
import { ensureArray, errorHandle } from 'utils/helpers'

import './style.scss'

type Props = {}

type TCompany = {
  name: string
}

type TUser = {
  id: number
  company: TCompany
  name: string
  mail: string
  phone: string
}

const Users: React.FC<Props> = props => {
  const dispatch = useAppDispatch()

  const [users, setUsers] = useState<[] | undefined>(undefined)

  const getUsers = async () => {
    try {
      dispatch(setLoading(true))

      const { data } = await getUsersAPI()

      setUsers(ensureArray(data))
    } catch (error) {
      errorHandle(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const renderUserTable = () => {
    if (!users?.length) {
      return null
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ id, company, name, mail, phone }: TUser) => (
            <tr key={id}>
              <td>{company.name}</td>
              <td>{name}</td>
              <td>{mail}</td>
              <td>{phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const emptyLayout = <div>Empty!</div>

  return (
    <div className="users">
      <button onClick={getUsers}>Get users</button>
      <br />
      {users !== undefined && (
        <>
          <div>Users:</div>
          <div>
            <br />
            {users.length ? renderUserTable() : emptyLayout}
          </div>
        </>
      )}
    </div>
  )
}

export default Users
