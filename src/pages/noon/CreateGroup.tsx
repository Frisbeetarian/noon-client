import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react'

import { Form, Formik, useFormik } from 'formik'
import {
  addConversation,
  setActiveGroupInStore,
  setOngoingCall,
} from '../../store/chat'
import { useSelector, useDispatch } from 'react-redux'

import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import GroupParticipant, {
  groupParticipant,
} from '../../components/GroupParticipant'
import { useCreateGroupConversationMutation } from '../../generated/graphql'
import { getParticipants } from '../../store/groups'
import { setCreateGroupComponent } from '../../store/ui'

const CreateGroup = ({}) => {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  let participants = useSelector(getParticipants)

  const loggedInUser = useSelector(getLoggedInUser)
  const [friends, setFriends] = useState(null)

  const [, createGroupConversation] = useCreateGroupConversationMutation()

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
        let participantsToSend = [...participants]

        participantsToSend.push(loggedInUser.user?.profile?.uuid)
        console.log('participants:', participantsToSend)

        const conversation = await createGroupConversation({
          input: { ...values, type: 'group' },
          participants: participantsToSend,
        })

        socket.emit('group-created', {
          groupUuid: conversation.uuid,
          participants: participantsToSend,
        })

        dispatch(
          addConversation({
            conversation: conversation.data?.createGroupConversation,
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        )

        dispatch(setCreateGroupComponent(false))

        dispatch(
          setActiveGroupInStore({
            conversation: conversation.data?.createGroupConversation,
            loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
          })
        )

        console.log('conversation:', conversation)
      }
    },
  })

  return (
    <Flex
      className="flex-col w-full py-3 px-5 relative box-content h-full"
      style={{ height: '70vh' }}
    >
      <Flex className="w-full justify-between">
        <p className="mb-5">Create Group</p>
        <Button
          className="mr-8"
          onClick={() => {
            dispatch(setCreateGroupComponent(false))
          }}
        >
          X
        </Button>
      </Flex>
      <Flex>
        <form className="flex w-2/4" onSubmit={formik.handleSubmit}>
          <Flex className="mr-5" direction="column">
            <Box>
              <label>Group name</label>

              <Input
                name="name"
                type="text"
                label="Group name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Box>

            <Box mt={4}>
              <label>Group description</label>

              <Input
                name="description"
                type="text"
                label="Group description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Box>

            <Button
              // isLoading={isSubmitting}
              mt={4}
              type="submit"
              colorScheme="teal"
              className="box-content"
            >
              create group
            </Button>
          </Flex>
        </form>

        <Flex className="flex-col text-black w-2/4 box-content">
          <p className="text-white">Add friends</p>

          {friends
            ? friends.map((friend) => (
                <GroupParticipant
                  key={friend.uuid}
                  participant={friend}
                  className="mb-3 box-content cursor-pointer"
                ></GroupParticipant>
              ))
            : null}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateGroup
