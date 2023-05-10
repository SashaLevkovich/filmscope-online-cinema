import MovieList from '@/screen/admin/movies/MovieList'
import { NextPageAuth } from '@/shared/types/auth.type'



const MovieListPage: NextPageAuth = () => {
  return <MovieList />
}

MovieListPage.isOnlyAdmin = true

export default MovieListPage
