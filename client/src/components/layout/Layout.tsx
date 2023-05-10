import dynamic from 'next/dynamic'
import { FC, ReactNode } from 'react'

import styles from './Layout.module.scss'

const DynamicNavigation = dynamic(() => import('./Navigation/Navigation'), {
  ssr: false,
})

const DynamicSidebar = dynamic(() => import('./Sidebar/Sidebar'), {
  ssr: false,
})

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <DynamicNavigation />
      <div className={styles.center}>{children}</div>
      <DynamicSidebar />
    </div>
  )
}
export default Layout
