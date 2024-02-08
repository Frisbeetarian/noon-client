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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import AppButton from '../AppComponents/AppButton'
import { useRegisterUserMutation } from '../../store/api/usersApiSlice'

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

function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation()

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await registerUser(values).unwrap()

      if (response) {
        if (response.errors) {
          setErrors(toErrorMap(response.errors))
        } else if (response && isSuccess) {
          router.replace('/noon')
        }
      } else {
        console.error('Failed to register')
      }
    } catch (error) {
      // @ts-ignore
      if (error?.errors) {
        // @ts-ignore
        setErrors(toErrorMap(error?.errors))
      } else {
        console.error('Error registering:', error)
      }
    }
  }

  return (
    <Stack
      spacing={8}
      mx={'auto'}
      maxW={'xlg'}
      py={12}
      px={6}
      className=" z-10"
    >
      <Box boxShadow={'lg'} p={8} className="border border-red-500 z-10">
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validationSchema={RegisterSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={8} className="text-white">
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
                    isLoading={isSubmitting || isLoading}
                    disabled={isSuccess}
                    rightIcon={isSuccess}
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
