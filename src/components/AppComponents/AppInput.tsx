import React, { forwardRef } from 'react'
import { Input, InputProps } from '@chakra-ui/react'

interface AppInputProps extends InputProps {
  name?: string
  label?: string
  type?: string
  size?: string
  placeholder?: string
  borderBottom?: string
  borderRadius?: string
  outline?: number
  bg?: string
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      name = 'input',
      label = 'Input',
      type = 'text',
      size = 'md',
      placeholder = 'Type message...',
      border = 'none',
      borderBottom = '1px solid #921A1C',
      borderRadius = 'none',
      outline = 0,
      bg = 'black',
      ...rest
    },

    ref
  ) => {
    return (
      <Input
        name={name}
        label={label}
        ref={ref}
        type={type}
        size={size}
        placeholder={placeholder}
        border={border}
        borderBottom={borderBottom}
        borderRadius={borderRadius}
        outline={outline}
        bg={bg}
        {...rest}
        sx={{
          '::placeholder': {
            color: 'white',
          },
        }}
      />
    )
  }
)

AppInput.displayName = 'AppInput'

export default AppInput
