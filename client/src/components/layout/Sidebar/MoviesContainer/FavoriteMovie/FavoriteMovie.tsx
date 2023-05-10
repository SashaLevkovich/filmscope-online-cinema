import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NotAuthFavorite from './NotAuthFavorite'
import { useFavorites } from '@/screen/favorites/useFavorites'

const FavoriteMovie: FC = () => {
  const { favoriteMovies, isLoading } = useFavorites()
  const { user } = useAuth()

  if (!user) return <NotAuthFavorite />

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={3} className="h-28 mb-4" />
    </div>
  ) : (
    <div>
      <MovieList
        movies={favoriteMovies?.slice(0, 3) || []}
        link="/favorites"
        title="Избранные"
      />
    </div>
  )
}
export default FavoriteMovie
