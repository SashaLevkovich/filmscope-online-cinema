import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IUserEditInput } from './user-edit.interface'
import { getAdminIdUrl } from '@/config/url.config'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { push, query } = useRouter()

  const userId = String(query.id)

  const { isLoading } = useQuery(
    ['user edit admin', userId],
    () => UserService.getById(userId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue('email', data.email)
          setValue('isAdmin', data.isAdmin)
        })
      },
      onError: error => {
        toastrError(error, 'Пользователь не найден')
      },
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    'update user',
    (data: IUserEditInput) => UserService.update(userId, data),
    {
      onError: error => {
        toastrError(error, 'Пользователь не найден')
      },
      onSuccess: () => {
        toastr.success('Пользователь обновлен', 'операция прошла успешно')
        push(getAdminIdUrl('users'))
      },
    }
  )

  const onSubmit: SubmitHandler<IUserEditInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
