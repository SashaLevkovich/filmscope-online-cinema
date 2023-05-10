import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUser } from './useUser'

const UserList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUser()

  const users: ITableItem[] = data?.filter(el => !el.isAdmin)

  return (
    <Meta title="Пользователи">
      <AdminNavigation />
      <Heading title="Пользователи" />

      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['E-mail', 'Дата регистрации']}
        tableItems={users || []}
      />
    </Meta>
  )
}
export default UserList
