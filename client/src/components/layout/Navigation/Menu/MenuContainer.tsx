import { FC } from 'react'

import Menu from './Menu'
import styles from './Menu.module.scss'
import GenreMenu from './genre/GenreMenu'
import { firstMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
  return (
    <div className={styles.container}>
      <Menu menu={firstMenu} />
      <GenreMenu />
      <Menu menu={userMenu} />
    </div>
  )
}
export default MenuContainer
