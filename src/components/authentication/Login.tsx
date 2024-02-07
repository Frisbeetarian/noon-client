import React from 'react'
import { Box, FormControl, FormLabel, Stack, Text } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import { useDispatch } from 'react-redux'
import AppButton from '../AppComponents/AppButton'

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

function Login({ axios }) {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      {/*<Stack align={'start'} className="text-red-500">*/}
      {/*  <Heading fontSize={'4xl'}>Login to your account</Heading>*/}
      {/*</Stack>*/}

      <Box boxShadow={'lg'} border={0} p={8} className="border">
        <Formik
          initialValues={{
            usernameOrEmail: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setErrors }) => {
            const response = await axios.post('/api/users/login', values)

            if (response.data?.errors) {
              setErrors(toErrorMap(response.data.errors))
            } else if (response.data) {
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
                    placeholder="Username"
                    name="usernameOrEmail"
                    label=""
                    color="white"
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

                  <InputField
                    name="password"
                    placeholder="Password"
                    label=""
                    type="password"
                    color="white"
                    size="lg"
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

                  {/*<Link*/}
                  {/*  className="pt-1"*/}
                  {/*  color={'blue.400'}*/}
                  {/*  onClick={() => {*/}
                  {/*    dispatch(setShowForgotPasswordComponent(true))*/}
                  {/*    dispatch(setShowLoginComponent(false))*/}
                  {/*    dispatch(setShowRegisterComponent(false))*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  Forgot password?*/}
                  {/*</Link>*/}

                  <Stack spacing={10} pt={2}>
                    <AppButton
                      className="w-1/2 ml-auto mt-5 text-"
                      size="md"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Login
                    </AppButton>
                  </Stack>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>

      <Text
        className="text-lg text-red-500 cursor-pointer"
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
