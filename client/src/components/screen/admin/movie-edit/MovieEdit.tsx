import dynamic from 'next/dynamic'
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

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false,
})

const GenreEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IMovieEditInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useMovieEdit(setValue)

  const { isLoading: isActorsLoading, data: actors } = useAdminActors()
  const { isLoading: isGenresLoading, data: genres } = useAdminGenres()

  return (
    <Meta title="Изменение фильма">
      <AdminNavigation />
      <Heading title="Изменение фильма" className="mb-4" />

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('title', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Имя"
                error={errors.title}
                style={{ width: '31%' }}
              />

              <SlugField
                register={register}
                error={errors.slug}
                generate={() =>
                  setValue('slug', generateSlug(getValues('title')))
                }
              />

              <Field
                {...register('parameters.country', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Страна"
                error={errors.parameters?.country}
                style={{ width: '31%' }}
              />

              <Field
                {...register('parameters.duration', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Длительность (мин.)"
                error={errors.parameters?.duration}
                style={{ width: '31%' }}
              />

              <Field
                {...register('parameters.year', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Год выпуска"
                error={errors.parameters?.year}
                style={{ width: '31%' }}
              />

              <Controller
                name="genres"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={genres || []}
                    isLoading={isGenresLoading}
                    isMulti
                    placeholder="Жанры"
                    error={error}
                  />
                )}
                rules={{
                  required: 'Выбирите хотя бы один жанр!',
                }}
              />

              <Controller
                name="actors"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DynamicSelect
                    field={field}
                    options={actors || []}
                    isLoading={isActorsLoading}
                    isMulti
                    placeholder="Актеры"
                    error={error}
                  />
                )}
                rules={{
                  required: 'Выбирите хотя бы одного актера!',
                }}
              />

              <Controller
                name="poster"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    folder="movies"
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Постер"
                  />
                )}
                rules={{
                  required: 'Обязательное поле!',
                }}
              />

              <Controller
                name="bigPoster"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    folder="movies"
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Плакат"
                  />
                )}
                rules={{
                  required: 'Обязательное поле!',
                }}
              />

              <Controller
                name="videoUrl"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    folder="movies"
                    onChange={onChange}
                    value={value}
                    error={error}
                    style={{ marginTop: -25 }}
                    placeholder="Трейлер"
                    isNoImage
                  />
                )}
                rules={{
                  required: 'Обязательное поле!',
                }}
              />

              <Controller
                name="filmUrl"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    folder="movies"
                    onChange={onChange}
                    value={value}
                    error={error}
                    style={{ marginTop: -25 }}
                    placeholder="Фильм"
                    isNoImage
                  />
                )}
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
