import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import UploadField from '@/ui/form-elements/UploadsField/UploadField'
import formStyles from '@/ui/form-elements/admin-form.module.scss'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

 const GenreEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IActorEditInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useActorEdit(setValue)

  return (
    <Meta title="Изменение жанра">
      <AdminNavigation />
      <Heading title="Изменение жанра" className="mb-4" />

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Имя"
                error={errors.name}
                style={{ width: '31%' }}
              />

              <SlugField
                register={register}
                error={errors.slug}
                generate={() =>
                  setValue('slug', generateSlug(getValues('name')))
                }
              />

              <Controller
                name="photo"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    folder="actors"
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Фото"
                  />
                )}
                rules={{
                  required: 'Обязательное поле!',
                }}
              />
            </div>

            <Button>Обноваить</Button>
          </>
        )}
      </form>
    </Meta>
  )
}
export default GenreEdit
