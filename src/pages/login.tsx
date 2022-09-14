import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Link,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'

const Login: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          console.log('data', response.data)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              // await establishSocketConnection(values.usernameOrEmail)

              // worked
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />

            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>

            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>

            <Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantcolor="teal"
              >
                login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      {/*<Alert status="error" hidden={!socketError}>*/}
      {/*  <AlertIcon />*/}
      {/*  <AlertTitle>Error while trying to connect to socket.</AlertTitle>*/}
      {/*  /!*<AlertDescription>*!/*/}
      {/*  /!*  Your Chakra experience may be degraded.*!/*/}
      {/*  /!*</AlertDescription>*!/*/}
      {/*</Alert>*/}
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
