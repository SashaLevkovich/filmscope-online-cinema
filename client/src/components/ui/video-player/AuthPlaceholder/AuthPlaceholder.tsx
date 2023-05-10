import { FC } from 'react'

import AuthButton from './AuthButton'
import styles from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
  return (
    <div className={styles.placeholder}>
      <div>
        <div>Ты должен войти в систему для просмотра</div>
        <AuthButton slug={slug} />
      </div>
    </div>
  )
}
export default AuthPlaceholder
