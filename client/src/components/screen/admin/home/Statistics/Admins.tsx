import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'
import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useUser } from '../../users/useUser'
import styles from '../Admin.module.scss'

const Admins: FC = () => {
  const { isLoading, data } = useUser()

  const admins: ITableItem[] = data?.filter(
    el => el.isAdmin && el.items[0] === 'admin@admin.com'
  )

  return (
    <Link
      href={'/manage/admins'}
      className={cn(styles.block, styles.countUsers)}
    >
      <div>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className={styles.number}>{admins.length}</div>
        )}
        <div className={styles.description}>администраторов</div>
      </div>
    </Link>
  )
}
export default Admins
