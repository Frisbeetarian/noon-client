import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'
import { ChevronDownIcon, ChatIcon } from '@chakra-ui/icons'

import { getLoggedInUser, setLoggedInUser } from '../store/users'
import { useDispatch, useSelector } from 'react-redux'
import SocketConnector from './SocketIo/SocketConnector'
import ChatSidebar from './ChatSidebar'
import { getChatComponentState } from '../store/ui'
import { getConversationsThatHaveUnreadMessagesForProfile } from '../store/chat'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  const chatComponentState = useSelector(getChatComponentState)
  const loggedInUser = useSelector(getLoggedInUser)
  const conversationsThatHaveUnreadMessages = useSelector(
    getConversationsThatHaveUnreadMessagesForProfile
  )

  useEffect(() => {
    dispatch(setLoggedInUser({ user: data }))
  }, [data])

  // useEffect(() => {}, [loggedInUser])

  let body = null

  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    // body = (
    //   <Flex>
    //     <NextLink href="/login">
    //       <Link mr={2}>
    //         <span className="text-info">Login</span>
    //       </Link>
    //     </NextLink>
    //
    //     <NextLink href="/register">
    //       <Link>
    //         <span className="text-info">Register</span>
    //       </Link>
    //     </NextLink>
    //   </Flex>
    // )
  } else {
    body = (
      <Flex align="center" className="">
        <Menu>
          <MenuButton
            className="mr-5"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Flex className="justify-center items-center">
              <Avatar
                key={loggedInUser?.user?.profile?.uuid}
                name={loggedInUser?.user?.profile?.username}
                size="sm"
                className="mr-2"
              >
                {chatComponentState !== 'open' &&
                conversationsThatHaveUnreadMessages.length !== 0 ? (
                  <AvatarBadge boxSize="1.25em" bg="red.500"></AvatarBadge>
                ) : null}
              </Avatar>

              <p>{data.me.profile.username}</p>
              <Box className="">
                <SocketConnector />
              </Box>
            </Flex>
          </MenuButton>

          <MenuList>
            <MenuItem className="text-info w-full py-2">
              <NextLink href="/profiles">
                <Link>
                  <p className="text-info">Profile</p>
                </Link>
              </NextLink>
            </MenuItem>

            <MenuItem className="text-info w-full py-2">
              <Flex className="w-full justify-between items-center">
                {/*<p className="text-info">Chat</p>*/}
                {/*<ChatIcon className="mr-3 mt-1" />*/}

                <ChatSidebar></ChatSidebar>
              </Flex>
            </MenuItem>

            <MenuItem className="text-info w-full py-2">
              <p
                onClick={async () => {
                  await logout()
                  router.reload()
                  // router.reload()
                }}
                isLoading={fetching}
                variant="link"
              >
                Logout
              </p>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    )
  }

  return (
    <Flex
      data-theme="mytheme"
      className="bg-neutral"
      zIndex={1}
      position="sticky"
      top={0}
      p={4}
      style={{ height: '10vh' }}
    >
      <Flex className="bg-neutral" flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading className="text-info">Noon</Heading>
          </Link>
        </NextLink>

        {/*<Flex*/}
        {/*  className="bg-red- w-2/4 justify-start px-6 justify-evenly"*/}
        {/*  align="center"*/}
        {/*>*/}
        {/*  <NextLink href="/communities">*/}
        {/*    <Link>*/}
        {/*      <span className="text-info">Communities</span>*/}
        {/*    </Link>*/}
        {/*  </NextLink>*/}

        {/*  <NextLink href="/events">*/}
        {/*    <Link>*/}
        {/*      <span className="text-info">Events</span>*/}
        {/*    </Link>*/}
        {/*  </NextLink>*/}

        {/*  <NextLink href="/profiles">*/}
        {/*    <Link>*/}
        {/*      <span className="text-info">Profiles</span>*/}
        {/*    </Link>*/}
        {/*  </NextLink>*/}

        {/*  <NextLink href="/search">*/}
        {/*    <Link>*/}
        {/*      <span className="text-info">Search</span>*/}
        {/*    </Link>*/}
        {/*  </NextLink>*/}
        {/*</Flex>*/}

        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  )
}
