import React, { useEffect, useState } from 'react'

function Messages({ socket }) {
  const [messages, setMessages] = useState({})

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        newMessages[message.id] = message
        return newMessages
      })
    }

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        delete newMessages[messageID]
        return newMessages
      })
    }

    socket.on('message', messageListener)
    socket.on('deleteMessage', deleteMessageListener)
    socket.emit('getMessages')

    return () => {
      socket.off('message', messageListener)
      socket.off('deleteMessage', deleteMessageListener)
    }
  }, [socket])


  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => (a as any).time - (b as any).time)
        .map((message) => (
          <div
            key={(message as any).id}
            className="message-container"
            title={`Sent at ${new Date((message as any).time).toLocaleTimeString()}`}
          >
            <span className="user">{(message as any).user.name}:</span>
            <span className="message">{(message as any).value}</span>
            <span className="date">
              {new Date((message as any).time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  )
}

export default Messages
