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
import { useLoginUserMutation } from '../../store/api/usersApiSlice'
import { CheckIcon } from '@chakra-ui/icons'

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
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation()

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await loginUser(values).unwrap()

      if (response) {
        if (response.errors) {
          setErrors(toErrorMap(response.errors))
        } else if (response && isSuccess) {
          router.replace('/noon')
        }
      } else {
        console.error('Failed to login')
      }
    } catch (error) {
      // @ts-ignore
      if (error?.errors) {
        // @ts-ignore
        setErrors(toErrorMap(error?.errors))
      } else {
        console.error('Error logging user in:', error)
      }
    }
  }

  return (
    <Stack spacing={8} mx={'auto'} maxW={'xlg'} py={12} px={6} className="z-10">
      <Box boxShadow={'lg'} p={8} className="border border-red-500 z-10 ">
        <Formik
          initialValues={{
            usernameOrEmail: '',
            password: '',
            rememberMe: false,
          }}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={8} className="text-white">
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

                  <InputField
                    name="password"
                    placeholder="Password"
                    label=""
                    type="password"
                    color="white"
                    // @ts-ignore
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
                      isLoading={isSubmitting || isLoading}
                      disabled={isSuccess}
                      // @ts-ignore
                      rightIcon={isSuccess ? <CheckIcon color="white" /> : null}
                    >
                      {isSuccess ? 'Login' : 'Login'}
                    </AppButton>
                  </Stack>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>

      <Text
        className="text-lg text-red-500 cursor-pointer z-10 menlo font-bold"
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
