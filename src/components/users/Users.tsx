import React from 'react'
import Content from '../partials/Content'
import UsersList from './List'
import HttpService from '../../services/Http'
import IUser from './IUser'

export default function Users () {
  const httpService = React.useMemo(() => (new HttpService()), [])
  const [users, setUsers] = React.useState<IUser[]>([])

  React.useEffect(() => {
    const fetchUsers = () => {
      httpService.get<IUser[]>('/api/v1/admin/users')
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    }

    fetchUsers()
  }, [])

  return (
    <Content title="لیست کاربران">
      <UsersList items={users} />
    </Content>
  )
}
