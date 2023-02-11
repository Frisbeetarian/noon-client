import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { getLoggedInUser } from '../store/users'
import { getSocket } from '../store/sockets'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import { useUploadImageMutation } from '../generated/graphql'
import { emitPrivateChatMessage } from '../utils/SocketEmits'
export const FileUpload = ({ children }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const profile = useSelector(getActiveConversee)
  const socket = useSelector(getSocket)
  const [uploadImageMutation] = useUploadImageMutation()

  const { acceptedFiles, getRootProps } = useDropzone()

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      uploadImageMutation({
        variables: {
          file: acceptedFiles[0] as any,
          conversationUuid: activeConversation.uuid,
          profileUuid: loggedInUser.user.profile.uuid,
        },
      })
        .then(async (response) => {
          if (activeConversation.type === 'pm') {
            emitPrivateChatMessage({
              loggedInUser,
              profile,
              response,
              activeConversation,
              socket,
            })
          } else {
            activeConversation.profiles.map((conversationProfile) => {
              if (
                conversationProfile.uuid !== loggedInUser.user?.profile?.uuid
              ) {
                emitPrivateChatMessage({
                  loggedInUser,
                  profile: conversationProfile,
                  response,
                  activeConversation,
                  socket,
                })

                // socket.emit('private-chat-message', {
                //   content:
                //     loggedInUser.user?.profile?.username +
                //     ' sent you a message.',
                //   from: loggedInUser.user?.profile?.uuid,
                //   fromUsername: loggedInUser.user?.profile?.username,
                //   to: conversationProfile.uuid,
                //   toUsername: conversationProfile.username,
                //   messageUuid: response.data?.uploadImage.uuid,
                //   message: response.data?.uploadImage.content,
                //   type: response.data?.uploadImage.type,
                //   src: response.data?.uploadImage.src,
                //   conversationUuid: activeConversation.uuid,
                // })
              }
            })
          }

          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: response.data?.uploadImage.uuid as string,
                content: response.data?.uploadImage.content as string,
                from: 'me',
                type: response.data?.uploadImage.type as string,
                src: response.data?.uploadImage.src,
                conversationUuid: activeConversation.uuid,
                deleted: false,
                updatedAt: new Date().toString(),
                createdAt: new Date().toString(),
                sender: {
                  uuid: loggedInUser?.user?.profile?.uuid,
                  username: loggedInUser?.user?.profile?.username,
                },
              },
              loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
            })
          )
        })
        .catch((error) => {
          console.log('error:', error)
        })
    }
  }, [acceptedFiles])

  return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>
}
