import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, socketDisconnected } from '../store/sockets'
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

    dispatch(connectSocket(auth))

    return () => {
      // @ts-ignore
      dispatch(socketDisconnected())
    }
  }, [loggedInUser])

  return <>{children}</>
}

export default SocketConnectionProvider
