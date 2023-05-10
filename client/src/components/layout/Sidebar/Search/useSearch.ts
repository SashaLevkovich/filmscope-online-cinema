import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const debounceTerm = useDebounce(searchTerm, 500)

  const { data, isSuccess } = useQuery(
    ['search movie side bar', debounceTerm],
    () => MovieService.getAll(debounceTerm),
    {
      select: ({ data }) => data,
      enabled: !!debounceTerm,
    }
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return {
    data,
    isSuccess,
    handleSearch,
    searchTerm,
  }
}
