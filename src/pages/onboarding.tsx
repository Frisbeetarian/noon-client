import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withApollo, withAxios } from '../utils/withAxios'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import ForgotPassword from '../components/authentication/ForgotPassword'
import { useSelector } from 'react-redux'
import {
  getShowForgotPasswordComponent,
  getShowLoginComponent,
  getShowRegisterComponent,
} from '../store/ui'

const Onboarding = ({ axios }) => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const showRegisterComponent = useSelector(getShowRegisterComponent)
  const showLoginComponent = useSelector(getShowLoginComponent)
  const showForgotPasswordComponent = useSelector(
    getShowForgotPasswordComponent
  )

  useEffect(() => {
    if (!isServer()) {
      axios
        .get('/api/users/me')
        .then((response) => {
          setUserData(response.data)
        })
        .catch((error) => {
          // console.error('Error fetching user data:', error)
          // Handle error (e.g., redirect to login if unauthorized)
        })
    }
  }, [axios])

  useEffect(() => {
    if (userData?.username) {
      router.replace('/noon')
    }
  }, [userData, router])

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

export default withAxios(Onboarding)
