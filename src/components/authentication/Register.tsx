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

function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [
    register,
    // { loading: registerLoading }
  ] = useRegisterMutation()
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
          // setLogin(true)
          // setRegister(false)
        }}
      >
        Login?
      </Text>
    </Stack>
  )
}

export default Register
