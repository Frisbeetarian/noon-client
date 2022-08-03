import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import Messages from './Messages'
import MessageInput from './MessageInput'
const ENDPOINT = 'http://localhost:4020'

export default function ClientComponent() {
  const [response, setResponse] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT)
    setSocket(newSocket)
    newSocket.on('FromAPI', (data) => {
      setResponse(data)
    })

    return () => newSocket.disconnect()
  }, [])

  return (
    <div className="">
      <header className="app-header">React Chat</header>
      {socket ? (
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
