import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logo from '@/assets/images/logo.svg'

import styles from './Navigation/Navigation.module.scss'

const Logo: FC = () => {
  return (
    <Link href={'/'} className={styles.logo}>
      <Image
        src={logo}
        width={200}
        height={34}
        sizes="100%"
        draggable={false}
        alt="Логотип FilmScope"
        priority
      />
    </Link>
  )
}
export default Logo
