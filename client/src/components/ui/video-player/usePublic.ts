import { useAuth } from '@/hooks/useAuth'

export const usePublic = (isPublic: boolean) => {
  const { user } = useAuth()

  if (isPublic) return isPublic
  else return { user, isPublic }
}
