import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import PubSub from 'pubsub-js'

import { getLoggedInUser } from '../store/users'
import axios from 'axios'

import FormData from 'form-data'
import { v4 as uuid } from 'uuid'
import { getSocket } from '../store/sockets'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import { useUploadImageMutation } from '../generated/graphql'
// import { createProxyMiddleware } from 'http-proxy-middleware'
// const SINGLE_UPLOAD_MUTATION = gql`
//   mutation singleUpload($file: Upload!) {
//     singleUpload(file: $file) {
//       filename
//     }
//   }
// `

export const FileUpload = ({ children }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const profile = useSelector(getActiveConversee)
  const socket = useSelector(getSocket)
  // const [singleUploadMutation] = useMutation(SINGLE_UPLOAD_MUTATION)
  // const apolloClient = useApolloClient()
  // const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_MUTATION)
  const [uploadFileMutation] = useUploadImageMutation()
  const apolloClient = useApolloClient()
  // function onChange({ target: { validity, files } }) {
  //   if (validity.valid) mutate({ variables: { files } })
  // }

  // const [, saveMessage] = useSaveMessageMutation()
  const { acceptedFiles, getRootProps } = useDropzone()

  // const [, uploadImage] = useUploadImageMutation()

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      // const file = acceptedFiles[0]
    }

    let fileUploadSubscriber = function (msg, data) {
      console.log('FWEFWEFWEFWEFWEFWEFWEFWE')
      console.log(msg, data.file)
      PubSub.unsubscribe(token)
    }
    let token = PubSub.subscribe('FILE UPLOAD', fileUploadSubscriber)
    // const file = new Blob([acceptedFiles[0]], { type: 'text/plain' })
    // file.name = `${'ffff'}.txt`

    // const formData = new FormData()
    //
    // formData.append('file', file, 'file')
    // formData.append('conversationUuid', activeConversation.uuid)
    // formData.append('messageUuid', uuid())
    // formData.append('senderUuid', loggedInUser.user?.profile?.uuid)
    // uploadFileMutation({
    //   variables: {
    //     file,
    //     conversationUuid: activeConversation.uuid,
    //     profileUuid: loggedInUser.user.profile.uuid,
    //   },
    // }).then(() => {
    //   apolloClient.resetStore()
    // })

    // let file = new Blob([acceptedFiles[0]], { type: 'text/plain' })
    // file.name = `${'file'}.txt`
    //
    // singleUploadMutation({ variables: { file } }).then(() => {
    //   apolloClient.resetStore()
    // })

    // axios.{ method: 'post', url: '/endpoint', headers: { 'Content-Type': 'application/json', }, proxy: createProxyMiddleware({ target: 'https://www.api.com', changeOrigin: true}), data: data };
    // mutate({ variables: { file: formData } })
    //   .then(async (response) => {
    //     if (activeConversation.type === 'pm') {
    //       socket.emit('private-chat-message', {
    //         content:
    //           loggedInUser.user?.profile?.username + ' sent you a message.',
    //         from: loggedInUser.user?.profile?.uuid,
    //         fromUsername: loggedInUser.user?.profile?.username,
    //         to: profile.uuid,
    //         toUsername: profile.username,
    //         messageUuid: response.data.uuid,
    //         message: response.data.content,
    //         type: response.data.type,
    //         src: response.data.src,
    //         conversationUuid: activeConversation.uuid,
    //       })
    //     } else {
    //       activeConversation.profiles.map((conversationProfile) => {
    //         if (
    //           conversationProfile.uuid !== loggedInUser.user?.profile?.uuid
    //         ) {
    //           socket.emit('private-chat-message', {
    //             content:
    //               loggedInUser.user?.profile?.username +
    //               ' sent you a message.',
    //             from: loggedInUser.user?.profile?.uuid,
    //             fromUsername: loggedInUser.user?.profile?.username,
    //             to: conversationProfile.uuid,
    //             toUsername: conversationProfile.username,
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
    //         from: 'me',
    //         type: response.data.type,
    //         src: response.data.src,
    //         conversationUuid: activeConversation.uuid,
    //         deleted: false,
    //         sender: {
    //           uuid: loggedInUser?.user?.profile?.uuid,
    //           username: loggedInUser?.user?.profile?.username,
    //         },
    //       })
    //     )
    //   })
    //   .catch((error) => {
    //     console.log('error:', error)
    //   })
    //
    // axios
    //   .post(
    //     process.env.NEXT_PUBLIC_URL + 'media_api/upload_image',
    //     formData,
    //     {
    //       withCredentials: false,
    //       // proxy: createProxyMiddleware({
    //       //   target: 'https://www.api.noon.tube',
    //       //   changeOrigin: true,
    //       // }),
    //       // proxy: {
    //       //   host: process.env.NEXT_PUBLIC_URL + 'media_api/upload_image',
    //       //   port: 4020,
    //       // },
    //       headers: {
    //         accept: 'application/json',
    //         'Accept-Language': 'en-US,en;q=0.8',
    //         'Content-Type': 'multipart/form-data',
    //         // 'Content-Type': `multipart/form-data; boundary=${
    //         //   (formData as any)._boundary
    //         // }`,
    //       },
    //     }
    //   )
    //   .then(async (response) => {
    //     if (activeConversation.type === 'pm') {
    //       socket.emit('private-chat-message', {
    //         content:
    //           loggedInUser.user?.profile?.username + ' sent you a message.',
    //         from: loggedInUser.user?.profile?.uuid,
    //         fromUsername: loggedInUser.user?.profile?.username,
    //         to: profile.uuid,
    //         toUsername: profile.username,
    //         messageUuid: response.data.uuid,
    //         message: response.data.content,
    //         type: response.data.type,
    //         src: response.data.src,
    //         conversationUuid: activeConversation.uuid,
    //       })
    //     } else {
    //       activeConversation.profiles.map((conversationProfile) => {
    //         if (
    //           conversationProfile.uuid !== loggedInUser.user?.profile?.uuid
    //         ) {
    //           socket.emit('private-chat-message', {
    //             content:
    //               loggedInUser.user?.profile?.username +
    //               ' sent you a message.',
    //             from: loggedInUser.user?.profile?.uuid,
    //             fromUsername: loggedInUser.user?.profile?.username,
    //             to: conversationProfile.uuid,
    //             toUsername: conversationProfile.username,
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
    //         from: 'me',
    //         type: response.data.type,
    //         src: response.data.src,
    //         conversationUuid: activeConversation.uuid,
    //         deleted: false,
    //         sender: {
    //           uuid: loggedInUser?.user?.profile?.uuid,
    //           username: loggedInUser?.user?.profile?.username,
    //         },
    //       })
    //     )
    //   })
    //   .catch((error) => {
    //     console.log('error:', error)
    //   })
  }, [acceptedFiles])

  return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>
}
