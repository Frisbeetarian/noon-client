import React, { useEffect } from 'react'
import { Flex, Input, Button, Box, Icon } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import PubSub from 'pubsub-js'

import {
  deleteMessageInStore,
  getActiveConversation,
  getActiveConversee,
  setOngoingCall,
} from '../store/chat'

import { setVideoFrameForConversation } from '../store/video'
import { useSelector, useDispatch } from 'react-redux'
import { ImUpload2 } from 'react-icons/im'

import { getLoggedInUser } from '../store/users'
import { getSocket } from '../store/sockets'
import { useSetPendingCallForConversationMutation } from '../generated/graphql'

import RecorderControls from './AudioRecorder/recorder-controls'
// import useRecorder from '../../components/AudioRecorder/hooks/use-recorder_old'
import { UseRecorder } from './AudioRecorder/types/recorder'
import useRecorder from './AudioRecorder/hooks/use-recorder'
import { ImCancelCircle } from 'react-icons/im'
import { uploadFile } from '../store/files'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const hiddenFileInput = React.useRef(null)
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)

  const [
    setPendingCallForConversation,
    // { loading: setPendingCallLoading }
  ] = useSetPendingCallForConversationMutation()

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

      socket.on('message-deleted', ({ messageUuid, conversationUuid }) => {
        dispatch(
          deleteMessageInStore({
            uuid: messageUuid,
            content: 'Message has been deleted.',
            deleted: true,
            conversationUuid: conversationUuid,
          })
        )
      })
    }

    return () => {
      if (socket) socket.off('set-ongoing-call-for-conversation')
    }
  }, [activeConversee])

  const handleClick = (event) => {
    hiddenFileInput?.current.click()
  } // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]

    PubSub.publish('FILE UPLOAD', { file: fileUploaded })
    // console.log('fileUploaded', fileUploaded)
    // dispatch(
    //   uploadFile({
    //     file: fileUploaded,
    //   })
    // )
    // props.handleFile(fileUploaded)
  }

  return (
    <Flex className="bg-white  items-center box-content h-full justify-between">
      <Box className="w-4/6 relative z-10">
        <Input
          className="py-2 box-content text-black"
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

      <Flex className="w-2/6  justify-end">
        <Button bg="green.500" onClick={handleClick}>
          <Icon as={ImUpload2} />
        </Button>

        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        <RecorderControls recorderState={recorderState} handlers={handlers} />

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
            dispatch(setVideoFrameForConversation(true))

            activeConversation.profiles.map(async (profile) => {
              socket.emit('set-pending-call-for-conversation', {
                from: loggedInUser.user?.profile?.uuid,
                fromUsername: loggedInUser.user?.profile?.username,
                to: profile.uuid,
                toUsername: profile.username,
                conversationUuid: activeConversation.uuid,
              })

              await setPendingCallForConversation({
                variables: {
                  conversationUuid: activeConversation.uuid,
                  profileUuid: profile.uuid,
                },
              })
            })
          }}
        >
          <PhoneIcon className="" color="white" />
        </Button>

        <Button
          bg="black"
          color="white"
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
