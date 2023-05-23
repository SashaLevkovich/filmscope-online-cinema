import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-panel/AdminNavigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import formStyles from '@/ui/form-elements/admin-form.module.scss'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const DynamicTextEditor = dynamic(
  () => import('@/ui/form-elements/TextEditor'),
  { ssr: false }
)

const GenreEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IGenreEditInput>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit } = useGenreEdit(setValue)

  return (
    <Meta title="Жанр">
      <AdminNavigation />
      <Heading title="Жанр" className="mb-4" />

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

              <div style={{ width: '31%' }}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  generate={() =>
                    setValue('slug', generateSlug(getValues('name')))
                  }
                />
              </div>

              <Field
                {...register('icon', {
                  required: 'Обязательное поле!',
                })}
                placeholder="Иконка"
                error={errors.icon}
                style={{ width: '31%' }}
              />

              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DynamicTextEditor
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Описание"
                  />
                )}
                rules={{
                  validate: {
                    required: v =>
                      (v && stripHtml(v).result.length > 0) ||
                      'Обязательное поле!',
                  },
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
