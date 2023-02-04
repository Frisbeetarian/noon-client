import React, { useEffect, useState } from 'react'
import { Box, Button, CloseButton, Flex, Input } from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setCreateGroupComponent,
  setSearchComponent,
  toggleCreateGroupActive,
} from '../store/ui'

import GroupParticipant from './GroupParticipant'
import { getSocket } from '../store/sockets'
import { clearState, getParticipants } from '../store/groups'
import { getLoggedInUser } from '../store/users'
import { useCreateGroupConversationMutation } from '../generated/graphql'
import { addConversation, setOngoingCall } from '../store/chat'
import { useFormik } from 'formik'
import { setSearchQuery } from '../store/search'

export default function CreateGroupSidebar() {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const participants = useSelector(getParticipants)
  const loggedInUser = useSelector(getLoggedInUser)
  const [friends, setFriends] = useState(null)

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

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },

    onSubmit: async (values) => {
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

        console.log('conversation:', conversation)

        dispatch(
          addConversation({
            conversation: conversation.data?.createGroupConversation,
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        )

        dispatch(setCreateGroupComponent(false))
      }
    },
  })

  return (
    <div className="search-sidebar bg-gray-800 w-10/12 md:w-3/4">
      <h1 className="text-xl mb-10">Create Group</h1>

      <Flex className="">
        <form className="flex w-2/4" onSubmit={formik.handleSubmit}>
          <Flex className="mr-5 w-3/4" direction="column">
            <Box>
              <label className="">Group name</label>

              <Input
                className="mt-2"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Box>

            <Box mt={4}>
              <label>Group description</label>

              <Input
                className="mt-2"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Box>

            <Button
              ml="auto"
              mt={4}
              type="submit"
              colorScheme="teal"
              className="box-content w-2/5"
            >
              create group
            </Button>
          </Flex>
        </form>

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
