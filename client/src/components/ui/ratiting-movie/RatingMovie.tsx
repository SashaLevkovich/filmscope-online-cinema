import { FC } from 'react'
import StarRatingComponent from 'react-star-rating-component'

import { useAuth } from '@/hooks/useAuth'

import AuthButton from '../video-player/AuthPlaceholder/AuthButton'

import styles from './RatingMovie.module.scss'
import { useRatingMovie } from './useRatingMovie'

interface IRatingMovie {
  id: string
  slug: string
}

const RatingMovie: FC<IRatingMovie> = ({ id, slug }) => {
  const { user } = useAuth()
  const { handleClick, isSended, rating } = useRatingMovie(id)

  return (
    <div className={styles.wrapper}>
      <h3>Как вам фильм?</h3>
      <p>Рейтинги улучшают рекомендации</p>
      {user ? (
        <>
          {isSended ? (
            <div className={styles.thanks}>Спасибо за ваш отзыв!</div>
          ) : (
            <StarRatingComponent
              name="star-rating"
              value={rating}
              onStarClick={handleClick}
              emptyStarColor="#4f4f4f"
            />
          )}
        </>
      ) : (
        <AuthButton slug={slug} />
      )}
    </div>
  )
}
export default RatingMovie
