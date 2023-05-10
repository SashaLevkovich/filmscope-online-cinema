import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { RatingService } from '@/services/rating.service'

import { toastrError } from '@/utils/toastr-error'

export const useRatingMovie = (movieId: string) => {
  const [rating, setRating] = useState(0)
  const [isSended, setSended] = useState(false)

  const { refetch } = useQuery(
    ['your movie rating', movieId],
    () => RatingService.getByUserMovie(movieId),
    {
      onSuccess: ({ data }) => {
        setRating(data)
      },
      onError: error => {
        toastrError(error, 'Рейтинг не получен')
      },
      enabled: !!movieId,
    }
  )

  const { mutateAsync } = useMutation(
    'set rating movie',
    ({ value }: { value: number }) => RatingService.setRating(movieId, value),
    {
      onError: error => {
        toastrError(error, 'Рейтинг фильма')
      },
      onSuccess: () => {
        toastr.success('Вы оставили рейтинг', 'Спасибо за Ваш отзыв!')

        setSended(true)
        refetch()

        setTimeout(() => {
          setSended(false)
        }, 5000)
      },
    }
  )

  const handleClick = async (nextValue: number) => {
    setRating(nextValue)
    await mutateAsync({ value: nextValue })
  }

  return { handleClick, isSended, rating }
}
