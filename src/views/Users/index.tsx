import React from 'react'
import { errorHandle } from 'utils/helpers'
import { IDLE } from 'store/constants'
import { usersSelector } from 'store/selectors/users'
import { useUnwrapAsyncThunk } from 'store/hooks/useUnwrapAsyncThunk'
import { getUsers as getUsersAction, setStatus } from 'store/slices/apiSlice'
import { useAppDispatch, useShallowEqualSelector } from 'store/hooks'

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

const Users: React.FC<Props> = () => {
  const unwrap = useUnwrapAsyncThunk()
  const dispatch = useAppDispatch()

  const { data: users } = useShallowEqualSelector(usersSelector)

  const getUsers = async () => {
    try {
      await unwrap(getUsersAction())
    } catch (error) {
      errorHandle(error)
    }
  }

  const clearCacheUsers = async () => {
    try {
      dispatch(
        setStatus({
          name: 'users',
          status: IDLE
        })
      )
    } catch (error) {
      errorHandle(error)
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
      <button onClick={clearCacheUsers}>Clear cache users</button>
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
