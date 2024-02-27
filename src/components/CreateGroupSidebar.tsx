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
import { addConversation, setOngoingCall } from '../store/chat'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import AppButton from './AppComponents/AppButton'
import withAxios from '../utils/withAxios'
import { InputField } from './InputField'
import useAppAlert from '../hooks/useAppAlert'

const createGroupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Group name is required'),
})

function CreateGroupSidebar({ axios }) {
  const dispatch = useDispatch()
  const participants = useSelector(getParticipants)
  const loggedInUser = useSelector(getLoggedInUser)
  const [friends, setFriends] = useState(null)
  const [zeroFriendsError, setZeroFriendsError] = useState(false)
  const toast = useToast()
  const isMobile = useSelector(getIsMobile)
  const showAppAlert = useAppAlert()

  useEffect(() => {
    setFriends(loggedInUser?.user?.profile?.friends)

    // if (socket) {
    //   socket.on('set-ongoing-call-for-conversation', () => {
    //     dispatch(setOngoingCall())
    //   })
    // }
    //
    // return () => {
    //   if (socket) socket.off('set-ongoing-call-for-conversation')
    // }
  }, [])

  return (
    <div className="create-group-sidebar bg-black text-white w-10/12 md:w-3/4 xl:w-2/5">
      <Flex
        className="justify-center bg-red-500 p-5 mb-5 flex-col border-b border-red-500 border-l border-l-black"
        style={{ height: '5vh' }}
      >
        <h1 className="text-xl text-white border-red-500">Create Group</h1>

        <CloseButton
          className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer mt-1 text-black"
          onClick={() => {
            dispatch(toggleCreateGroupActive(false))
          }}
        />
      </Flex>
      <Flex className="flex-col md:flex-row items-center md:items-start p-5 pt-3">
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={createGroupSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (
            values
            // { setErrors }
          ) => {
            try {
              if (participants.length !== 0) {
                const participantsToSend = [...participants]

                participantsToSend.push(loggedInUser.user?.profile?.uuid)

                await axios
                  .post('/api/conversations', {
                    input: { ...values, type: 'group' },
                    participants: participantsToSend,
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      dispatch(clearState())
                      dispatch(setCreateGroupComponent(false))
                      dispatch(toggleCreateGroupActive(false))

                      dispatch(
                        addConversation({
                          conversation: response.data,
                          loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                        })
                      )

                      showAppAlert({
                        id: 'create-group-toast',
                        title: `${values.name} has been created.`,
                        status: 'success',
                        isClosable: true,
                        duration: 5000,
                      })
                    }
                  })
                  .catch((error) => {
                    console.error('An error occurred:', error.message)
                    toast({
                      title: `Error creating group.`,
                      position: 'bottom-right',
                      isClosable: true,
                      status: 'error',
                      duration: 5000,
                    })
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
          {({ isSubmitting }) => (
            <Form className="flex w-full md:w-2/4">
              <Stack spacing={4}>
                <p className="pb-1 text-white text-xl md:text-md border-b border-red-500">
                  Group details
                </p>

                <HStack className="pl-1 mt-2">
                  <Box>
                    <FormControl id="name" isRequired>
                      <InputField
                        name="name"
                        placeholder="Name"
                        label="Group name"
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="description" className="pl-1">
                  <InputField
                    name="description"
                    placeholder="Description"
                    label="description"
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
                    size="md"
                    isLoading={isSubmitting}
                  >
                    Create group
                  </AppButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        {!isMobile && (
          <Flex className="flex-col w-2/4 box-content mt-2">
            <p className="pb-1 text-white text-xl md:text-md border-b border-red-500">
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
      </Flex>
    </div>
  )
}

export default withAxios(CreateGroupSidebar)
