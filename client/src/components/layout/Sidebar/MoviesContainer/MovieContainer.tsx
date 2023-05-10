import dynamic from 'next/dynamic'
import { FC } from 'react'

import FavoriteMovie from './FavoriteMovie/FavoriteMovie'

const DynamicPopularMovies = dynamic(() => import('./PopularMovies'), {
  ssr: false,
})

const MovieContainer: FC = () => {
  return (
    <div>
      <DynamicPopularMovies />
      <FavoriteMovie />
    </div>
  )
}
export default MovieContainer
