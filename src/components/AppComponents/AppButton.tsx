import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// @ts-ignore
interface AppButtonProps extends ButtonProps {
  color?: string
  bg?: string
  border?: string
  borderRadius?: string
  fontFamily?: string
  disabled?: boolean | undefined
  rightIcon?: typeof CheckIcon
  type?: 'button' | 'submit' | 'reset' | undefined
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
      rightIcon = null,
      type = 'button',
      size = 'md',
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
        isDisabled={disabled}
        // @ts-ignore
        rightIcon={rightIcon}
        type={type}
        size={size}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

AppButton.displayName = 'AppButton'

export default AppButton
