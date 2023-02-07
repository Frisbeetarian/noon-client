import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withApollo } from '../utils/withApollo'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import ForgotPassword from '../components/authentication/ForgotPassword'
import { useSelector } from 'react-redux'
import {
  getShowForgotPasswordComponent,
  getShowLoginComponent,
  getShowRegisterComponent,
} from '../store/ui'

const Onboarding = () => {
  const router = useRouter()
  const showRegisterComponent = useSelector(getShowRegisterComponent)
  const showLoginComponent = useSelector(getShowLoginComponent)
  const showForgotPasswordComponent = useSelector(
    getShowForgotPasswordComponent
  )

  const { data } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.me?.username) {
      router.replace('/noon')
    }
  }, [data])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      <p className="fixed top-12 text-5xl">NOON</p>

      <Flex minH={'100%'} align={'center'} justify={'center'}>
        {showRegisterComponent && <Register />}
        {showLoginComponent && <Login />}

        {showForgotPasswordComponent && <ForgotPassword />}
      </Flex>
    </Flex>
  )
}

export default withApollo({ ssr: false })(Onboarding)
