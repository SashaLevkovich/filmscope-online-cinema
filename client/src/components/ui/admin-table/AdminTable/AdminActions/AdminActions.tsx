import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './AdminActions.module.scss'

interface IAdminActions {
  editUrl: string
  removeHandler?: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
  const { push } = useRouter()

  return (
    <div className={styles.actions}>
      <button onClick={() => push(editUrl)}>
        <MaterialIcon name="MdEdit" />
      </button>

      {removeHandler ? (
        <button onClick={removeHandler}>
          <MaterialIcon name="MdDelete" />
        </button>
      ) : null}
    </div>
  )
}
export default AdminActions
