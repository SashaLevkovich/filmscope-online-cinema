import { NextPageAuth } from '@/shared/types/auth.type'

import GenreEdit from '@/screen/admin/genre-edit/GenreEdit'

const GenreEditPage: NextPageAuth = () => {
  return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
