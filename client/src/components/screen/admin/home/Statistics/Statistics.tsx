import { FC } from 'react'

import styles from '../Admin.module.scss'

import Admins from './Admins'
import CountUsers from './CountUsers'
import PopularMovie from './PopularMovie'

const Statistics: FC = () => {
  return (
    <div>
      <div className={styles.statistics}>
        <CountUsers />
        <PopularMovie />
        <Admins />
      </div>
    </div>
  )
}
export default Statistics
