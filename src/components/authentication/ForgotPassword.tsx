import React from 'react'
import {
  Text,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'

function ForgotPassword() {
  return (
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}
      className="bg-black"
    >
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
        Forgot your password?
      </Heading>

      <Text
        fontSize={{ base: 'sm', sm: 'md' }}
        // color={useColorModeValue('gray.800', 'gray.400')}
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
          // setLogin(true)
          // setRegister(false)
          // setForgotPassword(false)
        }}
      >
        Back
      </Text>
    </Stack>
  )
}

export default ForgotPassword
