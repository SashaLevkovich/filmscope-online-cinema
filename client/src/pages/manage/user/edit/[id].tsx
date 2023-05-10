import { NextPageAuth } from '@/shared/types/auth.type'

import UserEdit from '@/screen/admin/user-edit/UserEdit'

const UserEditPage: NextPageAuth = () => {
  return <UserEdit />
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
