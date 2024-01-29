import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const colors = {
  black: '#000000',
  red: {
    50: '#F8E6E5',
    100: '#F1CDCB',
    200: '#E9B3B0',
    300: '#E29A96',
    400: '#DA807C',
    500: '#921A1C',
    600: '#7A1618',
    700: '#631214',
    800: '#4B0E10',
    900: '#5E1F1E',
  },
  gradients: {
    redToBlack: 'linear-gradient(45deg, #921A1C, #000000)',
    blackToRed: 'linear-gradient(45deg, #000000, #921A1C)',
  },
}

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'red',
          color: 'black',
          _hover: {
            bg: 'black',
            color: 'red',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: 'none',
          borderBottom: '1px solid',
          borderRadius: '0',
        },
      },
      variants: {
        outline: (props) => ({
          field: {
            borderColor: props.isInvalid ? 'initial' : 'inherit',
          },
        }),
      },
    },
    TextArea: {
      baseStyle: {
        field: {
          border: 'none',
          borderBottom: '1px solid',
          borderRadius: '0',
        },
      },
    },
  },

  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'red',
      },
      '*::placeholder': {
        color: 'green',
      },
    },
  },
})

export default theme
