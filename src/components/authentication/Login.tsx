import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../../generated/graphql'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import { useDispatch } from 'react-redux'

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, 'Username is too short.')
    .max(50, 'Username is too long.')
    .required('Username or email required.'),
  password: Yup.string()
    .min(4, 'Password is too short.')
    .max(120, 'Password is too long.')
    .required('Password is required.'),
})

function Login() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [
    login,
    // { loading: loginLoading }
  ] = useLoginMutation()

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
                  <FormLabel>Username</FormLabel>
                  <InputField
                    placeholder="Username"
                    name="usernameOrEmail"
                    label=""
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>

                  <InputField
                    name="password"
                    placeholder="Password"
                    label=""
                    type="password"
                  />
                </FormControl>

                <Stack spacing={0} className="">
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
                  </Stack>

                  <Link
                    className="pt-1"
                    color={'blue.400'}
                    onClick={() => {
                      dispatch(setShowForgotPasswordComponent(true))
                      dispatch(setShowLoginComponent(false))
                      dispatch(setShowRegisterComponent(false))
                    }}
                  >
                    Forgot password?
                  </Link>

                  <Stack>
                    <Button
                      className="w-1/2 ml-auto mt-5"
                      size="md"
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
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>

      <Text
        className="text-lg text-green-100 cursor-pointer"
        onClick={() => {
          dispatch(setShowRegisterComponent(true))
          dispatch(setShowLoginComponent(false))
          dispatch(setShowForgotPasswordComponent(false))
        }}
      >
        Register?
      </Text>
    </Stack>
  )
}

export default Login
