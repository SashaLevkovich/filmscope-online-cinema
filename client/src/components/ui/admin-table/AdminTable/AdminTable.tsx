import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import { ITableItem } from './admin-table.interface'

interface IAdminTable {
  tableItems: ITableItem[]
  isLoading: boolean
  headerItems: string[]
  removeHandler?: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({
  headerItems,
  isLoading,
  removeHandler,
  tableItems,
}) => {
  if (removeHandler !== undefined)
    return (
      <div>
        <AdminTableHeader headersItems={headerItems} />

        {isLoading ? (
          <SkeletonLoader count={6} height={48} className="mt-4" />
        ) : tableItems.length ? (
          tableItems?.map(tableItem => (
            <AdminTableItem
              removeHandler={() =>
                removeHandler ? removeHandler(tableItem._id) : null
              }
              tableItem={tableItem}
              key={tableItem._id}
            />
          ))
        ) : (
          <div className={styles.notFound}>Список пуст</div>
        )}
      </div>
    )

  return (
    <div>
      <AdminTableHeader headersItems={headerItems} />

      {isLoading ? (
        <SkeletonLoader count={6} height={48} className="mt-4" />
      ) : tableItems.length ? (
        tableItems?.map(tableItem => (
          <AdminTableItem tableItem={tableItem} key={tableItem._id} />
        ))
      ) : (
        <div className={styles.notFound}>Список пуст</div>
      )}
    </div>
  )
}
export default AdminTable
