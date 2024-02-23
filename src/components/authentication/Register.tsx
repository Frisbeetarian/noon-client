import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
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
import { Form, Formik } from 'formik'
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import {
  setIsRegistering,
  setShowForgotPasswordComponent,
  setShowLoginComponent,
  setShowRegisterComponent,
} from '../../store/ui'
import AppButton from '../AppComponents/AppButton'
import { useRegisterUserMutation } from '../../store/api/usersApiSlice'
import KeyManagement from '../../utils/KeyManagement'

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
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPassword, setShowPassword] = useState(false)
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation()
  const [isDownloadingPrivateKeyLoading, setIsDownloadingPrivateKeyLoading] =
    useState(false)

  const handleDownloadPrivateKey = async () => {
    try {
      setIsDownloadingPrivateKeyLoading(true)

      const encryptedPrivateKeyData =
        await KeyManagement.exportEncryptedPrivateKey()

      const encryptedKEKDetails = await KeyManagement.fetchEncryptedKEKDetails()

      if (!encryptedPrivateKeyData || !encryptedKEKDetails) return

      KeyManagement.downloadEncryptedPrivateKey(
        encryptedPrivateKeyData.encryptedPrivateKey,
        encryptedKEKDetails.encryptedMasterKey,
        'YourEncryptedKeys.txt'
      )
      setIsDownloadingPrivateKeyLoading(false)

      dispatch(setIsRegistering(false))
    } catch (e) {
      // @ts-ignore
      console.error(e.message)
    }
  }

  const handleSubmit = async (values, { setErrors }) => {
    try {
      dispatch(setIsRegistering(true))
      const keyPair = await KeyManagement.generateKeyPair()
      const publicKey = await KeyManagement.exportPublicKey(keyPair.publicKey)

      const {
        encryptedMasterKey,
        iv: kekIV,
        salt: kekSalt,
      } = await KeyManagement.generateAndEncryptMasterKey(values.password)
      await KeyManagement.storeEncryptedKEK({
        encryptedMasterKey:
          KeyManagement.arrayBufferToBase64(encryptedMasterKey),
        iv: kekIV,
        salt: kekSalt,
      })

      const { encryptedPrivateKey, iv } = await KeyManagement.encryptPrivateKey(
        keyPair.privateKey
      )
      await KeyManagement.storeEncryptedKey({
        encryptedPrivateKey: encryptedPrivateKey,
        iv,
      })

      const registrationValues = {
        ...values,
        publicKey,
        masterKeyIV: kekIV,
        privateKeyIV: iv,
        salt: kekSalt,
      }

      await registerUser(registrationValues).unwrap()

      onOpen()
    } catch (error) {
      // @ts-ignore
      if (error.data?.errors) {
        // @ts-ignore
        setErrors(toErrorMap(error.data.errors))
      } else {
        console.error('Error registering:', error)
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
        className=" z-10"
      >
        <Box boxShadow={'lg'} p={8} className="border border-red-500 z-10">
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={RegisterSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={8} className="text-white">
                  <FormControl id="username" isRequired>
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
                      name="username"
                      placeholder="Username"
                      label=""
                      color="white"
                      // @ts-ignore
                      size="lg"
                    />
                  </FormControl>

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
                      Email address
                    </FormLabel>

                    <InputField
                      name="email"
                      placeholder="Email address"
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

                    <InputGroup m={0} p={0} className="">
                      <InputField
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        label=""
                        color="white"
                        // @ts-ignore
                        size="lg"
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
                    <AppButton
                      className="w-1/2 ml-auto"
                      type="submit"
                      size="md"
                      isLoading={isSubmitting || isLoading}
                      disabled={isSuccess}
                      // @ts-ignore
                      rightIcon={isSuccess ? <CheckIcon color="white" /> : null}
                    >
                      {isSuccess ? 'Registered' : 'Register'}
                    </AppButton>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>

        <Text
          className="text-lg text-red-500 cursor-pointer z-10 menlo font-bold"
          onClick={() => {
            dispatch(setShowLoginComponent(true))
            dispatch(setShowRegisterComponent(false))
            dispatch(setShowForgotPasswordComponent(false))
          }}
        >
          Login?
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
            Your Private Key
          </ModalHeader>

          <ModalBody className="bg-black p-5 text-white ">
            <Text className="my-5">
              Please download and securely store your private key. It is crucial
              for accessing your encrypted data in case you need to login from a
              different device or the data stored on this device is cleared.
              Recovery is impossible if you lose your private key and no longer
              have access to this device.
            </Text>
          </ModalBody>

          <ModalFooter className="bg-black p-5 text-white">
            <AppButton
              mr={3}
              onClick={handleDownloadPrivateKey}
              isLoading={isDownloadingPrivateKeyLoading}
            >
              Download Private Key
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Register
