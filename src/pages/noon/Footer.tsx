import React, { useEffect } from 'react'
import { Flex, Input, Button, Box } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import {
  getActiveConversation,
  getActiveConversee,
  setOngoingCall,
  setPendingCall,
} from '../../store/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { useSetPendingCallForConversationMutation } from '../../generated/graphql'

import RecorderControls from '../../components/AudioRecorder/recorder-controls'
import useRecorder from '../../components/AudioRecorder/hooks/use-recorder'
import { UseRecorder } from '../../components/AudioRecorder/types/recorder'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)

  const [, setPendingCallForConversation] =
    useSetPendingCallForConversationMutation()

  const { recorderState, ...handlers }: UseRecorder = useRecorder()

  useEffect(() => {
    if (socket) {
      socket.on(
        'set-ongoing-call-for-conversation',
        ({ from, fromUsername }) => {
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
    }

    return () => {
      if (socket) socket.off('set-ongoing-call-for-conversation')
    }
  }, [activeConversee])

  return (
    <Flex
      // mt="5"
      className="bg-white text-red-500 items-center box-content h-full justify-between"
    >
      <Box className="w-4/6">
        <Input
          className="py-2 box-content"
          placeholder="Type message..."
          border="none"
          borderRadius="none"
          outline={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
      </Box>

      <Flex>
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        {/* <RecordingsList audio={audio} /> */}

        <Button
          className="mr-2"
          bg="green.500"
          title="Start call"
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
          title="Send message"
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
    </Flex>
  )
}

export default Footer
