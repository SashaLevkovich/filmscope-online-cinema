import { FC } from 'react'

import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
  return (
    <Meta title="Панель администратора">
      <AdminNavigation />
      <Heading title="Статистика" />
      <Statistics />
    </Meta>
  )
}
export default Admin
