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

import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useDisclosure } from '@chakra-ui/hooks'

import React, { useEffect, useState } from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'

import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { toErrorMap } from '../utils/toErrorMap'
import { Form, Formik } from 'formik'

import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql'

import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import * as Yup from 'yup'
import { isServer } from '../utils/isServer'

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

const OnboardingPage = () => {
  const router = useRouter()
  const [, login] = useLoginMutation()
  const [, register] = useRegisterMutation()

  const loggedInUser = useSelector(getLoggedInUser)
  const [showPassword, setShowPassword] = useState(false)

  const [showLogin, setLogin] = useState(false)
  const [showRegister, setRegister] = useState(true)
  const [showForgotPassword, setForgotPassword] = useState(false)

  let [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    requestPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.me?.username) {
      router.replace('/noon')
    } else {
      // router.replace('/noon')
    }
  }, [data])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      <p className="fixed top-12 text-5xl">NOON</p>

      {fetching ? (
        <div>loading...</div>
      ) : (
        // <Stack spacing={8}></Stack>

        <Flex minH={'100%'} align={'center'} justify={'center'}>
          <Stack
            spacing={8}
            mx={'auto'}
            maxW={'lg'}
            py={12}
            px={6}
            // onClose={onLoginClose}
            // isOpen={showLogin}
            hidden={!showLogin}
          >
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Login to your account</Heading>
              {/*<Text fontSize={'lg'} color={'gray.600'}>*/}
              {/*  to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}*/}
              {/*  ✌️*/}
              {/*</Text>*/}
            </Stack>

            <Box
              // rounded={'lg'}
              // bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              className="border bg-black"
            >
              <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login({
                    username: values.usernameOrEmail,
                    password: values.password,
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
                      <FormControl id="email">
                        {/*<FormLabel>Email address</FormLabel>*/}
                        <InputField
                          name="usernameOrEmail"
                          label="Username or Email"
                        />
                      </FormControl>

                      <FormControl id="password">
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
                          <Checkbox>Remember me</Checkbox>
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
            // isOpen={showRegister}
            // onClose={onRegisterClose}
            hidden={!showRegister}
          >
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Register
              </Heading>
            </Stack>

            <Box
              // rounded={'lg'}
              // bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              className="border bg-black"
            >
              <Formik
                initialValues={{ email: '', username: '', password: '' }}
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setErrors }) => {
                  console.log(values)
                  const response = await register({ options: values })

                  console.log(
                    'register response: ',
                    response.data?.register.errors
                  )

                  if (response.data?.register.errors) {
                    console.log('register response: ', response.data)
                    setErrors(toErrorMap(response.data.register.errors))
                  } else if (response.data?.register.user) {
                    // await establishSocketConnection(values.username)
                    // worked
                    console.log('register response: ', response.data)
                    router.replace('/noon')
                    // router.
                  }
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Stack spacing={4}>
                      <HStack>
                        <Box>
                          <FormControl id="username" isRequired>
                            {/*<FormLabel>First Name</FormLabel>*/}
                            {/*/!*<Input type="text" />*!/*/}
                            {/*<InputField*/}
                            {/*  name="firstname"*/}
                            {/*  placeholder=""*/}
                            {/*  label=""*/}
                            {/*/>*/}

                            <InputField
                              name="username"
                              placeholder="username"
                              label="Username"
                            />
                            {/*{errors.username && touched.username ? (*/}
                            {/*  <div>{errors.username}</div>*/}
                            {/*) : null}*/}
                          </FormControl>
                        </Box>

                        {/*<Box>*/}
                        {/*  <FormControl id="lastName" isRequired>*/}
                        {/*    <FormLabel>Last Name</FormLabel>*/}
                        {/*    /!*<Input type="text" />*!/*/}
                        {/*    <InputField*/}
                        {/*      name="lastname"*/}
                        {/*      placeholder=""*/}
                        {/*      label=""*/}
                        {/*    />*/}
                        {/*  </FormControl>*/}
                        {/*</Box>*/}
                      </HStack>

                      <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <InputField name="email" placeholder="" label="" />

                        {/*{errors.email && touched.email ? (*/}
                        {/*  <div>{errors.email}</div>*/}
                        {/*) : null}*/}
                      </FormControl>

                      <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          {/*<InputField*/}
                          {/*type={showPassword ? 'text' : 'password'}*/}
                          {/*/>*/}
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
                        >
                          Register
                        </Button>
                      </Stack>
                      {/*<Stack pt={6}>*/}
                      {/*  <Text align={'center'}>*/}
                      {/*    Already a user? <Link color={'blue.400'}>Login</Link>*/}
                      {/*  </Text>*/}
                      {/*</Stack>*/}
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
            // bg={useColorModeValue('white', 'gray.700')}
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
      )}
      {/*)}*/}
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(OnboardingPage)
