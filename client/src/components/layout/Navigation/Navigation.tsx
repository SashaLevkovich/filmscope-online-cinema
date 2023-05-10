import { FC } from 'react'

import Logo from '../Logo'

import MenuContainer from './Menu/MenuContainer'
import styles from './Navigation.module.scss'

const Navigation: FC = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <MenuContainer />
    </nav>
  )
}
export default Navigation
