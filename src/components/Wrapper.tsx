import { Box } from '@chakra-ui/react'
import React from 'react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mx="auto"
      // maxW={variant === 'regular' ? '800px' : '400px'}
      w="100%"
      className="bg-neutral"
      data-theme="mytheme"
    >
      <Box
        className="pt-8 "
        mx="auto"
        maxW={variant === 'regular' ? '800px' : '400px'}
        w="100%"
        style={{ height: '80vh' }}
      >
        {children}
      </Box>
    </Box>
  )
}
