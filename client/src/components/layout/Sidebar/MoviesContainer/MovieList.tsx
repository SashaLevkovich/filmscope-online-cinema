import Link from 'next/link'
import { FC } from 'react'

import MovieItem from './MovieItem'
import styles from './MovieList.module.scss'
import { IMovieList } from './movie-list.interface'

const MovieList: FC<IMovieList> = ({ movies, link, title }) => {
  return (
    <div className={styles.list}>
      <h3 className={styles.heading}>{title}</h3>
      {movies.slice(0, 3).map(movie => (
        <MovieItem key={movie._id} movie={movie} />
      ))}

      <Link href={link} className={styles.link}>
        Смотреть ещё
      </Link>
    </div>
  )
}
export default MovieList
