import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetMeQuery } from '../store/api/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '../store/users'

export const useAuthCheck = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user?.username) {
        dispatch(setLoggedInUser(user))
        if (router.pathname === '/') {
          router.replace('/noon')
        }
      } else if (router.pathname !== '/onboarding') {
        router.replace('/onboarding')
      }
    }
  }, [user, isLoading, router, dispatch])

  return { user, isLoading }
}
