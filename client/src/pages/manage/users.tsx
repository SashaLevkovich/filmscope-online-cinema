import { NextPageAuth } from '@/shared/types/auth.type'

import UserList from '@/screen/admin/users/UserList'

const UsersListPage: NextPageAuth = () => {
  return <UserList />
}

UsersListPage.isOnlyAdmin = true

export default UsersListPage
