import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { useGenre } from '@/layout/Navigation/Menu/genre/useGenres'

import Menu from '../Menu'

const GenreMenu: FC = () => {
  const { isLoading, data } = useGenre()

  return isLoading ? (
    <div className="mx-11 mb-6">
      <SkeletonLoader count={4} className="h-7 mt-6" />
    </div>
  ) : (
    <Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
  )
}
export default GenreMenu
