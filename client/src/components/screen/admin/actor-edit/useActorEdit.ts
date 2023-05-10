import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ActorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastrError } from '@/utils/toastr-error'

import { IActorEditInput } from './actor-edit.interface'
import { getAdminIdUrl } from '@/config/url.config'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
  const { push, query } = useRouter()

  const actorId = String(query.id)

  const { isLoading } = useQuery(
    ['actor edit admin', actorId],
    () => ActorService.getById(actorId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key])
        })
      },
      onError: error => {
        toastrError(error, 'Получение актера')
      },
      enabled: !!query.id,
    }
  )

  const { mutateAsync } = useMutation(
    'update actor',
    (data: IActorEditInput) => ActorService.update(actorId, data),
    {
      onError: error => {
        toastrError(error, 'Получение актера')
      },
      onSuccess: () => {
        toastr.success('Актер обновлен', 'операция прощла успешно')
        push(getAdminIdUrl('actors'))
      },
    }
  )

  const onSubmit: SubmitHandler<IActorEditInput> = async data => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}
