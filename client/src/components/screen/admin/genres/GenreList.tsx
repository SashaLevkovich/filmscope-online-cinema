import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenre } from './useGenre'

const GenreList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useGenre()

  return (
    <Meta title="Жанры">
      <AdminNavigation />
      <Heading title="Жанры" />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />

      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Жанр', 'Slug']}
        tableItems={data || []}
      />
    </Meta>
  )
}
export default GenreList
