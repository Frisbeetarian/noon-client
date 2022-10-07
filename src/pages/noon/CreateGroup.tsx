import React, { useEffect } from 'react'
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

const CreateGroup = ({}) => {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const loggedInUser = useSelector(getLoggedInUser)

  useEffect(() => {
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
      if (!error) {
        console.log('FDEWFWEFWEFWE')
      }
    },
  })

  return (
    <Flex
      className="flex-col w-full py-3 px-5 relative box-content h-full "
      style={{ height: '70vh' }}
    >
      <p className="mb-5">Create Group</p>
      <form className="flex" onSubmit={formik.handleSubmit}>
        <Flex className=" mr-5" direction="column">
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
        </Flex>
      </form>
    </Flex>
  )
}

export default CreateGroup
