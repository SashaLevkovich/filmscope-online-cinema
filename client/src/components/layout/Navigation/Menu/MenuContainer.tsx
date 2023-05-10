import { FC } from 'react'

import Menu from './Menu'
import GenreMenu from './genre/GenreMenu'
import { firstMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
  return (
    <div>
      <Menu menu={firstMenu} />
      <GenreMenu />
      <Menu menu={userMenu} />
    </div>
  )
}
export default MenuContainer
