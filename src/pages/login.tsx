import React from 'react'
import { Form, Formik } from 'formik'

import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/dist/client/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/Layout'
import NextLink from 'next/link'

const Login: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            // worked
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
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
              label="Username or email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                type="password"
                placeholder="password"
                label="Password"
              />
            </Box>

            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>

            <Button
              isLoading={isSubmitting}
              mt={4}
              type="submit"
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
