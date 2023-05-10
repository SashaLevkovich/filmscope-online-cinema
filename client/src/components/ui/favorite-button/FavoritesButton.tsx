import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import styles from './FavoritesButton.module.scss'
import { useFavorites } from '@/screen/favorites/useFavorites'

const FavoritesButton: FC<{ movieId: string }> = ({ movieId }) => {
  const [isSmashed, setSmashed] = useState(false)

  const { favoriteMovies, refetch } = useFavorites()

  useEffect(() => {
    if (!favoriteMovies) return

    const isHasMovie = favoriteMovies.some(favorite => favorite._id === movieId)

    if (isSmashed !== isHasMovie) setSmashed(isHasMovie)
  }, [favoriteMovies, isSmashed, movieId])

  const { mutateAsync } = useMutation(
    'update favorite',
    () => UserService.toggleFavorites(movieId),
    {
      onError: error => {
        toastrError(error, 'Не удалось добавить')
      },
      onSuccess: () => {
        setSmashed(!isSmashed)
        refetch()
      },
    }
  )

  return (
    <button
      onClick={() => mutateAsync()}
      className={cn(styles.button, {
        [styles.animate]: isSmashed,
      })}
      style={{ backgroundImage: `url('/heart-animation.png')` }}
    />
  )
}

export default FavoritesButton
