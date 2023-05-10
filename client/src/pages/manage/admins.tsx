import { NextPageAuth } from '@/shared/types/auth.type'

import AdminList from '@/screen/admin/admins/AdminList'

const AdminsListPage: NextPageAuth = () => {
  return <AdminList />
}

AdminsListPage.isOnlyAdmin = true

export default AdminsListPage
