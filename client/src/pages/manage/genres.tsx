import { NextPageAuth } from '@/shared/types/auth.type'

import GenreList from '@/screen/admin/genres/GenreList'

const GenreListPage: NextPageAuth = () => {
  return <GenreList />
}

GenreListPage.isOnlyAdmin = true

export default GenreListPage
