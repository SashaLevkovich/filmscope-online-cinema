import Link from 'next/link'
import { FC } from 'react'

import styles from './Collection.module.scss'
import CollectionImage from './CollectionImage'
import { ICollection } from './collection.interface'
import { getGenreSlugUrl } from '@/config/url.config'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
  return (
    <Link href={getGenreSlugUrl(collection.slug)} className={styles.collection}>
      <CollectionImage collection={collection} />

      <div className={styles.content}>
        <div className={styles.title}>{collection.title}</div>
      </div>

      <div className={`${styles.behind} ${styles.second}`}>
        <CollectionImage collection={collection} />
      </div>

      <div className={`${styles.behind} ${styles.third}`}>
        <CollectionImage collection={collection} />
      </div>
    </Link>
  )
}
export default CollectionItem
