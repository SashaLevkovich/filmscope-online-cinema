import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovie } from './useMovie'

const MovieList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useMovie()

  return (
    <Meta title="Фильмы">
      <AdminNavigation />
      <Heading title="Фильмы" />

      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />

      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={['Название', 'Жанр', 'Рейтинг']}
        tableItems={data || []}
      />
    </Meta>
  )
}
export default MovieList
