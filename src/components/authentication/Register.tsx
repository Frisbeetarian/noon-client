import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import AppButton from '../AppComponents/AppButton'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short.')
    .max(50, 'Username is too long.')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required.'),
  password: Yup.string()
    .min(4, 'Password is too short.')
    .max(120, 'Password is too long.')
    .required('Password is required.'),
})

function Register({ axios }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Stack
      spacing={8}
      mx={'auto'}
      maxW={'xlg'}
      py={12}
      px={6}
      className=" z-10"
    >
      {/*<Stack align={'start'}>*/}
      {/*  <Heading*/}
      {/*    fontSize={'4xl'}*/}
      {/*    textAlign={'centr'}*/}
      {/*    className="text-white"*/}
      {/*  >*/}
      {/*    Register*/}
      {/*  </Heading>*/}
      {/*</Stack>*/}

      <Box boxShadow={'lg'} p={8} className="border border-red-500 z-10">
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validationSchema={RegisterSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setErrors }) => {
            await axios
              .post('/api/users/register', values)
              .then((response) => {
                if (response) {
                  if (response.data.errors) {
                    setErrors(toErrorMap(response.data.errors))
                  } else if (response.data && response.statusText === 'OK') {
                    router.replace('/noon')
                  }
                } else {
                  console.error('Failed to register')
                }
              })
              .catch((error) => {
                console.error('Error registering:', error.message)
              })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={8} className="text-white">
                {/*<HStack>*/}
                {/*<Box>*/}
                <FormControl id="username" isRequired>
                  <FormLabel
                    style={{ fontSize: '1.1rem' }}
                    requiredIndicator={
                      <span style={{ color: 'text-black', marginLeft: '5px' }}>
                        *
                      </span>
                    }
                  >
                    Username
                  </FormLabel>

                  <InputField
                    name="username"
                    placeholder="Username"
                    label=""
                    color="white"
                    // @ts-ignore
                    size="lg"
                  />
                </FormControl>
                {/*</Box>*/}
                {/*</HStack>*/}

                <FormControl id="email" isRequired>
                  <FormLabel
                    style={{ fontSize: '1.1rem' }}
                    requiredIndicator={
                      <span style={{ color: 'text-black', marginLeft: '5px' }}>
                        *
                      </span>
                    }
                  >
                    Email address
                  </FormLabel>

                  <InputField
                    name="email"
                    placeholder="Email address"
                    label=""
                    color="white"
                    // @ts-ignore
                    size="lg"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel
                    style={{ fontSize: '1.1rem' }}
                    requiredIndicator={
                      <span style={{ color: 'text-black', marginLeft: '5px' }}>
                        *
                      </span>
                    }
                  >
                    Password
                  </FormLabel>

                  <InputGroup m={0} p={0} className="">
                    <InputField
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      label=""
                      color="white"
                      // @ts-ignore
                      size="lg"
                    />

                    <InputRightElement h={'full'} className="mt-1">
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <AppButton
                    className="w-1/2 ml-auto"
                    type="submit"
                    size="md"
                    isLoading={isSubmitting}
                  >
                    Register
                  </AppButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>

      <Text
        className="text-lg text-red-500 cursor-pointer z-10 menlo font-bold"
        onClick={() => {
          dispatch(setShowLoginComponent(true))
          dispatch(setShowRegisterComponent(false))
          dispatch(setShowForgotPasswordComponent(false))
        }}
      >
        Login?
      </Text>
    </Stack>
  )
}

export default Register
