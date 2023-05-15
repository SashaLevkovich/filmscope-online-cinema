import cn from 'classnames'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { IMenu } from './menu.interface'

const DynamicAuthItem = dynamic(() => import('./auth/AuthItem'), { ssr: false })

const Menu: FC<{ menu: IMenu }> = ({ menu: { title, items, className } }) => {
  return (
    <div className={cn(styles.menu, className)}>
      <h3 className={styles.heading}>{title}</h3>

      <ul className={styles.ul}>
        {items.map(item => (
          <MenuItem item={item} key={item.link} />
        ))}

        {title === 'Пользователь' ? <DynamicAuthItem /> : null}
      </ul>
    </div>
  )
}
export default Menu
