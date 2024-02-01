// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Box,
  CloseButton,
  Flex,
  FormControl,
  HStack,
  Stack,
  useToast,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import {
  getIsMobile,
  setCreateGroupComponent,
  toggleCreateGroupActive,
} from '../store/ui'

import GroupParticipant from './GroupParticipant'
import { getSocketAuthObject } from '../store/sockets'
import { clearState, getParticipants } from '../store/groups'
import { getLoggedInUser } from '../store/users'
import { setOngoingCall } from '../store/chat'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import SocketManager from './SocketIo/SocketManager'
import AppButton from './AppComponents/AppButton'
import AppInput from './AppComponents/AppInput'

const createGroupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Group name is required'),
})

export default function CreateGroupSidebar() {
  const dispatch = useDispatch()
  const participants = useSelector(getParticipants)
  const loggedInUser = useSelector(getLoggedInUser)
  const [friends, setFriends] = useState(null)
  const [zeroFriendsError, setZeroFriendsError] = useState(false)
  const toast = useToast()
  const isMobile = useSelector(getIsMobile)
  const socketAuthObject = useSelector(getSocketAuthObject)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  // const [
  //   createGroupConversation,
  //   // { loading: createGroupConversationLoading }
  // ] = useCreateGroupConversationMutation()

  useEffect(() => {
    setFriends(loggedInUser?.user?.profile?.friends)

    if (socket) {
      socket.on('set-ongoing-call-for-conversation', () => {
        dispatch(
          setOngoingCall()
          //   {
          //   uuid: '',
          //   initiator: {
          //     uuid: from,
          //     username: fromUsername,
          //   },
          // }
        )
      })
    }

    return () => {
      if (socket) socket.off('set-ongoing-call-for-conversation')
    }
  }, [])

  return (
    <div className="create-group-sidebar bg-black text-white w-10/12 md:w-3/4 xl:w-2/5">
      <h1 className="text-xl mb-10 text-red-500 font-bold ">Create Group</h1>

      <Flex className="flex-col md:flex-row items-center md:items-start ">
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={createGroupSchema}
          onSubmit={async (
            values
            // { setErrors }
          ) => {
            try {
              if (participants.length !== 0) {
                const participantsToSend = [...participants]

                participantsToSend.push(loggedInUser.user?.profile?.uuid)

                // const conversation = await createGroupConversation({
                //   variables: {
                //     input: { ...values, type: 'group' },
                //     participants: participantsToSend,
                //   },
                // })

                dispatch(clearState())

                // socket.emit('group-created', {
                //   fromUuid: loggedInUser.user?.profile?.uuid,
                //   fromUsername: loggedInUser.user?.profile?.username,
                //   groupUuid: conversation.data?.createGroupConversation.uuid,
                //   conversation: conversation.data?.createGroupConversation,
                //   participants: participantsToSend,
                // })
                //
                // dispatch(
                //   addConversation({
                //     conversation: conversation.data?.createGroupConversation,
                //     loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                //   })
                // )

                dispatch(setCreateGroupComponent(false))
                dispatch(toggleCreateGroupActive(false))

                toast({
                  title: `${values.name} has been created. `,
                  position: 'bottom-right',
                  isClosable: true,
                  status: 'success',
                  duration: 5000,
                })
              } else {
                setZeroFriendsError(true)
              }
            } catch (e) {
              console.log('create group error:', e)
              toast({
                title: `The server had a tantrum and refused to create your group. `,
                position: 'bottom-right',
                isClosable: true,
                status: 'error',
                duration: 5000,
              })
            }
          }}
        >
          {({}) => (
            <Form className="flex w-full md:w-2/4">
              <Stack spacing={4}>
                <p className="text-red-500 font-bold  text-lg md:text-md">
                  Group details
                </p>

                <HStack className="pl-1">
                  <Box>
                    <FormControl id="name" isRequired>
                      <AppInput
                        name="name"
                        placeholder="Name"
                        label="Group name"
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="description" className="pl-1" isRequired>
                  <AppInput
                    name="description"
                    placeholder="Description"
                    label="Group description"
                  />
                </FormControl>

                {isMobile && (
                  <Flex className="flex-col pt-5 text-black w-full md:w-2/4 box-content">
                    <p className="text-red-500 font-bold  text-lg md:text-md">
                      Friends
                    </p>

                    {friends ? (
                      (friends as any).map((friend) => (
                        <GroupParticipant
                          key={friend.uuid}
                          participant={friend}
                        ></GroupParticipant>
                      ))
                    ) : (
                      <p>No friends added yet.</p>
                    )}

                    {zeroFriendsError && (
                      <p className="text-red-500 ml-auto text-sm mt-2">
                        You must add at least one friend to the group.
                      </p>
                    )}
                  </Flex>
                )}

                <Stack spacing={10} pt={2}>
                  <AppButton
                    className="w-3/5 ml-auto"
                    type="submit"
                    loadingText="Submitting"
                    size="md"
                  >
                    Create group
                  </AppButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        {!isMobile && (
          <Flex className="flex-col  w-2/4 box-content">
            <p className="text-red-500 font-bold text-lg md:text-md">Friends</p>

            {friends ? (
              (friends as any).map((friend) => (
                <GroupParticipant
                  key={friend.uuid}
                  participant={friend}
                  // className="mb-3 box-content cursor-pointer"
                ></GroupParticipant>
              ))
            ) : (
              <p>No friends added yet.</p>
            )}

            {zeroFriendsError && (
              <p className="text-red-500 ml-auto text-sm mt-2">
                You must add at least one friend to the group.
              </p>
            )}
          </Flex>
        )}
        <CloseButton
          className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
          onClick={() => {
            dispatch(toggleCreateGroupActive(false))
          }}
        />
      </Flex>
    </div>
  )
}
