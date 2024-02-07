import { Flex } from '@chakra-ui/react'
import React, { Suspense, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withAxios } from '../utils/withAxios'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import ForgotPassword from '../components/authentication/ForgotPassword'
import { useSelector } from 'react-redux'
import {
  getShowForgotPasswordComponent,
  getShowLoginComponent,
  getShowRegisterComponent,
} from '../store/ui'
import AppParticles from '../components/AppComponents/AppParticles'
import { TypeAnimation } from 'react-type-animation'
import Head from 'next/head'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
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
          console.error('Error fetching user data:', error.message)
        })
    }
  }, [axios])

  useEffect(() => {
    // @ts-ignore
    if (userData?.username) {
      router.replace('/noon')
    }
  }, [userData, router])

  const generateRandomSequence = () => {
    const sequence = [
      'N',
      randomWait(),
      'NO',
      randomWait(),
      'NOO',
      randomWait(),
      'NOON',
      2000,
    ]
    return sequence
  }

  const randomWait = () => Math.floor(Math.random() * (1250 - 300 + 1)) + 300

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>

      <AppParticles />

      <Flex className="flex-col justify-center items-center bg-black text-red-500 h-screen">
        <p className="fixed top-12 text-4xl text-red-500 leading-tight">
          <TypeAnimation
            sequence={generateRandomSequence()}
            wrapper="span"
            speed={50}
            style={{
              fontSize: '1.5em',
              display: 'inline-block',
              whiteSpace: 'pre-line',
            }}
            repeat={Infinity}
          />
        </p>
        <Flex minH={'100%'} align={'center'} justify={'center'}>
          {showRegisterComponent && <Register axios={axios} />}
          {showLoginComponent && <Login axios={axios} />}

          {showForgotPasswordComponent && <ForgotPassword />}
        </Flex>
      </Flex>
    </>
  )
}

export default withAxios(Onboarding)
