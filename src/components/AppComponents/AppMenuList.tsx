// @ts-nocheck
import React, { forwardRef } from 'react'
import { Button, ButtonProps, MenuList } from '@chakra-ui/react'

interface AppMenuListProps extends ButtonProps {
  bg?: string
  color?: string
  border?: string
  borderRadius?: string
  fontFamily?: string
  disabled?: boolean
}

const AppMenuList = forwardRef<HTMLButtonElement, AppMenuListProps>(
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
      <MenuList
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
      </MenuList>
    )
  }
)

AppMenuList.displayName = 'AppMenuList'

export default AppMenuList
