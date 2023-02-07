import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withApollo } from '../utils/withApollo'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import ForgotPassword from '../components/authentication/ForgotPassword'

const Onboarding = () => {
  const router = useRouter()

  // const loggedInUser = useSelector(getLoggedInUser)
  const [showLogin] = useState(false)
  const [showRegister] = useState(true)
  const [showForgotPassword] = useState(false)

  const { data } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.me?.username) {
      router.replace('/noon')
    }
    // else {
    //   // router.replace('/noon')
    // }
  }, [data])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      <p className="fixed top-12 text-5xl">NOON</p>

      <Flex minH={'100%'} align={'center'} justify={'center'}>
        {showRegister && <Register />}
        {showLogin && <Login />}

        {showForgotPassword && <ForgotPassword />}
      </Flex>
    </Flex>
  )
}

export default withApollo({ ssr: false })(Onboarding)
