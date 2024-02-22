// @ts-nocheck
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
  ModalCloseButton,
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
import { useRouter } from 'next/router'

import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from '../InputField'
import {
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
  const router = useRouter()

  const handlePostRegistration = async (privateKey, passphrase) => {
    const encryptedPrivateKeyData =
      await KeyManagement.exportEncryptedPrivateKey(privateKey, passphrase)
    setEncryptedPrivateKeyInfo(encryptedPrivateKeyData)
    onOpen() // Open the modal
  }

  // Triggered when the "Download Private Key" button is clicked
  const handleDownloadPrivateKey = () => {
    if (!encryptedPrivateKeyInfo) return
    KeyManagement.downloadEncryptedPrivateKey(
      encryptedPrivateKeyInfo,
      'my_private_key.txt'
    )
    onClose() // Optionally close the modal after download
  }

  const handleSubmit = async (values, { setErrors }) => {
    try {
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

      const registrationValues = { ...values, publicKey }

      const response = await registerUser(registrationValues).unwrap()

      // if (response.status === 200) {
      //   onOpen()
      //   // router.replace('/noon')
      // }
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
                      <span style={{ color: 'text-black', marginLeft: '5px' }}>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Private Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Please download and securely store your private key. It's crucial
              for accessing your encrypted data.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleDownloadPrivateKey}
            >
              Download Private Key
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default Register
