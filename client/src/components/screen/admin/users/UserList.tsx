import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUser } from './useUser'

const UserList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data } = useUser()

  return (
    <Meta title="Пользователи">
      <AdminNavigation />
      <Heading title="Пользователи" />

      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

      <AdminTable
        isLoading={isLoading}
        headerItems={['E-mail', 'Дата регистрации']}
        tableItems={data || []}
      />
    </Meta>
  )
}
export default UserList
