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
  const [uploadImageMutation] = useUploadImageMutation()
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
      console.log('ACCEPTED FILES')
      uploadImageMutation({
        variables: {
          file: acceptedFiles[0],
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
              to: profile.uuid,
              toUsername: profile.username,
              messageUuid: response.data?.uploadImage.uuid,
              message: response.data?.uploadImage.content,
              type: response.data?.uploadImage.type,
              src: response.data?.uploadImage.src,
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

    let fileUploadSubscriber = function (msg, data) {
      uploadImageMutation({
        variables: {
          file: data.file,
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
              to: profile.uuid,
              toUsername: profile.username,
              messageUuid: response.data?.uploadImage.uuid,
              message: response.data?.uploadImage.content,
              type: response.data?.uploadImage.type,
              src: response.data?.uploadImage.src,
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

    let token = PubSub.subscribe('FILE UPLOAD', fileUploadSubscriber)
    // PubSub.unsubscribe(token)
    console.log('token:', token)
  }, [acceptedFiles])

  return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>
}
