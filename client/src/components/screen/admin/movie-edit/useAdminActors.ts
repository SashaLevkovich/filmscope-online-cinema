import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastrError } from '@/utils/toastr-error'

export const useAdminActors = () => {
  const queryData = useQuery(
    'select actor admin',
    () => ActorService.getAll(),
    {
      select: ({ data }) =>
        data.map(
          (actor): IOption => ({
            label: actor.name,
            value: actor._id,
          })
        ),
      onError: error => toastrError(error, 'Список актеров'),
    }
  )

  return queryData
}
