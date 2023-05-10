import { FC } from 'react'

import Button from '@/ui/form-elements/Button'

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button onClick={onClick}>Добавить новую позицию</Button>
}
export default AdminCreateButton