import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUser } from '../users/useUser'

const AdminList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUser()

  const admins: ITableItem[] = data?.filter(el => el.isAdmin)

  return (
    <Meta title="Админы">
      <AdminNavigation />
      <Heading title="Админы" />

      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['E-mail', 'Дата регистрации']}
        tableItems={admins || []}
      />
    </Meta>
  )
}
export default AdminList
