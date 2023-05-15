import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import Menu from '../Menu'

import { useGenre } from '@/layout/Navigation/Menu/genre/useGenres'

const GenreMenu: FC = () => {
  const { isLoading, data } = useGenre()

  return isLoading ? (
    <div className="mx-11 mb-6">
      <SkeletonLoader count={4} className="h-7 mt-6" />
    </div>
  ) : (
    <Menu
      menu={{
        title: 'Популярные жанры',
        items: data || [],
        className: 'hidden lg:block',
      }}
    />
  )
}
export default GenreMenu
