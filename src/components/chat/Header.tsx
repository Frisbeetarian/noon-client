import React, { useEffect, useState } from 'react'
import { Flex, Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addMessageToActiveConversation,
  getActiveConversee,
} from '../../store/chat'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'

const Header = () => {
  const activeConversee = useSelector(getActiveConversee)
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  const [online, setOnline] = useState('loading')
  // const [state, setState] = useState(initState)

  useEffect(() => {
    socket.emit('check-friend-connection', {
      from: loggedInUser.user?.profile?.uuid,
      fromUsername: loggedInUser.user?.profile?.username,
      to: activeConversee.uuid,
      toUsername: activeConversee.username,
    })

    socket.on('check-friend-connection', ({ session }) => {
      console.log('session data:', session)
      if (session.connected === true) {
        setOnline('true')
      }
    })

    socket.on('friend-connected', ({ username, uuid }) => {
      if (uuid === activeConversee.uuid) {
        setOnline('true')
      }
    })

    socket.on('friend-disconnected', ({ username, uuid }) => {
      if (uuid === activeConversee.uuid) {
        setOnline('false')
      }
    })

    return () => {
      setOnline('loading')
      socket.off('check-friend-connection')
      socket.off('friend-connected')
      socket.off('friend-disconnected')
    }
  }, [activeConversee])
  return (
    <Flex w="100%" className="items-center">
      <Avatar size="md" name={activeConversee.username}>
        <AvatarBadge
          boxSize="1.25em"
          bg={online !== 'true' ? 'yellow.500' : 'green.500'}
        />
      </Avatar>

      <Flex flexDirection="column" mx="3" my="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {activeConversee.username}
        </Text>

        <Text color="green.500" fontSize="sm">
          {online === 'true' ? 'Online' : <span className="opacity-0">f</span>}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Header
