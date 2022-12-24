import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import {
  useSaveMessageMutation,
  useUploadImageMutation,
} from '../../generated/graphql'

import { getLoggedInUser } from '../../store/users'
import axios from 'axios'

import FormData from 'form-data'
import { v4 as uuid } from 'uuid'
import { getSocket } from '../../store/sockets'
import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../../store/chat'

export const FileUpload = ({ children }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const profile = useSelector(getActiveConversee)
  const socket = useSelector(getSocket)

  const [, saveMessage] = useSaveMessageMutation()
  const { acceptedFiles, getRootProps } = useDropzone()
  const [, uploadImage] = useUploadImageMutation()

  //   const onDrop = useCallback(
  //     (acceptedFiles) => {
  //       console.log(acceptedFiles)

  //       acceptedFiles.forEach((file) => {
  //         const reader = new FileReader()
  //         console.log(file)

  //         reader.onabort = () => console.log('file reading was aborted')
  //         reader.onerror = () => console.log('file reading has failed')
  //         reader.onload = () => {
  //           // Do whatever you want with the file contents
  //           const binaryStr = reader.result
  //           console.log(binaryStr)
  //         }
  //         reader.readAsArrayBuffer(file)
  //       })
  //     },
  //     [acceptedFiles]
  //   )

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      let file = acceptedFiles[0]
      let formData = new FormData()

      formData.append('file', file, 'file')
      formData.append('conversationUuid', activeConversation.uuid)
      formData.append('messageUuid', uuid())
      formData.append('senderUuid', loggedInUser.user?.profile?.uuid)

      //   axios.post('http://localhost:4020/media_api/upload_image', {
      //     body: formData,
      //   })

      axios
        .post('http://localhost:4020/media_api/upload_image', formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then(async (response) => {
          //handle success
          // console.log('response from upload image:', response)

          if (activeConversation.type === 'pm') {
            socket.emit('private-chat-message', {
              content:
                loggedInUser.user?.profile?.username + ' sent you a message.',
              from: loggedInUser.user?.profile?.uuid,
              fromUsername: loggedInUser.user?.profile?.username,
              to: profile.uuid,
              toUsername: profile.username,
              messageUuid: response.data.uuid,
              message: response.data.content,
              type: response.data.type,
              src: response.data.src,
              conversationUuid: activeConversation.uuid,
            })
          } else {
            activeConversation.profiles.map((conversationProfile) => {
              if (
                conversationProfile.uuid !== loggedInUser.user?.profile?.uuid
              ) {
                socket.emit('private-chat-message', {
                  content:
                    loggedInUser.user?.profile?.username +
                    ' sent you a message.',
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: conversationProfile.uuid,
                  toUsername: conversationProfile.username,
                  messageUuid: response.data.uuid,
                  message: response.data.content,
                  type: response.data.type,
                  src: response.data.src,
                  conversationUuid: activeConversation.uuid,
                })
              }
            })
          }

          dispatch(
            addMessageToActiveConversation({
              uuid: response.data.uuid,
              message: response.data.content,
              from: 'me',
              type: response.data.type,
              src: response.data.src,
              conversationUuid: activeConversation.uuid,
              deleted: false,
              sender: {
                uuid: loggedInUser?.user?.profile?.uuid,
                username: loggedInUser?.user?.profile?.username,
              },
            })
          )

          //   await saveMessage({
          //     message: response.data.content,
          //     conversationUuid: activeConversation.uuid,
          //     to: profile.uuid,
          //     type: response.data.type,
          //     src: response.data.src,
          //   })
        })
        .catch((error) => {
          console.log('error:', error)
          //handle error
        })

      //   const reader = new FileReader()
      //   reader.readAsBinaryString(file)

      //   reader.onabort = () => console.log('file reading was aborted')
      //   reader.onerror = () => console.log('file reading has failed')

      //   reader.onload = () => {
      //     // Do whatever you want with the file contents
      //     const binaryStr = reader.result
      //     console.log('binary string:', binaryStr)

      //     uploadImage({
      //       profileUuid: loggedInUser.user?.profile?.uuid,
      //       conversationUuid: activeConversation.uuid,
      //       file: binaryStr,
      //     })
      //   }
    }
  }, [acceptedFiles])

  //   const files = acceptedFiles.map(async (file) => {
  //     const reader = new FileReader()
  //     reader.readAsArrayBuffer(file)

  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')

  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result
  //       console.log(binaryStr)

  //       uploadImage({
  //         profileUuid: loggedInUser.user?.profile?.uuid,
  //         conversationUuid: activeConversation.uuid,
  //         file: binaryStr,
  //       })
  //     }

  //     // fr.addEventListener('loadend', loaded)
  //     // console.log(ll)
  //     //   <li key={file.path}>
  //     // {file.path} - {file.size} bytes
  //     //   </li>
  //   })

  return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>
}
