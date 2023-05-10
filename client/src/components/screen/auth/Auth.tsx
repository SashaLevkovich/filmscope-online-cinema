import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import { useAction } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import styles from './Auth.module.scss'
import AuthField from './AuthField'
import { IForm } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
  useAuthRedirect()

  const { isLoading } = useAuth()

  const [type, setType] = useState<'login' | 'register'>('login')

  const { login, register } = useAction()

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IForm>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<IForm> = data => {
    if (type === 'login') login(data)
    else if (type === 'register') register(data)
    reset()
  }

  return (
    <Meta title="Авторизация">
      <section className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Авторизация" className="mb-6" />

          <AuthField
            formState={formState}
            register={registerInput}
            isPasswordRequired
          />

          <div className={styles.buttons}>
            <Button
              type="submit"
              onClick={() => setType('login')}
              disabled={isLoading}
            >
              Авторизация
            </Button>

            <Button type="submit" onClick={() => setType('register')}>
              Регистрация
            </Button>
          </div>
        </form>
      </section>
    </Meta>
  )
}
export default Auth
