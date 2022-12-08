import React from 'react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import './index.css'
import { wrapper } from '../store/store'
import '../components/SocketIo/Messages.css'
// import './src/components/AudioRecorder/recorder-controls/styles.css'
import '../components/AudioRecorder/recorder-controls/styles.css'

function MyApp({ Component, pageProps }) {
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

// export default MyApp
export default wrapper.withRedux(MyApp)
