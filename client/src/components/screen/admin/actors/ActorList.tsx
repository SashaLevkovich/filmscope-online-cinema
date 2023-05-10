import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useActor } from './useActor'

const ActorList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useActor()

  return (
    <Meta title="Актеры">
      <AdminNavigation />
      <Heading title="Актеры" />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />

      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Имя', 'Кол-во фильмов']}
        tableItems={data || []}
      />
    </Meta>
  )
}
export default ActorList
