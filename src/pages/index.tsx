import React from 'react'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import ForgotPassword from '../components/authentication/ForgotPassword'
import { useSelector } from 'react-redux'
import {
  getParticlesInitialized,
  getShowForgotPasswordComponent,
  getShowLoginComponent,
  getShowRegisterComponent,
} from '../store/ui'
import AppParticles from '../components/AppComponents/AppParticles'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
const Index = () => {
  const showRegisterComponent = useSelector(getShowRegisterComponent)
  const showLoginComponent = useSelector(getShowLoginComponent)
  const showForgotPasswordComponent = useSelector(
    getShowForgotPasswordComponent
  )
  const particlesInitialized = useSelector(getParticlesInitialized)

  const generateRandomSequence = (): (string | number)[] => [
    'N',
    randomWait(),
    'NO',
    randomWait(),
    'NOO',
    randomWait(),
    'NOON',
    2000,
  ]

  const randomWait = (): number =>
    Math.floor(Math.random() * (1250 - 300 + 1)) + 300

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>

      <Flex className="flex-col justify-center items-center bg-black text-red-500 h-screen">
        <p className="fixed top-12 text-4xl text-red-500 leading-tight z-10">
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
        {particlesInitialized && (
          <Flex
            minH={'100%'}
            align={'center'}
            justify={'center'}
            className="z-10"
          >
            {showRegisterComponent && <Register />}
            {showLoginComponent && <Login />}

            {showForgotPasswordComponent && <ForgotPassword />}
          </Flex>
        )}
      </Flex>

      <AppParticles />
    </>
  )
}
export default Index
