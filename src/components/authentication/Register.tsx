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
// import { useRegisterMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import withAxios from '../../utils/withAxios'

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

  // const [
  //   register,
  //   // { loading: registerLoading }
  // ] = useRegisterMutation()

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'start'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Register
        </Heading>
      </Stack>

      <Box
        boxShadow={'lg'}
        border={0}
        p={8}
        className="border bg-red-500 text-black"
      >
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validationSchema={RegisterSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setErrors }) => {
            const response = await axios.post('/api/users/register', values)
            // const response = await axios.post('/api/users/register', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ options: values }),
            // })
            console.log('response: ', response)

            if (response && response.statusText === 'OK') {
              const data = await response.data.json()
              if (data.errors) {
                setErrors(toErrorMap(data.errors))
              } else if (data.user) {
                router.replace('/noon')
              }
            } else {
              console.error('Failed to register')
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="username" isRequired>
                      <FormLabel
                        requiredIndicator={
                          <span
                            style={{ color: 'text-black', marginLeft: '5px' }}
                          >
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
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="email" isRequired>
                  <FormLabel
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
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel
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
                    className="w-1/2 ml-auto"
                    sx={{
                      width: '50%',
                      marginLeft: 'auto',
                      backgroundColor: 'var(--tw-color-red-500)',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: 'var(--tw-color-red-900)',
                        color: 'var(--tw-color-red-200)',
                      },
                    }}
                    type="submit"
                    size="md"
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
        className="text-lg text-red-500 cursor-pointer"
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

export default withAxios(Register)
