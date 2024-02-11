import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setLoggedInUser } from '../store/users'
import { useGetMeQuery } from '../store/api/usersApiSlice'

export const useAuthCheck = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    console.log('user:', user)

    if (!isLoading) {
      if (user?.username) {
        dispatch(setLoggedInUser(user))
        if (router.pathname === '/') {
          router.replace('/noon')
        }
      } else {
        router.replace('/')
      }
    }
  }, [user, isLoading, dispatch])

  return { user, isLoading }
}
