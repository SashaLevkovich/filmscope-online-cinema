import Image from 'next/image'
import { FC } from 'react'

import { ICollection } from './collection.interface'

const CollectionImage: FC<{ collection: ICollection }> = ({
  collection: { image, title },
}) => {
  return <Image alt={title} src={image} fill sizes="100%" draggable={false} />
}

export default CollectionImage
