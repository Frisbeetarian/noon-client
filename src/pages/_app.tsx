import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import './index.css'
import { wrapper } from '../store/store'

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

// export default MyApp
export default wrapper.withRedux(MyApp)
