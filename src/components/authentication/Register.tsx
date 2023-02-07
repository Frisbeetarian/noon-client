import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
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
import { useRegisterMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'

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

  const [
    register,
    // { loading: registerLoading }
  ] = useRegisterMutation()
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'start'}>
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
                      <FormLabel>Username</FormLabel>

                      <InputField
                        name="username"
                        placeholder="Username"
                        label=""
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>

                  <InputField
                    name="email"
                    placeholder="Email address"
                    label=""
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel className="">Password</FormLabel>

                  <InputGroup m={0} p={0} className="">
                    <InputField
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
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
                    className="w-1/2 ml-auto "
                    type="submit"
                    size="md"
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
          // setLogin(true)
          // setRegister(false)
          // router.push('/login', undefined, { shallow: true })
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
