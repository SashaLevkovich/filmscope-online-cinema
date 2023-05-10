import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'
import FavoritesButton from '@/ui/favorite-button/FavoritesButton'

import { IMovie } from '@/shared/interface/movie.interface'

import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'
import { getActorSlugUrl, getGenreSlugUrl } from '@/config/url.config'

const Content: FC<{ movie: IMovie }> = ({
  movie: {
    _id,
    title,
    rating,
    genres,
    actors,
    parameters: { year, country, duration },
  },
}) => {
  return (
    <div className={styles.content}>
      <h1>{title}</h1>

      <div className={styles.rating}>
        <MaterialIcon name="MdStarRate" />
        <span>{rating.toFixed(1)}</span>
      </div>

      <div className={styles.details}>
        <span>{year} · </span>
        <span>{country} · </span>
        <span>{duration} мин.</span>
      </div>
      <ContentList
        name="Жанр"
        links={genres.map(genre => ({
          link: getGenreSlugUrl(genre.slug),
          title: genre.name,
          _id: genre._id,
        }))}
      />
      <ContentList
        name="Актер"
        links={actors.map(actor => ({
          link: getActorSlugUrl(actor.slug),
          title: actor.name,
          _id: actor._id,
        }))}
      />

      <FavoritesButton movieId={_id} />
    </div>
  )
}
export default Content
