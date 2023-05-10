import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/form-elements/Field'

import { validEmail } from '@/shared/regex'

interface IAuthFields {
  register: UseFormRegister<any>
  formState: FormState<any>
  isPasswordRequired?: boolean
}

const AuthField: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
      <Field
        {...register('email', {
          required: 'Это поле обязательное для заполнения',
          pattern: { value: validEmail, message: 'Введите корректный E-mail' },
        })}
        placeholder="E-mail"
        error={errors.email}
      />

      <Field
        {...register(
          'password',
          isPasswordRequired
            ? {
                required: 'Это поле обязательное для заполнения',
                minLength: {
                  value: 6,
                  message: 'Пароль должен быть от 6 символов',
                },
              }
            : {}
        )}
        type="password"
        placeholder="Пароль"
        error={errors.password}
      />
    </>
  )
}
export default AuthField
