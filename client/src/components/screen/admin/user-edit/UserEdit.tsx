import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'
import AuthField from '@/screen/auth/AuthField'

const UserEdit: FC = () => {
  const { handleSubmit, register, formState, setValue, control } =
    useForm<IUserEditInput>({
      mode: 'onChange',
    })

  const { isLoading, onSubmit } = useUserEdit(setValue)

  return (
    <Meta title="Пользователь">
      <AdminNavigation />
      <Heading title="Пользователь" className="mb-4" />

      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <AuthField register={register} formState={formState} />

            <Controller
              control={control}
              name="isAdmin"
              render={({ field }) => (
                <button
                  onClick={e => {
                    e.preventDefault()
                    field.onChange(!field.value)
                  }}
                  className="text-line text-white block mb-7"
                >
                  {field.value
                    ? 'Забрать права администратора'
                    : 'Дать права администратора'}
                </button>
              )}
            />

            <Button>Обноваить</Button>
          </>
        )}
      </form>
    </Meta>
  )
}
export default UserEdit
