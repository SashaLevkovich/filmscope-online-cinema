import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminGenres = () => {
  const queryData = useQuery(
    'select genre admin',
    () => GenreService.getAll(),
    {
      select: ({ data }) =>
        data.map(
          (genre): IOption => ({
            label: genre.name,
            value: genre._id,
          })
        ),
      onError: error => toastrError(error, 'Список актеров'),
    }
  )

  return queryData
}
