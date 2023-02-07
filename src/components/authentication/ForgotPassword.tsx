import React, { useState } from 'react'
import {
  Text,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  FormLabel,
  Box,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import { useDispatch } from 'react-redux'
import { useForgotPasswordMutation } from '../../generated/graphql'
import * as Yup from 'yup'

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required.'),
})

function ForgotPassword() {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values) => {
        await forgotPassword({ variables: values })
        setComplete(true)
      }}
    >
      {({ isSubmitting }) =>
        complete ? (
          <Box>
            You should receive a password reset link in your mail address
            shortly.
          </Box>
        ) : (
          <Form>
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              rounded={'xl'}
              boxShadow={'lg'}
              p={6}
              my={12}
              className="bg-black"
            >
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Forgot your password?
              </Heading>

              <Text
                fontSize={{ base: 'sm', sm: 'md' }}
                // color={useColorModeValue('gray.800', 'gray.400')}
              >
                You&apos;ll get an email with a reset link
              </Text>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>

                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                  name="email"
                />
              </FormControl>

              <Stack spacing={6}>
                <Button
                  type="submit"
                  className="w-1/2 ml-auto"
                  size="md"
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.900',
                  }}
                  isLoading={isSubmitting}
                >
                  Request reset
                </Button>
              </Stack>

              <Text
                className="text-lg text-green-100 cursor-pointer"
                onClick={() => {
                  dispatch(setShowLoginComponent(true))
                  dispatch(setShowRegisterComponent(false))
                  dispatch(setShowForgotPasswordComponent(false))
                }}
              >
                Back
              </Text>
            </Stack>
          </Form>
        )
      }
    </Formik>
  )
}

export default ForgotPassword
