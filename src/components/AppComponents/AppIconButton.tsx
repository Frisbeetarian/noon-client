// @ts-nocheck
import React, { forwardRef } from 'react'
import { ButtonProps, IconButton } from '@chakra-ui/react'

interface AppIconButtonProps extends ButtonProps {
  bg?: string
  color?: string
  border?: string
  borderRadius?: string
  fontFamily?: string
  disabled?: boolean
}

const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
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
      <IconButton
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
      </IconButton>
    )
  }
)

AppIconButton.displayName = 'AppIconButton'

export default AppIconButton
