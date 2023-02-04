import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  HStack,
  Stack,
  useToast,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { setCreateGroupComponent, toggleCreateGroupActive } from '../store/ui'

import GroupParticipant from './GroupParticipant'
import { getSocket } from '../store/sockets'
import { clearState, getParticipants } from '../store/groups'
import { getLoggedInUser } from '../store/users'
import { useCreateGroupConversationMutation } from '../generated/graphql'
import { addConversation, setOngoingCall } from '../store/chat'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
// import { toErrorMap } from '../utils/toErrorMap'
import { InputField } from './InputField'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const createGroupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Group name is required'),
})

export default function CreateGroupSidebar() {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const participants = useSelector(getParticipants)
  const loggedInUser = useSelector(getLoggedInUser)
  const [friends, setFriends] = useState(null)
  const [zeroFriendsError, setZeroFriendsError] = useState(false)
  const toast = useToast()

  const [
    createGroupConversation,
    // { loading: createGroupConversationLoading }
  ] = useCreateGroupConversationMutation()

  useEffect(() => {
    setFriends(loggedInUser?.user?.friends)

    if (socket) {
      socket.on(
        'set-ongoing-call-for-conversation',
        ({ from, fromUsername }) => {
          dispatch(
            setOngoingCall({
              uuid: '',
              initiator: {
                uuid: from,
                username: fromUsername,
              },
            })
          )
        }
      )
    }

    return () => {
      if (socket) socket.off('set-ongoing-call-for-conversation')
    }
  }, [])

  return (
    <div className="search-sidebar bg-gray-800 w-10/12 md:w-3/4">
      <h1 className="text-xl mb-10">Create Group</h1>

      <Flex className="">
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

                const conversation = await createGroupConversation({
                  variables: {
                    input: { ...values, type: 'group' },
                    participants: participantsToSend,
                  },
                })

                dispatch(clearState(null))

                socket.emit('group-created', {
                  fromUuid: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  groupUuid: conversation.data?.createGroupConversation.uuid,
                  conversation: conversation.data?.createGroupConversation,
                  participants: participantsToSend,
                })

                dispatch(
                  addConversation({
                    conversation: conversation.data?.createGroupConversation,
                    loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                  })
                )

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
            <Form className="flex w-2/4">
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="name" isRequired>
                      <InputField
                        name="name"
                        placeholder="name"
                        label="Group name"
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="description" isRequired>
                  <InputField
                    name="description"
                    placeholder="description"
                    label="Group description"
                  />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    className="w-3/5 ml-auto"
                    type="submit"
                    loadingText="Submitting"
                    size="md"
                    bg={'green.500'}
                    color={'white'}
                    _hover={{
                      bg: 'green.900',
                    }}
                  >
                    Create group
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        <Flex className="flex-col text-black w-2/4 box-content">
          <p className="text-white">Add friends</p>

          {friends
            ? (friends as any).map((friend) => (
                <GroupParticipant
                  key={friend.uuid}
                  participant={friend}
                  // className="mb-3 box-content cursor-pointer"
                ></GroupParticipant>
              ))
            : null}

          {zeroFriendsError && (
            <p className="text-red-500 ml-auto text-sm mt-2">
              You must add at least one friend to the group.
            </p>
          )}
        </Flex>

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
