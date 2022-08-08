import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react'
import { getSocket, setSocket } from '../../store/sockets'
const ENDPOINT = 'http://localhost:4020'
const socket = io(ENDPOINT, { autoConnect: false })

export default function SocketConnector() {
  const dispatch = useDispatch()

  const [socketError, setSocketError] = useState(false)
  const loggedInUser = useSelector(getLoggedInUser)
  // const socket = useSelector(getSocket)
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    console.log('logged in user:', loggedInUser.user.profile)
    const sessionID = localStorage.getItem('sessionID')

    try {
      console.log('session id on socket connection:', sessionID)

      // if (!socket.connected) {
      if (sessionID && loggedInUser.user.profile) {
        // this.usernameAlreadySelected = true
        socket.auth = {
          sessionID,
          username: loggedInUser?.user?.profile?.username,
        }
        socket.connect()
        dispatch(setSocket({ socket }))
      } else {
        socket.auth = { username: loggedInUser?.user?.profile?.username }
        socket.connect()
        dispatch(setSocket({ socket }))
      }
    } catch (e) {
      setSocketError(true)
    }

    // if (socket) {
    socket.on('session', ({ sessionID, userID }) => {
      console.log('session received:', sessionID)
      socket.auth = { sessionID }
      localStorage.setItem('sessionID', sessionID)
      socket.userID = userID
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
    // }

    return () => {
      // if (socket)
      socket.off('connect')
      socket.off('disconnect')
      socket.off('session')
      socket.off('connect_error')
    }
  }, [loggedInUser, socket])

  return (
    <Box className="flex mt-0.5">
      {isConnected ? (
        <div className="w-2 h-2 bg-green-500 rounded ml-2 "></div>
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded ml-2 "></div>
      )}

      {/*<Alert status="error" hidden={!socketError}>*/}
      {/*  <AlertIcon />*/}
      {/*  <AlertTitle>Error while trying to connect to socket.</AlertTitle>*/}
      {/*  <AlertDescription>*/}
      {/*    Your Chakra experience may be degraded.*/}
      {/*  </AlertDescription>*/}
      {/*</Alert>*/}
    </Box>
  )
}
