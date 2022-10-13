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
import GroupParticipant, {
  groupParticipant,
} from '../../components/GroupParticipant'
import { useCreateGroupConversationMutation } from '../../generated/graphql'
import { getParticipants } from '../../store/groups'

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

        console.log('conversation:', conversation)
      }
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
                  <GroupParticipant
                    key={friend.uuid}
                    participant={friend}
                    className="mb-3 box-content cursor-pointer"
                  ></GroupParticipant>
                  // <Flex
                  //   key={friend.uuid}
                  //   className="mb-3 box-content cursor-pointer"
                  // >
                  //   <span
                  //     className="p-2 hover:bg-green-300"
                  //     style={{ backgroundColor: participantsColor }}
                  //     onClick={() => {
                  //       setParticipantsColor('green')
                  //       if (participants.indexOf(friend.uuid) === -1) {
                  //         setParticipants((oldArray) => [
                  //           friend.uuid,
                  //           ...oldArray,
                  //         ])
                  //       } else {
                  //         const temp = [...participants]
                  //
                  //         // removing the element using splice
                  //         temp.splice(friend.uuid, 1)
                  //
                  //         // updating the list
                  //         setParticipants(temp)
                  //       }
                  //     }}
                  //   >
                  //     {friend.username}
                  //   </span>
                  //   {/* <span className="message">{message.value}</span>
                  //   <span className="date">
                  //     {new Date(message.time).toLocaleTimeString()}
                  //   </span> */}
                  // </Flex>
                ))
            : null}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateGroup
