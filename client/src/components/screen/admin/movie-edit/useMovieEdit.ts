import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { MovieService } from '@/services/movie.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IMovieEditInput } from './movie-edit.interface'
import { getAdminIdUrl } from '@/config/url.config'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
  const { push, query } = useRouter()

  const movieId = String(query.id)

  const { isLoading } = useQuery(
    ['movie edit admin', movieId],
    () => MovieService.getById(movieId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key])
        })
      },
      onError: error => {
        toastrError(error, 'Получение фильма')
      },
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    'update movie',
    (data: IMovieEditInput) => MovieService.update(movieId, data),
    {
      onError: error => {
        toastrError(error, 'Получение фильма')
      },
      onSuccess: () => {
        toastr.success('Фильм обновлен', 'операция прощла успешно')
        push(getAdminIdUrl('movies'))
      },
    }
  )

  const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
