import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider } from 'urql'
import theme from '../theme'
// import styles from './index.css'
import './index.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
