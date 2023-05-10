import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import MenuItem from '../MenuItem'

import LogoutBtn from './LogoutBtn'
import { getAdminHomeIdUrl } from '@/config/url.config'

const AuthItem: FC = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <>
          <MenuItem
            item={{
              icon: 'MdPermIdentity',
              link: '/profile',
              title: 'Профиль',
            }}
          />
          <LogoutBtn />
        </>
      ) : (
        <>
          <MenuItem
            item={{
              icon: 'MdLogin',
              link: '/auth',
              title: 'Войти',
            }}
          />
        </>
      )}

      {user?.isAdmin && (
        <MenuItem
          item={{
            icon: 'MdOutlineLock',
            link: getAdminHomeIdUrl(),
            title: 'Админка',
          }}
        />
      )}
    </>
  )
}
export default AuthItem
