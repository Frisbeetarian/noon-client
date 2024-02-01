import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface AppButtonProps extends ButtonProps {
  color?: string
  bg?: string
  border?: string
  borderRadius?: string
  fontFamily?: string
  disabled?: boolean | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      color = 'white',
      bg = '#921A1C',
      border = '0',
      borderRadius = '0',
      fontFamily = 'Menlo',
      disabled = false,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        color={color}
        bg={bg}
        border={border}
        borderRadius={borderRadius}
        fontFamily={fontFamily}
        disabled={disabled}
        type={type}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

AppButton.displayName = 'AppButton'

export default AppButton
