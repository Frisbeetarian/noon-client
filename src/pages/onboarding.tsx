import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { toErrorMap } from '../utils/toErrorMap'
import { Field, Form, Formik } from 'formik'

import {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
} from '../generated/graphql'

import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import * as Yup from 'yup'
import { isServer } from '../utils/isServer'
import { withApollo } from '../utils/withApollo'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password is too short')
    .max(120, 'Password is too long')
    .required('Password is required'),
})

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username or email required'),
  password: Yup.string()
    .min(4, 'Password is too short')
    .max(120, 'Password is too long')
    .required('Password is required'),
})

const Onboarding = () => {
  const router = useRouter()
  const [
    login,
    // { loading: loginLoading }
  ] = useLoginMutation()

  const [
    register,
    // { loading: registerLoading }
  ] = useRegisterMutation()

  // const loggedInUser = useSelector(getLoggedInUser)
  const [showPassword, setShowPassword] = useState(false)
  const [showLogin, setLogin] = useState(false)
  const [showRegister, setRegister] = useState(true)
  const [showForgotPassword, setForgotPassword] = useState(false)

  const { data } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.me?.username) {
      router.replace('/noon')
    }
    // else {
    //   // router.replace('/noon')
    // }
  }, [data])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      <p className="fixed top-12 text-5xl">NOON</p>

      {/*{fetching ? (*/}
      {/*  <div>loading...</div>*/}
      {/*) : (*/}
      <Flex minH={'100%'} align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
          hidden={!showLogin}
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login to your account</Heading>
          </Stack>

          <Box boxShadow={'lg'} p={8} className="border bg-black">
            <Formik
              initialValues={{
                usernameOrEmail: '',
                password: '',
                rememberMe: false,
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: {
                    username: values.usernameOrEmail,
                    password: values.password,
                    rememberMe: values.rememberMe,
                  },
                })

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user) {
                  if (typeof router.query.next === 'string') {
                    router.push(router.query.next)
                  } else {
                    router.replace('/noon')
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4} className="text-white">
                    <FormControl id="email" isRequired>
                      {/*<FormLabel>Email address</FormLabel>*/}
                      <InputField
                        placeholder="Username or email"
                        name="usernameOrEmail"
                        label="Username or Email"
                      />
                    </FormControl>

                    <FormControl id="password" isRequired>
                      <InputField
                        name="password"
                        label="Password"
                        type="password"
                      />
                    </FormControl>

                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      >
                        <FormControl id="rememberMe" className="cursor-pointer">
                          <label className="cursor-pointer">
                            <Field
                              type="checkbox"
                              name="rememberMe"
                              className="mr-2 "
                            />
                            Remember me
                          </label>
                        </FormControl>

                        <Link
                          color={'blue.400'}
                          onClick={() => {
                            setLogin(false)
                            setRegister(false)
                            setForgotPassword(true)
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Stack>

                      <Button
                        size="lg"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.900',
                        }}
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Login
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>

          <Text
            className="text-lg text-green-100 cursor-pointer"
            onClick={() => {
              setRegister(true)
              setLogin(false)
            }}
          >
            Register?
          </Text>
        </Stack>

        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
          hidden={!showRegister}
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Register
            </Heading>
          </Stack>

          <Box boxShadow={'lg'} p={8} className="border bg-black">
            <Formik
              initialValues={{ email: '', username: '', password: '' }}
              validationSchema={RegisterSchema}
              onSubmit={async (values, { setErrors }) => {
                console.log(values)
                const response = await register({
                  variables: { options: values },
                })

                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors))
                } else if (response.data?.register.user) {
                  router.replace('/noon')
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl id="username" isRequired>
                          <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                          />
                        </FormControl>
                      </Box>
                    </HStack>

                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <InputField name="email" placeholder="" label="" />
                    </FormControl>

                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <InputField
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder=""
                          label=""
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
                      <Button
                        type="submit"
                        loadingText="Submitting"
                        size="lg"
                        bg={'green.400'}
                        color={'white'}
                        _hover={{
                          bg: 'green.900',
                        }}
                        isLoading={isSubmitting}
                      >
                        Register
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>

          <Text
            className="text-lg text-green-100 cursor-pointer"
            onClick={() => {
              setLogin(true)
              setRegister(false)
            }}
          >
            Login?
          </Text>
        </Stack>

        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
          className="bg-black"
          hidden={!showForgotPassword}
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

          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>

          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Request Reset
            </Button>
          </Stack>

          <Text
            className="text-lg text-green-100 cursor-pointer"
            onClick={() => {
              setLogin(true)
              setRegister(false)
              setForgotPassword(false)
            }}
          >
            Back
          </Text>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default withApollo({ ssr: false })(Onboarding)
