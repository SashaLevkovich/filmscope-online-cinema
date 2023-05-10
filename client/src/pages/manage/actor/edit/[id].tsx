import { NextPageAuth } from '@/shared/types/auth.type'

import ActorEdit from '@/screen/admin/actor-edit/ActorEdit'

const ActorEditPage: NextPageAuth = () => {
  return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
