import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })
  const router = useRouter()

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router])
}
