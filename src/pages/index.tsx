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
  useColorModeValue,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'

import { createUrqlClient } from '../utils/createUrqlClient'

import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
import { useDisclosure } from '@chakra-ui/hooks'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { toErrorMap } from '../utils/toErrorMap'
import { Form, Formik } from 'formik'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'

// function FormLabel(props: { children: ReactNode }) {
//   return null
// }

const Index = () => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })
  let data = null
  let fetching = null

  const loggedInUser = useSelector(getLoggedInUser)
  const [showPassword, setShowPassword] = useState(false)

  const [showLogin, setLogin] = useState(true)
  const [showRegister, setRegister] = useState(false)
  const [showForgotPassword, setForgotPassword] = useState(false)

  // const {
  //   isOpen: isLoginOpen,
  //   onOpen: onLoginOpen,
  //   onClose: onLoginClose,
  // } = useDisclosure({ defaultIsOpen: true, isOpen: true })

  // const {
  //   isOpen: isForgotPasswordOpen,
  //   onOpen: onForgotPasswordOpen,
  //   onClose: onForgotPasswordClose,
  // } = useDisclosure()

  return (
    <Layout>
      {loggedInUser.user.profile != null ? (
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
              className="border bg-black "
            >
              <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login(values)
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                  } else if (response.data?.login.user) {
                    router.push('/')
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
                        {/*<FormLabel>Password</FormLabel>*/}
                        <InputField name="password" label="Password" />
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
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
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
              color={useColorModeValue('gray.800', 'gray.400')}
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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index)
