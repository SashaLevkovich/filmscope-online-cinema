import { useEffect, useState } from 'react'

export const useRenderClient = () => {
  const [isRenderClient, setRenderClient] = useState(false)

  useEffect(() => {
    !isRenderClient && setRenderClient(true)
  }, [isRenderClient])

	return {isRenderClient}
}
