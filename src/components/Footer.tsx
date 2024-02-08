// @ts-nocheck
import React, { useEffect } from 'react'
import { Flex, Input, Button, Box, Icon, useToast } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'

import { useSelector, useDispatch } from 'react-redux'
import { ImUpload2 } from 'react-icons/im'

import {
  addMessageToActiveConversation,
  deleteMessageInStore,
  getActiveConversation,
  getActiveConversee,
  setOngoingCall,
} from '../store/chat'

import { setVideoFrameForConversation } from '../store/video'

import RecorderControls from './AudioRecorder/recorder-controls'
import { UseRecorder } from './AudioRecorder/types/recorder'
import useRecorder from './AudioRecorder/hooks/use-recorder'

import { getIsMobile } from '../store/ui'

import { getLoggedInUser } from '../store/users'
import {
  useSetPendingCallForConversationMutation,
  useUploadImageMutation,
} from '../generated/graphql'

import SocketManager from './SocketIo/SocketManager'
import { getSocketAuthObject } from '../store/sockets'
import withAxios from '../utils/withAxios'
import AppButton from './AppComponents/AppButton'

const Footer = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  axios,
}) => {
  const socketAuthObject = useSelector(getSocketAuthObject)

  const hiddenFileInput = React.useRef(null)
  const dispatch = useDispatch()
  const toast = useToast()

  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()
  const isMobile = useSelector(getIsMobile)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)

  // const [
  //   setPendingCallForConversation,
  //   // { loading: setPendingCallLoading }
  // ] = useSetPendingCallForConversationMutation()

  const { recorderState, ...handlers }: UseRecorder = useRecorder(axios)

  useEffect(() => {
    if (socket) {
      socket.on('set-ongoing-call-for-conversation', () => {
        dispatch(setOngoingCall())
      })
    }

    return () => {
      if (socket) socket.off('set-ongoing-call-for-conversation')
    }
  }, [activeConversee])

  const handleClick = () => {
    ;(hiddenFileInput?.current as any).click()
  }
  const handleChange = async (event) => {
    console.log('event file:', event.target.files[0])

    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('conversationUuid', activeConversation.uuid)
    formData.append('conversationType', activeConversation.type)

    // const participants = []
    // activeConversation.profiles.map((profile) => {
    //   participants.push(profile.uuid)
    // })
    const participants = activeConversation.profiles.map(
      (profile) => profile.uuid
    )
    formData.append('participantUuids', participants.join(','))

    await axios
      .post('/api/messages/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          toast({
            title: `File has been sent.`,
            position: 'bottom-right',
            isClosable: true,
            status: 'error',
            duration: 5000,
          })
        }
      })
      .catch((error) => {
        console.log('error:', error)
      })
  }

  return (
    <Flex className="bg-black items-center box-content h-full  justify-between">
      <Box className="w-1/2 md:w-3/6 relative z-10">
        <Input
          type="search"
          size={isMobile ? 'xd' : 'md'}
          placeholder="Type message..."
          border="none"
          borderBottom="1px solid #921A1C"
          borderRadius="none"
          className="box-content text-white w-3/4 ml-4 border-b"
          pl={isMobile ? '2' : '4'}
          outline={0}
          style={{ borderBottom: '1px solid black !important' }}
          sx={{
            '::placeholder': {
              color: 'white',
            },
          }}
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
          <AppButton size={isMobile ? 'sm' : 'md'} onClick={handleClick}>
            <Icon as={ImUpload2} />
          </AppButton>

          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
            accept=".jpeg, .jpg, .png, .doc, .docx, .pdf"
          />
        </Box>

        <Box className="xs:w-1/4 flex items-center justify-end mr-1 md:mr-2">
          <RecorderControls
            recorderState={recorderState}
            handlers={handlers}
            axios={axios}
          />
        </Box>

        <Box className="flex items-center justify-center xs:w-1/4 mr-1 md:mr-2">
          <AppButton
            size={isMobile ? 'sm' : 'md'}
            title="Start call"
            onClick={async () => {
              dispatch(setVideoFrameForConversation(true))

              activeConversation.profiles.map(async (profile) => {
                socket?.emit('set-pending-call-for-conversation', {
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: profile.uuid,
                  toUsername: profile.username,
                  conversationUuid: activeConversation.uuid,
                })

                // await setPendingCallForConversation({
                //   variables: {
                //     conversationUuid: activeConversation.uuid,
                //     profileUuid: profile.uuid,
                //   },
                // })
              })
            }}
          >
            <PhoneIcon className="" />
          </AppButton>
        </Box>

        <Box className="glowy flex items-center justify-end xs:w-1/4 mr-1 md:mr-2 md:w-1/6  ">
          <AppButton
            size={isMobile ? 'sm' : 'md'}
            color="white"
            disabled={inputMessage.trim().length <= 0}
            onClick={handleSendMessage}
          >
            Send
          </AppButton>
        </Box>
      </Flex>
    </Flex>
  )
}

export default withAxios(Footer)
