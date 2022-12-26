import React, { useRef, useState } from 'react'
import {  Flex} from '@chakra-ui/react'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types'

import { useDispatch, useSelector } from 'react-redux'

import { getLoggedInUser } from '../../store/users'
import { setVideoFrameForConversation } from '../../store/video'
import { useCancelPendingCallForConversationMutation } from '../../generated/graphql'


import {
  cancelPendingCall,
  getActiveConversation,
  // getActiveConversee,
  // getShouldPauseCheckHasMore,
} from '../../store/chat'

const JitsiMeeting = dynamic(
  () =>
    import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>




const Video = ({ conversationUuid, profile, email }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  // const activeConversee = useSelector(getActiveConversee)
  // const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)

  const apiRef = useRef()
  const [logItems, updateLog] = useState<string[]>([])
  const [showNew] = useState(false)
  const [knockingParticipants, updateKnockingParticipants] = useState<string[]>([])

  const [, cancelPendingCallForConversation] =
    useCancelPendingCallForConversationMutation()

  const printEventOutput = (payload) => {

    updateLog((items) => [...items, JSON.stringify(payload)])
  }

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {

      updateLog((items) => [...items, `${feature} off`])
    } else {

      updateLog((items) => [...items, `${feature} on`])
    }
  }

  const handleOnReadyToClose = async () => {
    dispatch(setVideoFrameForConversation(false))

    dispatch(
      cancelPendingCall({
        conversationUuid: activeConversation.uuid,
        loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
      })
    )

    await cancelPendingCallForConversation({
      conversationUuid: activeConversation.uuid,
      profileUuid: loggedInUser.user?.profile?.uuid,
    })
  }

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return
    }

    if(apiRef.current)
      (apiRef.current as any).executeCommand('toggleChat')


    updateLog((items) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ])
  }

  const handleKnockingParticipant = (payload) => {

    updateLog((items) => [...items, JSON.stringify(payload)])

    updateKnockingParticipants((participants) => [
      ...participants,
      payload?.participant,
    ])
  }

  const resolveKnockingParticipants = (condition) => {
    knockingParticipants.forEach((participant) => {
      (apiRef.current as any).executeCommand(
        'answerKnockingParticipant',
        (participant as any)?.id,
        condition(participant)
      )

      updateKnockingParticipants((participants) =>
        participants.filter((item) => (item as any).id === (participant as any).id)
      )
    })
  }

  resolveKnockingParticipants('3');

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.background = '#3d3d3d'
    iframeRef.style.height = '900px'
  }

  const handleApiReady = (apiObj) => {
      apiRef.current = apiObj
      (apiRef?.current as any).on('knockingParticipant', handleKnockingParticipant)
      (apiRef?.current as any).on('audioMuteStatusChanged', (payload) =>
        handleAudioStatusChange(payload, 'audio')
      )

      (apiRef?.current as any).on('videoMuteStatusChanged', (payload) =>
        handleAudioStatusChange(payload, 'video')
      )

      (apiRef?.current as any).on('raiseHandUpdated', printEventOutput)
      (apiRef?.current as any).on('titleViewChanged', printEventOutput)
      (apiRef?.current as any).on('chatUpdated', handleChatUpdates)
      (apiRef?.current as any).on('knockingParticipant', handleKnockingParticipant)
  }
handleApiReady({'ddd': 'ded'})
  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    alert('Ready to close...')
  }
handleReadyToClose()
  const generateRoomName = () =>
    `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`
generateRoomName()
  // Multiple instances demo
  const renderNewInstance = () => {
    if (!showNew) {
      return null
    }

    return (
      <JitsiMeeting
        domain={'noon-vid.com/'}
        // roomName={generateRoomName()}
        roomName={conversationUuid}
        onReadyToClose={handleOnReadyToClose}
        spinner={renderSpinner}
        // config={{
        //   subject: 'lalalala',
        //   hideConferenceSubject: false,
        // }}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: false,
          enableEmailInStats: false,
        }}
        getIFrameRef={handleJitsiIFrameRef1}
      />
    )
  }

  const renderLog = () =>
    logItems.map((item, index) => (
      <div
        style={{
          fontFamily: 'monospace',
          padding: '5px',
        }}
        key={index}
      >
        {item}
      </div>
    ))

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      Loading...
    </div>
  )

  return (
    <Flex
      // overflowY="auto"
      flexDirection="column-reverse"
      className="w-full top-0 py-3 px-5 relative"
      style={{ height: '80vh' }}
    >
      <JitsiMeeting
        domain={'noon-vid.com/'}
        // roomName={generateRoomName()}
        roomName={conversationUuid}
        onReadyToClose={handleOnReadyToClose}
        spinner={renderSpinner}
        userInfo={{
          displayName: profile.username,
          email: email,
        }}
        // config={{
        //   hideConferenceSubject: false,
        // }}
        interfaceConfigOverwrite={{}}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: false,
          enableEmailInStats: false,
        }}
        getIFrameRef={handleJitsiIFrameRef1}
      />
      {renderNewInstance()}
      {renderLog()}
    </Flex>
  )
}

export default Video
