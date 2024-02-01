import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface AppButtonProps extends ButtonProps {
  color?: string
  bg?: string
  border?: string
  borderRadius?: string
  fontFamily?: string
  disabled?: boolean | undefined
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
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

AppButton.displayName = 'AppButton'

export default AppButton
