import React, { useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  // Drawer,
  // DrawerContent,
  Text,
  // useDisclosure,
  Input,
  BoxProps,
  FlexProps,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIsMobile,
  getIsSearchActive,
  getSearchComponentState,
  setChatContainerHeight,
  setSearchComponent,
} from '../store/ui'
import SearchController from './SearchController'
import { ArrowUpIcon, SearchIcon } from '@chakra-ui/icons'
import { getSearchQuery, setSearchQuery } from '../store/search'
// import { getIsSearchActive } from '../store/ui'
// import { useSelector } from 'react-redux'

interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
]

export default function SearchSidebar() {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = React.useRef()
  const dispatch = useDispatch()
  const isMobile = useSelector(getIsMobile)
  const searchComponentState = useSelector(getSearchComponentState)
  const [searchInput, setSearchInput] = useState(null)
  const searchActive = useSelector(getIsSearchActive)
  const searchQuery = useSelector(getSearchQuery)

  return (
    <div className="search-sidebar bg-gray-800">
      {!isMobile && (
        <>
          <Flex
            className="flex-col items-start justify-start"
            style={{ flex: '0.7' }}
          >
            <p className="text-xl mt-4 mb-10">Search Results</p>

            <Flex className="w-full" style={{ flex: '1' }}>
              <SearchController />
            </Flex>
          </Flex>
          <Flex className="items-center relative" style={{ flex: '0.3' }}>
            <InputGroup>
              <InputRightElement
                children={<SearchIcon color="green.500" />}
                pointerEvents="none"
              />

              <Input
                type="text"
                className="m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800 pl-2"
                placeholder="Search for profiles..."
                size="md"
                // rightIcon={<SearchIcon color="gray.300" />}
                // onClick={() => {
                //   dispatch(setChatContainerHeight('52.5vh'))
                //   dispatch(
                //     setSearchComponent({
                //       searchActive: true,
                //       containerDisplay: 'relative',
                //       containerHeight: '40vh',
                //       inputPadding: '10px',
                //     })
                //   )
                // }}
                style={{
                  padding: searchComponentState.inputPadding,
                  transition: 'all .5s',
                  position: searchComponentState.containerDisplay,
                  right: 0,
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if ((e.target as HTMLInputElement).value !== searchQuery) {
                      dispatch(setSearchQuery(null))
                      setSearchInput(null)
                      dispatch(
                        setSearchQuery((e.target as HTMLInputElement).value)
                      )
                      setSearchInput(
                        (e.target as any).value as React.SetStateAction<null>
                      )
                    }
                  }
                }}
              />
            </InputGroup>
          </Flex>

          {searchComponentState.searchActive ? (
            <ArrowUpIcon
              className="bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer"
              onClick={() => {
                dispatch(setSearchQuery(null))
                setSearchInput(null)

                dispatch(
                  setSearchComponent({
                    searchActive: false,
                    containerDisplay: 'relative',
                    containerHeight: '5vh',
                    inputPadding: '5px',
                  })
                )

                dispatch(setChatContainerHeight('87.5vh'))
              }}
            />
          ) : null}
        </>
      )}
    </div>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}
