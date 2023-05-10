import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import { IMovie } from '@/shared/interface/movie.interface'

import { getGenresListEach } from '@/utils/movie/getGenresListEach'

import styles from './MovieList.module.scss'
import { getGenreSlugUrl, getMovieSlugUrl } from '@/config/url.config'

const MovieItem: FC<{ movie: IMovie }> = ({
  movie: { slug, title, poster, genres, rating },
}) => {
  return (
    <div className={styles.item}>
      <Link href={getMovieSlugUrl(slug)}>
        <Image
          alt={title}
          src={poster}
          width={65}
          height={97}
          draggable={false}
          priority
        />
      </Link>

      <div className={styles.info}>
        <div>
          <h4 className={styles.title}>{title}</h4>
        </div>

        <div className={styles.genres}>
          {genres.map((genre, idx) => (
            <Link href={getGenreSlugUrl(genre.slug)} key={genre._id}>
              {getGenresListEach(genre.name, idx, genres.length)}
            </Link>
          ))}
        </div>

        <div className={styles.rating}>
          <MaterialIcon name="MdStarRate" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}
export default MovieItem
