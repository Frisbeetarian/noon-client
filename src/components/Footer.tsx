import React, { useEffect } from 'react'
import { Flex, Input, Button, Box, Icon } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
// import PubSub from 'pubsub-js'

import {
  addMessageToActiveConversation,
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
import {
  useSetPendingCallForConversationMutation,
  useUploadImageMutation,
} from '../generated/graphql'

import RecorderControls from './AudioRecorder/recorder-controls'
// import useRecorder from '../../components/AudioRecorder/hooks/use-recorder_old'
import { UseRecorder } from './AudioRecorder/types/recorder'
import useRecorder from './AudioRecorder/hooks/use-recorder'
import { getIsMobile } from '../store/ui'
// import { ImCancelCircle } from 'react-icons/im'
// import { uploadFile } from '../store/files'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const hiddenFileInput = React.useRef(null)
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const isMobile = useSelector(getIsMobile)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)
  const [uploadImageMutation] = useUploadImageMutation()

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

  const handleClick = () => {
    ;(hiddenFileInput?.current as any).click()
  }
  const handleChange = (event) => {
    uploadImageMutation({
      variables: {
        file: event.target.files[0],
        conversationUuid: activeConversation.uuid,
        profileUuid: loggedInUser.user.profile.uuid,
      },
    })
      .then(async (response) => {
        console.log('response:', response)
        if (activeConversation.type === 'pm') {
          socket.emit('private-chat-message', {
            content:
              loggedInUser.user?.profile?.username + ' sent you a message.',
            from: loggedInUser.user?.profile?.uuid,
            fromUsername: loggedInUser.user?.profile?.username,
            to: activeConversee.uuid,
            toUsername: activeConversee.username,
            messageUuid: response.data?.uploadImage.uuid,
            message: response.data?.uploadImage.content,
            type: response.data?.uploadImage.type,
            src: response.data?.uploadImage.src,
            conversationUuid: activeConversation.uuid,
          })
        } else {
          activeConversation.profiles.map((conversationProfile) => {
            if (conversationProfile.uuid !== loggedInUser.user?.profile?.uuid) {
              socket.emit('private-chat-message', {
                content:
                  loggedInUser.user?.profile?.username + ' sent you a message.',
                from: loggedInUser.user?.profile?.uuid,
                fromUsername: loggedInUser.user?.profile?.username,
                to: conversationProfile.uuid,
                toUsername: conversationProfile.username,
                messageUuid: response.data?.uploadImage.uuid,
                message: response.data?.uploadImage.content,
                type: response.data?.uploadImage.type,
                src: response.data?.uploadImage.src,
                conversationUuid: activeConversation.uuid,
              })
            }
          })
        }

        dispatch(
          addMessageToActiveConversation({
            uuid: response.data?.uploadImage.uuid,
            message: response.data?.uploadImage.content,
            from: 'me',
            type: response.data?.uploadImage.type,
            src: response.data?.uploadImage.src,
            conversationUuid: activeConversation.uuid,
            deleted: false,
            sender: {
              uuid: loggedInUser?.user?.profile?.uuid,
              username: loggedInUser?.user?.profile?.username,
            },
          })
        )
      })
      .catch((error) => {
        console.log('error:', error)
      })
  }

  return (
    <Flex className="bg-white items-center box-content h-full  justify-between">
      <Box className="w-1/2 md:w-3/6 relative z-10">
        <Input
          type="search"
          size={isMobile ? 'xd' : 'md'}
          className=" box-content text-black w-3/4"
          placeholder="Type message..."
          border="none"
          borderRadius="none"
          pl={isMobile ? '2' : '4'}
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

      <Flex className="w-1/2 md:w-2/6 justify-end ">
        <Box className="xs:w-1/4 flex items-center justify-end mr-1 md:mr-2">
          <Button
            size={isMobile ? 'sm' : 'md'}
            bg="green.500"
            onClick={handleClick}
          >
            <Icon as={ImUpload2} />
          </Button>

          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
            accept=".jpeg, .jpg, .png, .doc, .docx, .pdf"
          />
        </Box>

        <Box className="xs:w-1/4 flex items-center justify-end mr-1 md:mr-2">
          <RecorderControls recorderState={recorderState} handlers={handlers} />
        </Box>

        <Box className="flex items-center justify-center xs:w-1/4 mr-1 md:mr-2">
          <Button
            size={isMobile ? 'sm' : 'md'}
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
        </Box>

        <Box className="flex items-center justify-end xs:w-1/4 mr-1 md:mr-2 md:w-1/6  ">
          <Button
            size={isMobile ? 'sm' : 'md'}
            bg="black"
            color="white"
            title="Send message"
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
        </Box>
      </Flex>
    </Flex>
  )
}

export default Footer
