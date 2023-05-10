import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { MovieService } from '@/services/movie.service'

import MovieList from './MovieList'

const PopularMovies: FC = () => {
  const { isLoading, data: movies } = useQuery(
    'get popular movie sidebar',
    () => MovieService.getPopular()
  )
  return (
    <div>
      {isLoading ? (
        <div className="mt-11">
          <SkeletonLoader count={5} className="h-10 mb-4" />
        </div>
      ) : (
        <MovieList
          movies={movies || []}
          link="/trending"
          title="Популярные фильмы"
        />
      )}
    </div>
  )
}
export default PopularMovies
