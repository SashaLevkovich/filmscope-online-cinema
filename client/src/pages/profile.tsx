import Profile from '@/screen/profile/Profile'
import { NextPageAuth } from '@/shared/types/auth.type'

const ProfilePage: NextPageAuth = () => {
  return <Profile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
