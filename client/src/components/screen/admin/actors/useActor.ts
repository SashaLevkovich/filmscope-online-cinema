import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

import { getAdminIdUrl } from '@/config/url.config'

export const useActor = () => {
  const [searchTerm, serSearchTerm] = useState('')

  const { push } = useRouter()

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['search actor admin panel', debouncedSearch],
    () => ActorService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (actor): ITableItem => ({
            _id: actor._id,
            editUrl: getAdminIdUrl(`actor/edit/${actor._id}`),
            items: [actor.name, String(actor.countMovies)],
          })
        ),

      onError: error => toastrError(error, 'Список актеров'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    serSearchTerm(e.target.value)

  const { mutateAsync: deleteAsync } = useMutation(
    'delete actor admin panel',
    (actorId: string) => ActorService.delete(actorId),
    {
      onError: error => toastrError(error, 'Удаление актера'),
      onSuccess: () => {
        toastr.success('Успешно', 'Актер удален')
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: createAsync } = useMutation(
    'create actor admin panel',
    () => ActorService.create(),
    {
      onError: error => toastrError(error, 'Создание актера'),
      onSuccess: ({ data: _id }) => {
        toastr.success('Успешно', 'Актер создан')
        push(getAdminIdUrl(`actor/edit/${_id}`))
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
