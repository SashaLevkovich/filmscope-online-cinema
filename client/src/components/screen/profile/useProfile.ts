import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import { IProfileInput } from './profile.interface'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
  const { query } = useRouter()

  const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
    onSuccess: ({ data }) => {
      setValue('email', data.email)
    },
    onError: error => {
      toastrError(error, 'Получение профиля')
    },
  })

  const { mutateAsync } = useMutation(
    'update profile',
    (data: IProfileInput) => UserService.updateProfile(data),
    {
      onError: error => {
        toastrError(error, 'Получение фильма')
      },
      onSuccess: () => {
        toastr.success('Фильм обновлен', 'операция прощла успешно')
      },
    }
  )

  const onSubmit: SubmitHandler<IProfileInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
