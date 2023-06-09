import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { GenreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IGenreEditInput } from './genre-edit.interface'
import { getAdminIdUrl } from '@/config/url.config'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
  const { push, query } = useRouter()

  const genreId = String(query.id)

  const { isLoading } = useQuery(
    ['genre edit admin', genreId],
    () => GenreService.getById(genreId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key])
        })
      },
      onError: error => {
        toastrError(error, 'Get genre')
      },
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    'update genre',
    (data: IGenreEditInput) => GenreService.update(genreId, data),
    {
      onError: error => {
        toastrError(error, 'Get genre')
      },
      onSuccess: () => {
        toastr.success('Жанр обновлен', 'операция прощла успешно')
        push(getAdminIdUrl('genres'))
      },
    }
  )

  const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
