import { NextPageAuth } from '@/shared/types/auth.type'

import Admin from '@/screen/admin/home/Admin'

const AdminPage: NextPageAuth = () => {
  return <Admin />
}

AdminPage.isOnlyAdmin = true

export default AdminPage
