import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

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
          // Handle error (e.g., redirect to login if unauthorized)
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
      randomWait(),
      'NOON\nN',
      randomWait(),
      'NOON\nNO',
      randomWait(),
      'NOON\nNOO',
      randomWait(),
      'NOON\nNOON',
      'NOON\nNOON\nN',
      randomWait(),
      'NOON\nNOON\nNO',
      randomWait(),
      'NOON\nNOON\nNOO',
      randomWait(),
      'NOON\nNOON\nNOON',
      randomWait(),
      'NOON\nNOON\nNOON\nNOON',
      randomWait(),
    ]
    return sequence
  }

  const randomWait = () => Math.floor(Math.random() * (1250 - 300 + 1)) + 300

  return (
    <>
      <AppParticles />

      <Flex className="flex-col justify-center items-center bg-black text-red-500 h-screen">
        {/*<p className="fixed top-12 text-5xl text-white noon-logo diagonal">*/}
        {/*  NOON*/}
        {/*</p>*/}
        <p className="fixed top-12 text-4xl text-red-500 noon-logo ">
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
