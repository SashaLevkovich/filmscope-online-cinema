import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({
  item: { link, name, posterPath, content },
  variant,
}) => {
  return (
    <Link
      href={link}
      className={cn(styles.item, {
        [styles.withText]: content,
        [styles.horizontal]: variant === 'horizontal',
        [styles.vertical]: variant === 'vertical',
      })}
    >
      <Image
        alt={name}
        src={posterPath}
        draggable={false}
        sizes="100%"
        fill
        priority
      />
      {content && (
        <div className={styles.content}>
          <div className={styles.title}>{content.title}</div>
          {content.subtitle && (
            <div className={styles.subTitle}> {content.subtitle}</div>
          )}
        </div>
      )}
    </Link>
  )
}
export default GalleryItem
