import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Field, Form, Formik } from 'formik'

import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import {
  setIsRegistering,
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import AppButton from '../AppComponents/AppButton'
import { useLoginUserMutation } from '../../store/api/usersApiSlice'
import KeyManagement from '../../utils/KeyManagement'

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
  // const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation()

  const handleFileUpload = async (event) => {
    const fileReader = new FileReader()
    fileReader.onload = async (e) => {
      const keys = JSON.parse(e.target.result)
      try {
        await KeyManagement.decryptAndSetMasterKey(
          {
            encryptedMasterKey: KeyManagement.base64ToArrayBuffer(
              keys.encryptedMasterKey
            ),
            iv: KeyManagement.base64ToArrayBuffer(keys.iv),
            salt: KeyManagement.base64ToArrayBuffer(keys.salt),
          },
          password
        )
      } catch (error) {
        console.error('Error decrypting keys:', error)
      }
    }
    fileReader.readAsText(event.target.files[0])
  }

  const handleSubmit = async (values, { setErrors }) => {
    try {
      dispatch(setIsRegistering(true))

      const response = await loginUser(values).unwrap()
      console.log('response from login:', response)

      // router.replace('/noon')
    } catch (error) {
      // @ts-ignore
      if (error.data?.errors) {
        // @ts-ignore
        setErrors(toErrorMap(error.data.errors))
      } else {
        console.error('Error logging user in:', error)
      }
    }
  }

  return (
    <>
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'xlg'}
        py={12}
        px={6}
        className="z-10"
      >
        <Box boxShadow={'lg'} p={8} className="border border-red-500 z-10">
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
                        <span
                          style={{ color: 'text-black', marginLeft: '5px' }}
                        >
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
                        rightIcon={
                          isSuccess ? <CheckIcon color="white" /> : null
                        }
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-red-500 p-5 text-white">
            Upload Private Keys
          </ModalHeader>

          <ModalBody className="bg-black p-5 text-white ">
            <Text className="my-5">
              Logging in from a new device. Please upload the file that contains
              your private keys. This is the file that you downloaded when you
              first registered.
            </Text>
          </ModalBody>

          <ModalFooter className="bg-black p-5 text-white">
            <AppButton
              mr={3}
              onClick={handleFileUpload}
              // isLoading={isDownloadingPrivateKeyLoading}
            >
              Download Private Key
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login
