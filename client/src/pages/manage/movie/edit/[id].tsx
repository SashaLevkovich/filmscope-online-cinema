import { NextPageAuth } from '@/shared/types/auth.type'

import MovieEdit from '@/screen/admin/movie-edit/MovieEdit'

const MovieEditPage: NextPageAuth = () => {
  return <MovieEdit />
}

MovieEditPage.isOnlyAdmin = true

export default MovieEditPage
