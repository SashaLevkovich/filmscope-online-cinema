import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import FavoritesButton from '@/ui/favorite-button/FavoritesButton'

import { IMovie } from '@/shared/interface/movie.interface'

import styles from './Favorites.module.scss'
import { getMovieSlugUrl } from '@/config/url.config'

const FavoriteItem: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className={styles.itemWrapper}>
      <FavoritesButton movieId={movie._id} />

      <Link href={getMovieSlugUrl(movie.slug)} className={styles.item}>
        <Image
          sizes="100%"
          alt={movie.title}
          src={movie.poster}
          fill
          draggable={false}
          priority
        />

        <div className={styles.title}>{movie.title}</div>
      </Link>
    </div>
  )
}
export default FavoriteItem
