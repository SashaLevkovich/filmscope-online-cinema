import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastrError } from '@/utils/toastr-error'

import { getAdminIdUrl } from '@/config/url.config'

export const useMovie = () => {
  const [searchTerm, serSearchTerm] = useState('')

  const { push } = useRouter()

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['search movie admin panel', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminIdUrl(`movie/edit/${movie._id}`),
            items: [
              movie.title,
              getGenresList(movie.genres),
              String(movie.rating),
            ],
          })
        ),

      onError: error => toastrError(error, 'Список фильмов'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    serSearchTerm(e.target.value)

  const { mutateAsync: deleteAsync } = useMutation(
    'delete movie admin panel',
    (movieId: string) => MovieService.delete(movieId),
    {
      onError: error => toastrError(error, 'Удаление фильма'),
      onSuccess: () => {
        toastr.success('Успешно', 'Фильм удален')
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: createAsync } = useMutation(
    'create movie admin panel',
    () => MovieService.create(),
    {
      onError(error) {
        toastrError(error, 'Фильм создан')
      },
      onSuccess({ data: _id }) {
        toastr.success('Фильм создан', 'Фильм создан')
        push(getAdminIdUrl(`movie/edit/${_id}`))
      },
    }
  )

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync]
  )
}
