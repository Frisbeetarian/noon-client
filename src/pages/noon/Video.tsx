import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Flex, Text, Image, Button } from '@chakra-ui/react'

import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types'

const JitsiMeeting = dynamic(
  () =>
    import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>

import {
  getActiveConversation,
  getActiveConversee,
  getShouldPauseCheckHasMore,
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import { Layout } from '../../components/Layout'
import { setVideoFrameForConversation } from '../../store/video'

const Video = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)

  const apiRef = useRef()
  const [logItems, updateLog] = useState([])
  const [showNew, toggleShowNew] = useState(false)
  const [knockingParticipants, updateKnockingParticipants] = useState([])

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

  const handleOnReadyToClose = (payload) => {
    console.log('on ready to close handler:', payload)
    dispatch(setVideoFrameForConversation(false))
  }

  const handleChatUpdates = (payload) => {
    if (payload.isOpen || !payload.unreadCount) {
      return
    }

    apiRef.current.executeCommand('toggleChat')
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
      apiRef.current.executeCommand(
        'answerKnockingParticipant',
        participant?.id,
        condition(participant)
      )

      updateKnockingParticipants((participants) =>
        participants.filter((item) => item.id === participant.id)
      )
    })
  }

  const handleJitsiIFrameRef1 = (iframeRef) => {
    iframeRef.style.background = '#3d3d3d'
    iframeRef.style.height = '900px'
  }

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj
    apiRef.current.on('knockingParticipant', handleKnockingParticipant)
    apiRef.current.on('audioMuteStatusChanged', (payload) =>
      handleAudioStatusChange(payload, 'audio')
    )

    apiRef.current.on('videoMuteStatusChanged', (payload) =>
      handleAudioStatusChange(payload, 'video')
    )

    apiRef.current.on('raiseHandUpdated', printEventOutput)
    apiRef.current.on('titleViewChanged', printEventOutput)
    apiRef.current.on('chatUpdated', handleChatUpdates)
    apiRef.current.on('knockingParticipant', handleKnockingParticipant)
  }

  const handleReadyToClose = () => {
    /* eslint-disable-next-line no-alert */
    alert('Ready to close...')
  }

  const generateRoomName = () =>
    `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`

  // Multiple instances demo
  const renderNewInstance = () => {
    if (!showNew) {
      return null
    }

    return (
      <JitsiMeeting
        domain={'noon-vid.com/'}
        // roomName={generateRoomName()}
        roomName="test1"
        spinner={renderSpinner}
        config={{
          subject: 'lalalala',
          hideConferenceSubject: false,
        }}
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
        roomName="test1"
        onReadyToClose={handleOnReadyToClose}
        spinner={renderSpinner}
        config={{
          hideConferenceSubject: false,
        }}
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
