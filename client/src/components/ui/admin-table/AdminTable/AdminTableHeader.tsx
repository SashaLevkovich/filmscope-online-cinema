import cn from 'classnames'
import { FC } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableHeader: FC<{ headersItems: string[] }> = ({ headersItems }) => {
  return (
    <div className={cn(styles.item, styles.itemHeader)}>
      {headersItems.map(headersItem => (
        <div key={headersItem}>{headersItem}</div>
      ))}
      <div>Действия</div>
    </div>
  )
}
export default AdminTableHeader
