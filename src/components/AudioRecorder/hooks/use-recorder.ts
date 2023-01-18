import { useState, useEffect } from 'react'
import { startRecording, saveRecording } from '../handlers/recorder-controls'
import {
  Recorder,
  Interval,
  AudioTrack,
  MediaRecorderEvent,
} from '../types/recorder'
import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../../../store/chat'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../../../store/sockets'
import { getLoggedInUser } from '../../../store/users'
import { useUploadVoiceRecordingMutation } from '../../../generated/graphql'

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
}

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState)
  // const [recordings, setRecordings] = useState<Audio[]>([])
  const [uploadVoiceRecordingMutation] = useUploadVoiceRecordingMutation()

  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversee = useSelector(getActiveConversee)

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
      console.log('api url:', process.env.NEXT_PUBLIC_URL)

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        // chunks = []
        // const formData = new FormData()
        // formData.append('file', blob, 'file')
        // formData.append('conversationUuid', activeConversation.uuid)
        // formData.append('senderUuid', loggedInUser.user?.profile?.uuid)

        if (recorder.stream.active) {
          uploadVoiceRecordingMutation({
            variables: {
              file: blob,
              conversationUuid: activeConversation.uuid,
              profileUuid: loggedInUser.user.profile.uuid,
            },
          })
            .then(async (response) => {
              console.log('response:', response)
              if (activeConversation.type === 'pm') {
                socket.emit('private-chat-message', {
                  content:
                    loggedInUser.user?.profile?.username +
                    ' sent you a message.',
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: activeConversee.uuid,
                  toUsername: activeConversee.username,
                  messageUuid: response.data?.uploadVoiceRecording.uuid,
                  message: response.data?.uploadVoiceRecording.content,
                  type: response.data?.uploadVoiceRecording.type,
                  src: response.data?.uploadVoiceRecording.src,
                  conversationUuid: activeConversation.uuid,
                })
              } else {
                activeConversation.profiles.map((conversationProfile) => {
                  if (
                    conversationProfile.uuid !==
                    loggedInUser.user?.profile?.uuid
                  ) {
                    socket.emit('private-chat-message', {
                      content:
                        loggedInUser.user?.profile?.username +
                        ' sent you a message.',
                      from: loggedInUser.user?.profile?.uuid,
                      fromUsername: loggedInUser.user?.profile?.username,
                      to: conversationProfile.uuid,
                      toUsername: conversationProfile.username,
                      messageUuid: response.data?.uploadVoiceRecording.uuid,
                      message: response.data?.uploadVoiceRecording.content,
                      type: response.data?.uploadVoiceRecording.type,
                      src: response.data?.uploadVoiceRecording.src,
                      conversationUuid: activeConversation.uuid,
                    })
                  }
                })
              }

              dispatch(
                addMessageToActiveConversation({
                  uuid: response.data?.uploadVoiceRecording.uuid,
                  message: response.data?.uploadVoiceRecording.content,
                  from: 'me',
                  type: response.data?.uploadVoiceRecording.type,
                  src: response.data?.uploadVoiceRecording.src,
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

          // await axios
          //   .post(
          //     process.env.NEXT_PUBLIC_URL + 'media_api/upload_audio_recording',
          //     formData,
          //     {
          //       headers: {
          //         accept: 'application/json',
          //         'Accept-Language': 'en-US,en;q=0.8',
          //         'Content-Type': `multipart/form-data;`,
          //       },
          //     }
          //   )
          //   .then(async (response) => {
          //     if (activeConversation.type === 'pm') {
          //       socket.emit('private-chat-message', {
          //         content:
          //           loggedInUser.user?.profile?.username +
          //           ' sent you a message.',
          //         from: loggedInUser.user?.profile?.uuid,
          //         fromUsername: loggedInUser.user?.profile?.username,
          //         to: activeConversee.uuid,
          //         toUsername: activeConversee.username,
          //         messageUuid: response.data.content,
          //         message: response.data.content,
          //         type: response.data.type,
          //         src: response.data.src,
          //         conversationUuid: activeConversation.uuid,
          //       })
          //     } else {
          //       activeConversation.profiles.map((profile) => {
          //         if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
          //           socket.emit('private-chat-message', {
          //             content:
          //               loggedInUser.user?.profile?.username +
          //               ' sent you a message.',
          //             from: loggedInUser.user?.profile?.uuid,
          //             fromUsername: loggedInUser.user?.profile?.username,
          //             to: profile.uuid,
          //             toUsername: profile.username,
          //             messageUuid: response.data.uuid,
          //             message: response.data.content,
          //             type: response.data.type,
          //             src: response.data.src,
          //             conversationUuid: activeConversation.uuid,
          //           })
          //         }
          //       })
          //     }
          //
          //     dispatch(
          //       addMessageToActiveConversation({
          //         uuid: response.data.uuid,
          //         message: response.data.content,
          //         sender: {
          //           uuid: loggedInUser?.user?.profile?.uuid,
          //           username: loggedInUser?.user?.profile?.username,
          //         },
          //         from: 'me',
          //         type: response.data.type,
          //         src: response.data.src,
          //         deleted: false,
          //         conversationUuid: activeConversation.uuid,
          //       })
          //     )
          //   })
          //   .catch((error) => {
          //     //handle error
          //     console.log('error on record:', error)
          //   })
          //   .finally()
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
      console.log('recorder on exit:', recorder)
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop())

      // window.URL.createObjectURL()
    }
  }, [recorderState.mediaRecorder])

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  }
}
