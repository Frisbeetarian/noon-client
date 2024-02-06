import React, { useState } from 'react'
import {
  Text,
  Button,
  FormControl,
  Heading,
  Stack,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'

import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { InputField } from '../InputField'

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required.'),
})

function ForgotPassword() {
  const [complete, setComplete] = useState(false)
  // const [forgotPassword] = useForgotPasswordMutation()
  const dispatch = useDispatch()

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'start'}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
      </Stack>

      <Box boxShadow={'lg'} p={8} className="border bg-black">
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
              <Flex className="flex-col">
                <Box>You should get an email with a reset link shortly.</Box>
              </Flex>
            ) : (
              <Form>
                <Stack
                  spacing={4}
                  w={'full'}
                  maxW={'md'}
                  rounded={'xl'}
                  boxShadow={'lg'}
                  className="bg-black"
                >
                  <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    // color={useColorModeValue('gray.800', 'gray.400')}
                  >
                    You&apos;ll get an email with a reset link.
                  </Text>

                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>

                    <InputField
                      placeholder="your-email@example.com"
                      name="email"
                      label=""
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
                </Stack>
              </Form>
            )
          }
        </Formik>
      </Box>

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
  )
}

export default ForgotPassword
