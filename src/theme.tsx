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
    100: '#EBC8C6',
    200: '#DDA9A7',
    300: '#CF8A88',
    400: '#C16B69',
    500: '#B34C4A',
    600: '#9F4443',
    700: '#8B3B3A',
    800: '#772E2E',
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
