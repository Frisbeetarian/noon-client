import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useMutation } from 'urql'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:4020'
const socket = io(ENDPOINT, { autoConnect: false })

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()
  const [socketError, setSocketError] = useState(false)

  function establishSocketConnection(username) {
    try {
      const sessionID = localStorage.getItem('sessionID')
      console.log('sessionID:', sessionID)

      console.log('username or email:', username)
      if (sessionID) {
        socket.auth = { sessionID, username: username }
        socket.connect()
      } else {
        // alert('DW')
        socket.auth = { username: username }
        socket.connect()
      }
    } catch (e) {
      setSocketError(true)
    }
  }

  useEffect(() => {
    socket.on('session', ({ sessionID, userID }) => {
      console.log('session received:', sessionID)
      socket.auth = { sessionID }
      localStorage.setItem('sessionID', sessionID)
      socket.userID = userID
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        // setIsConnected(false)
      }
    })

    socket.on('connect', () => {
      // setIsConnected(true)
    })

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })
    return () => socket.off('connect_error')
  }, [])

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values)
          const response = await register({ options: values })

          console.log('register response: ', response.data)
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            await establishSocketConnection(values.username)

            // worked
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />

            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>

            <Box mt={4}>
              <InputField
                name="password"
                type="password"
                placeholder="password"
                label="Password"
              />
            </Box>

            <Button
              isLoading={isSubmitting}
              mt={4}
              type="submit"
              colorScheme="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
