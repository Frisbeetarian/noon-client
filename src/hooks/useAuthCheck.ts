import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { setLoggedInUser } from '../store/users'
import { useGetMeQuery } from '../store/api/usersApiSlice'
import { getIsRegistering } from '../store/ui'

export const useAuthCheck = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined)
  const dispatch = useDispatch()
  const router = useRouter()
  const isRegistering = useSelector(getIsRegistering)

  useEffect(() => {
    if (!isLoading && !isRegistering) {
      if (user?.username) {
        dispatch(setLoggedInUser(user))
        if (router.pathname === '/') {
          router.replace('/noon')
        }
      } else {
        router.replace('/')
      }
    }
  }, [user, isLoading, dispatch, isRegistering])

  return { user, isLoading }
}
