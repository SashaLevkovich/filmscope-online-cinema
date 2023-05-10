import { FC } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AuthField from '../auth/AuthField'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
  const { handleSubmit, register, formState, setValue } =
    useForm<IProfileInput>({
      mode: 'onChange',
    })

  const { isLoading, onSubmit } = useProfile(setValue)

  return (
    <Meta title="Профиль">
      <Heading title="Профиль" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isLoading ? (
          <SkeletonLoader count={2} />
        ) : (
          <AuthField register={register} formState={formState} />
        )}

        <Button>Обновить</Button>
      </form>
    </Meta>
  )
}
export default Profile
