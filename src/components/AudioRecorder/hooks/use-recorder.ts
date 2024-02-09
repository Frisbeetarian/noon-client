import { useState, useEffect } from 'react'
import { startRecording, saveRecording } from '../handlers/recorder-controls'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'

import {
  Recorder,
  Interval,
  AudioTrack,
  MediaRecorderEvent,
} from '../types/recorder'

import { getActiveConversation } from '../../../store/chat'

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  isUploading: false,
}

export default function useRecorder(axios) {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState)
  // const [recordings, setRecordings] = useState<Audio[]>([])
  const activeConversation = useSelector(getActiveConversation)
  const toast = useToast()

  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval: Interval = null

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            typeof recordingInterval === 'number' &&
              clearInterval(recordingInterval)
            return prevState
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            }
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            }
          else return prevState
        })
      }, 1000)
    else
      typeof recordingInterval === 'number' && clearInterval(recordingInterval)

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval)
    }
  })

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        }
      else return prevState
    })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    const chunks: Blob[] = []

    if (recorder && recorder.state === 'inactive') {
      recorder.start()

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data)
      }

      recorder.onstop = async () => {
        setRecorderState((prev) => ({ ...prev, isUploading: true }))
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })

        const formData = new FormData()
        formData.append('file', blob)
        formData.append('conversationUuid', activeConversation.uuid)
        formData.append('conversationType', activeConversation.type)

        const participants = activeConversation.profiles.map(
          (profile) => profile.uuid
        )
        formData.append('participantUuids', participants.join(','))

        if (recorder.stream.active) {
          await axios
            .post('/api/messages/uploadVoiceRecording', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(async (response) => {
              if (response.status === 200) {
                toast({
                  title: `Voice note has been sent.`,
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

        setRecorderState((prevState: Recorder) => {
          if (prevState.mediaRecorder) {
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            }
          } else {
            return initialState
          }
        })
      }
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop())
    }
  }, [recorderState.mediaRecorder])

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  }
}
