import React, { useEffect } from 'react'
import { Flex, Input, Button } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import {
  cancelPendingCall,
  getActiveConversation,
  getActiveConversee,
  setActiveConversation,
  setOngoingCall,
  setPendingCall,
} from '../../store/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { useSetPendingCallForConversationMutation } from '../../generated/graphql'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)

  const [, setPendingCallForConversation] =
    useSetPendingCallForConversationMutation()

  useEffect(() => {
    socket.on(
      'set-ongoing-call-for-conversation',
      ({ from, fromUsername, to, toUsername, conversationUuid }) => {
        dispatch(
          setOngoingCall({
            uuid: activeConversation.uuid,
            initiator: {
              uuid: from,
              username: fromUsername,
            },
          })
        )
      }
    )

    // socket.on(
    //   'set-pending-call-for-conversation',
    //   ({ from, fromUsername, to, toUsername, conversationUuid }) => {
    //     dispatch(
    //       setPendingCall({
    //         uuid: activeConversation.uuid,
    //         initiator: {
    //           uuid: from,
    //           username: fromUsername,
    //         },
    //       })
    //     )
    //   }
    // )
    //
    // socket.on('cancel-pending-call-for-conversation', () => {
    //   alert('FEWFWEFWEFW')
    //   dispatch(cancelPendingCall())
    // })

    return () => {
      // socket.off('set-ongoing-call-for-conversation')
      // socket.off('set-pending-call-for-conversation')
      // socket.off('cancel-pending-call-for-conversation')
    }
  }, [activeConversee])

  return (
    <Flex
      // mt="5"
      className="bg-white text-red-500 items-center"
    >
      <Input
        className="py-9 h-52 border border-black"
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage()
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />

      <Button
        className="mr-2"
        bg="green.500"
        _hover={{
          bg: 'black',
          color: 'black',
          border: '1px solid black',
        }}
        onClick={async () => {
          dispatch(
            setPendingCall({
              uuid: activeConversation.uuid,
              initiator: loggedInUser?.user?.profile,
            })
          )

          socket.emit('set-pending-call-for-conversation', {
            from: loggedInUser.user?.profile?.uuid,
            fromUsername: loggedInUser.user?.profile?.username,
            to: activeConversee.uuid,
            toUsername: activeConversee.username,
            conversationUuid: activeConversation.uuid,
          })

          await setPendingCallForConversation({
            conversationUuid: activeConversation.uuid,
            pendingCallInitiatorUuid: loggedInUser.user?.profile?.uuid,
          })
        }}
      >
        <PhoneIcon className="" color="white" />
      </Button>

      <Button
        bg="black"
        color="white"
        // borderRadius="none"
        className="mr-3"
        _hover={{
          bg: 'white',
          color: 'black',
          border: '1px solid black',
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  )
}

export default Footer
