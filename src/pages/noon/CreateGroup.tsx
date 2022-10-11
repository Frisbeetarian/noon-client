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
import { setOngoingCall } from '../../store/chat'
import { useSelector, useDispatch } from 'react-redux'

import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { useCreateGroupConversationMutation } from '../../generated/graphql'

const CreateGroup = ({}) => {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)

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
      const conversation = await createGroupConversation({
        input: { ...values, type: 'group' },
        participants: [
          '5552ea28-9446-40c4-8c8c-3faff087b492',
          '61774c01-0d73-4ca0-aa54-cd33d250c0dd',
          '2147ceeb-4f52-4bfd-8b9a-26a6ef5e9054',
        ],
      })

      socket.emit('group-created', {
        groupUuid: conversation.uuid,
        participants: [
          '5552ea28-9446-40c4-8c8c-3faff087b492',
          '61774c01-0d73-4ca0-aa54-cd33d250c0dd',
          '2147ceeb-4f52-4bfd-8b9a-26a6ef5e9054',
        ],
      })

      console.log('conversation:', conversation)
    },
  })

  return (
    <Flex
      className="flex-col w-full py-3 px-5 relative box-content h-full"
      style={{ height: '70vh' }}
    >
      <p className="mb-5">Create Group</p>

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
            ? friends
                // .sort((a, b) => a.time - b.time)
                .map((friend) => (
                  <Flex
                    key={friend.uuid}
                    className=" mb-3 box-content cursor-pointer"
                  >
                    <span className="bg-gray-300 p-2 hover:bg-green-300 ">
                      {friend.username}
                    </span>

                    {/* <span className="message">{message.value}</span>
                    <span className="date">
                      {new Date(message.time).toLocaleTimeString()}
                    </span> */}
                  </Flex>
                ))
            : null}
          {/* </Flex> */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateGroup
