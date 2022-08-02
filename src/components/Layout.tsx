import React from 'react'
import { Navbar } from './Navbar'
import { Wrapper, WrapperVariant } from './Wrapper'
import SimpleSidebar from './Sidebar'
import { Box, Container } from '@chakra-ui/react'

interface LayoutProps {
  variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      <div className="flex">
        {/*<Box className="">*/}
        <Wrapper variant={variant}>{children}</Wrapper>
        {/*</Box>*/}
      </div>
    </div>
  )
}
