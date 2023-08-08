import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocketManager from './SocketManager'
import { Box } from '@chakra-ui/react'

import { getLoggedInUser } from '../../store/users'
import { setConnected, setSocketId } from '../../store/sockets'
import { Auth } from '../../utils/types'

export default function SocketConnector() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const [isConnected, setIsConnected] = useState(false)
  const [socketError, setSocketError] = useState(false)
  const sessionID = localStorage.getItem('sessionID')

  useEffect(() => {
    const auth: Auth = {
      sessionID,
      username: loggedInUser?.user?.profile?.username || null,
      userSocketUuid: loggedInUser?.user?.profile?.uuid || null,
      userID: loggedInUser?.user?.profile?.uuid || null,
    }

    const socket = SocketManager.connect(auth)

    if (socket) {
      dispatch(setSocketId({ socketId: socket.id }))
      dispatch(setConnected(true))

      socket.on('session', ({ sessionID, userID }) => {
        socket.auth = { sessionID }
        socket.userID = userID
        localStorage.setItem('sessionID', sessionID)
      })

      socket.on('disconnect', () => {
        setIsConnected(false)
      })

      socket.on('connect_error', (err) => {
        if (err.message === 'invalid username') {
          setIsConnected(false)
        }
      })

      socket.on('connect', () => {
        setIsConnected(true)
      })

      socket.onAny((event, ...args) => {
        console.log(event, args)
      })
    }

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('session')
      socket.off('connect_error')

      SocketManager.disconnect()
      dispatch(setConnected(false))
    }
  }, [loggedInUser, sessionID, dispatch])

  return (
    <Box className="flex mt-0.5">
      {isConnected ? (
        <div className="w-2 h-2 bg-green-500 rounded ml-2"></div>
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded ml-2"></div>
      )}
    </Box>
  )
}
