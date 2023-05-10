import Link from 'next/link'
import { FC } from 'react'

import styles from './AuthPlaceholder.module.scss'
import { getMovieSlugUrl } from '@/config/url.config'

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
  return (
    <Link
      className={styles.btn}
      href={`/auth?redirect=${getMovieSlugUrl(slug)}`}
    >
      Войти
    </Link>
  )
}
export default AuthButton
