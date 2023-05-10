import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const heandler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(heandler)
  }, [delay, value])

  return debounceValue
}
