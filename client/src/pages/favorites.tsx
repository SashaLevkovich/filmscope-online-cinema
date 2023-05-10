import { NextPageAuth } from '@/shared/types/auth.type'

import Favorites from '@/screen/favorites/Favorites'

const FavoritesPage: NextPageAuth = () => {
  return <Favorites />
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
