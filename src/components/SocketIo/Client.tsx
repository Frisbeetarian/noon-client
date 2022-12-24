// @ts-nocheck
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
const ENDPOINT = 'http://localhost:4020'
const socket = io(ENDPOINT, { autoConnect: false })

export default function ClientComponent() {
  // const [response, setResponse] = useState('')
  // const [socket, setSocket] = useState(null)

  const [isConnected, setIsConnected] = useState(socket.connected)
  const loggedInUser = useSelector(getLoggedInUser)

  // useEffect(() => {
  //   socket.connect()

  //   socket.on('connect', () => {
  //     console.log('connected')
  //     setIsConnected(true)
  //   })

  //   socket.on('disconnect', () => {
  //     setIsConnected(false)
  //   })

  //   socket.on('message', (data) => {
  //      setLastMessage(data)
  //   })

  //   return () => {
  //     socket.off('connect')
  //     socket.off('disconnect')
  //     socket.off('message')
  //   }
  // }, [])

  useEffect(() => {
    console.log('logged in user:', loggedInUser.user.profile)
    const sessionID = localStorage.getItem('sessionID')

    if (!socket.connected) {
      if (sessionID && loggedInUser.user.profile) {
        // this.usernameAlreadySelected = true

        socket.auth = {
          sessionID,
          username: loggedInUser?.user?.profile?.username,
        }

        socket.connect()
      }
    }

    socket.on('session', ({ sessionID, userID }) => {
      console.log('session received:', sessionID)
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      // store it in the localStorage
      localStorage.setItem('sessionID', sessionID)
      // save the ID of the user
      socket.userID = userID
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        // this.usernameAlreadySelected = false
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
    <div className="">
      <header className="app-header">React Chat</header>

      {isConnected ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  )
}
