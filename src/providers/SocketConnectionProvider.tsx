import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket } from '../store/sockets'
import { getLoggedInUser } from '../store/users'
import { Auth } from '../utils/types'

const SocketConnectionProvider = ({ children }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const sessionID = localStorage.getItem('sessionID')

  useEffect(() => {
    if (!loggedInUser) {
      return
    }

    const auth: Auth = {
      sessionID,
      username: loggedInUser?.user?.profile?.username || null,
      userSocketUuid: loggedInUser?.user?.profile?.uuid || null,
      userID: loggedInUser?.user?.profile?.uuid || null,
    }

    // @ts-ignore
    dispatch(connectSocket(auth))

    return () => {
      // @ts-ignore
      dispatch(disconnectSocket())
    }
  }, [loggedInUser, dispatch])

  return <>{children}</>
}

export default SocketConnectionProvider
