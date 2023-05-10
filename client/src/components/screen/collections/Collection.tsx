import { FC } from 'react'

import Description from '@/ui/heading/Description'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Collection.module.scss'
import { ICollection } from './collection.interface'
import CollectionItem from './CollectionItem'

const Collection: FC<{ collections: ICollection[] }> = ({ collections }) => {
  return (
    <Meta
      title="Коллекция"
      description="В этом разделе вы найдете все жанры на нашем сайте"
    >
      <Heading title="Коллекция" className={styles.heading} />
      <Description
        text="В этом разделе вы найдете все жанры на нашем сайте"
        className={styles.description}
      />

      <section className={styles.collections}>
        {collections.map(collection => (
          <CollectionItem key={collection._id} collection={collection} />
        ))}
      </section>
    </Meta>
  )
}
export default Collection
