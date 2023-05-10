import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'

import { toastrError } from '@/utils/toastr-error'

import { getAdminIdUrl } from '@/config/url.config'

export const useGenre = () => {
  const [searchTerm, serSearchTerm] = useState('')

  const { push } = useRouter()

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['search genre admin panel', debouncedSearch],
    () => GenreService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (genre): ITableItem => ({
            _id: genre._id,
            editUrl: getAdminIdUrl(`genre/edit/${genre._id}`),
            items: [genre.name, genre.slug],
          })
        ),

      onError: error => toastrError(error, 'Список жанров'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    serSearchTerm(e.target.value)

  const { mutateAsync: deleteAsync } = useMutation(
    'delete genre admin panel',
    (genreId: string) => GenreService.delete(genreId),
    {
      onError: error => toastrError(error, 'Удаление жанра'),
      onSuccess: () => {
        toastr.success('Успешно', 'Жанра удален')
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: createAsync } = useMutation(
    'create genre admin panel',
    () => GenreService.create(),
    {
      onError: error => toastrError(error, 'Создание жанра'),
      onSuccess: ({ data: _id }) => {
        toastr.success('Успешно', 'Жанр создан')
        push(getAdminIdUrl(`genre/edit/${_id}`))
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
