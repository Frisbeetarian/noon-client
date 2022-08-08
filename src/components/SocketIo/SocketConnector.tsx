import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import { Box } from '@chakra-ui/react'
const ENDPOINT = 'http://localhost:4020'
const socket = io(ENDPOINT, { autoConnect: false })

export default function SocketConnector() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [socketError, setSocketError] = useState(false)
  const loggedInUser = useSelector(getLoggedInUser)

  useEffect(() => {
    console.log('logged in user:', loggedInUser.user.profile)
    const sessionID = localStorage.getItem('sessionID')

    try {
      // if (!socket.connected) {
      if (sessionID && loggedInUser.user.profile) {
        // this.usernameAlreadySelected = true
        socket.auth = {
          sessionID,
          username: loggedInUser?.user?.profile?.username,
        }
        socket.connect()
      } else {
        socket.auth = { username: loggedInUser?.user?.profile?.username }
        socket.connect()
      }
    } catch (e) {
      setSocketError(true)
    }

    socket.on('session', ({ sessionID, userID }) => {
      console.log('session received:', sessionID)
      socket.auth = { sessionID }
      localStorage.setItem('sessionID', sessionID)
      socket.userID = userID
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
    return () => socket.off('connect_error')
  }, [loggedInUser])

  return (
    <Box className="flex mt-0.5">
      {isConnected ? (
        <div className="w-2 h-2 bg-green-500 rounded ml-2 "></div>
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded ml-2 "></div>
      )}
    </Box>
  )
}
