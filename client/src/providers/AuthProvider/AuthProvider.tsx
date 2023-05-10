import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useAction } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from '@/shared/types/auth.type'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields> = ({
  children,
  Component: { isOnlyAdmin, isOnlyUser },
}) => {
  const { user } = useAuth()

  const { logout, checkAuth } = useAction()

  const { pathname } = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')

    if (accessToken) checkAuth()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken')

    if (!refreshToken && user) logout()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return !isOnlyAdmin && !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  )
}

export default AuthProvider
