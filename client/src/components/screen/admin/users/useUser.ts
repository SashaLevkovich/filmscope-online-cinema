import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/user.service'

import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastrError } from '@/utils/toastr-error'

import { getAdminIdUrl } from '@/config/url.config'

export const useUser = () => {
  const [searchTerm, serSearchTerm] = useState('')

  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(
    ['search user admin panel', debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (user): ITableItem => ({
            _id: user._id,
            editUrl: getAdminIdUrl(`user/edit/${user._id}`),
            items: [user.email, convertMongoDate(user.createdAt)],
            isAdmin: user.isAdmin,
          })
        ),

      onError: error => toastrError(error, 'Список пользователей'),
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    serSearchTerm(e.target.value)

  const { mutateAsync: deleteAsync } = useMutation(
    'delete user admin panel',
    (userId: string) => UserService.delete(userId),
    {
      onError: error => toastrError(error, 'Удаление пользователя'),
      onSuccess: () => {
        toastr.success('Успешно', 'Пользователь удален')
        queryData.refetch()
      },
    }
  )

  return useMemo(
    () => ({ handleSearch, ...queryData, searchTerm, deleteAsync }),
    [queryData, searchTerm, deleteAsync]
  )
}
