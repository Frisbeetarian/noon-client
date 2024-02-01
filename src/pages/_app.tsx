import React, { useEffect } from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import './index.css'
import { wrapper } from '../store/store'

import '../components/SocketIo/Messages.css'
import '../components/AudioRecorder/recorder-controls/styles.css'
import { setIsMobile } from '../store/ui'
import { useDispatch } from 'react-redux'

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    if (window.innerWidth <= 1000) {
      dispatch(setIsMobile(true))
    } else {
      dispatch(setIsMobile(false))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      if (window.innerWidth <= 1000) {
        dispatch(setIsMobile(true))
      } else {
        dispatch(setIsMobile(false))
      }
    })

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth <= 1000) {
          dispatch(setIsMobile(true))
        } else {
          dispatch(setIsMobile(false))
        }
      })
    }
  })

  return (
    <React.StrictMode>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </React.StrictMode>
  )
}

export default wrapper.withRedux(MyApp)
