import { FC, MouseEvent } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import { useAction } from '@/hooks/useActions'

const LogoutBtn: FC = () => {
  const { logout } = useAction()

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    logout()
  }

  return (
    <li>
      <a onClick={handleLogout}>
        <MaterialIcon name="MdLogout" />
        <span>Выход</span>
      </a>
    </li>
  )
}
export default LogoutBtn
