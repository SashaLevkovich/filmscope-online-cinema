import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { MovieService } from '@/services/movie.service'

export const useUpdatedCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation('update actor', () =>
    MovieService.updateCountOpened(slug)
  )

  useEffect(() => {
    mutateAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
