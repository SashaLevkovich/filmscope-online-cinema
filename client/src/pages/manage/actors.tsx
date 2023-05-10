import { NextPageAuth } from '@/shared/types/auth.type'

import ActorList from '@/screen/admin/actors/ActorList'

const ActorListPage: NextPageAuth = () => {
  return <ActorList />
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage
