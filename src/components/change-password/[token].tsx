import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useState } from 'react'
import { InputField } from '../InputField'
// import { Wrapper } from '../Wrapper'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'
import Nextlink from 'next/link'

const ChangePassword: NextPage = () => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')

  return (
    // <Wrapper variant="small">
    <Formik
      initialValues={{ newPassword: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          newPassword: values.newPassword,
          token:
            typeof router.query.token === 'string' ? router.query.token : '',
        })
        if (response.data?.changePassword.errors) {
          const errorMap = toErrorMap(response.data.changePassword.errors)
          if ('token' in errorMap) {
            setTokenError(errorMap.token)
          }
          setErrors(errorMap)
        } else if (response.data?.changePassword.user) {
          // worked
          router.push('/')
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="newPassword"
            placeholder="new password"
            label="New password"
            type="password"
          />
          {tokenError ? (
            <Flex>
              <Box mr={2} color="red">
                {tokenError}
              </Box>
              <Nextlink href="/forgot-password">
                <Link>go forget it again</Link>
              </Nextlink>
            </Flex>
          ) : null}

          <Button
            isLoading={isSubmitting}
            mt={4}
            type="submit"
            colorScheme="teal"
          >
            change password
          </Button>
        </Form>
      )}
    </Formik>
    // </Wrapper>
  )
}

// ChangePassword.getServerProps = ({query}) => {
//     return {
//         token: query.token as string
//     }
// }

// ChangePassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   }
// }

export default withUrqlClient(createUrqlClient)(ChangePassword)
