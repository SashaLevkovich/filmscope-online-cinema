import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/ui/SkeletonLoader'
import SubHeading from '@/ui/heading/SubHeading'

import { IMovie } from '@/shared/interface/movie.interface'

import { MovieService } from '@/services/movie.service'

import styles from '../Admin.module.scss'

import { getMovieUrl } from '@/config/api.config'

const PopularMovie: FC = () => {
  const { isLoading, data: movie } = useQuery(
    'Popular movie',
    () => MovieService.getPopular(),
    { select: (data): IMovie => data[0] }
  )

  return (
    <div className={cn(styles.block, styles.popular)}>
      <SubHeading title="Самый популярный фильм" />
      {isLoading ? (
        <SkeletonLoader className="h-48" />
      ) : (
        movie && (
          <>
            <h3>Просмотрен {movie.countOpened} раз(а)</h3>
            <Link href={getMovieUrl(movie.slug)}>
              <Image
                width={285}
                height={176}
                src={movie.bigPoster}
                alt={movie.title}
                className={styles.image}
                unoptimized
              />
            </Link>
          </>
        )
      )}
    </div>
  )
}
export default PopularMovie
