import {
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
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { getLoggedInUser, setLoggedInUser } from '../store/users'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })

  const dispatch = useDispatch()
  dispatch(setLoggedInUser({ user: data }))

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()

  let body = null

  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>
            <span className="text-info">Login</span>
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link>
            <span className="text-info">Register</span>
          </Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex align="center">
        {/*<NextLink href="/events">*/}
        {/*  <Link className="mr-5">*/}
        {/*    <p className="text-info">Events</p>*/}
        {/*  </Link>*/}
        {/*</NextLink>*/}

        {/*<NextLink href="/profiles">*/}
        {/*  <Link className="mr-5">*/}
        {/*    <p className="text-info">Profiles</p>*/}
        {/*  </Link>*/}
        {/*</NextLink>*/}

        {/*<NextLink href="/create-post">*/}
        {/*  <Button as={Link} mr={4}>*/}
        {/*    create post*/}
        {/*  </Button>*/}
        {/*</NextLink>*/}

        <Menu>
          <MenuButton
            className="mr-5"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Actions
          </MenuButton>

          <MenuList>
            <MenuItem>
              <NextLink href="/create-post">
                <Link>
                  {/*<Button as={Link} mr={4}>*/}
                  <p className="text-info">Create post</p>
                </Link>
                {/*</Button>*/}
              </NextLink>
            </MenuItem>

            <MenuItem>
              <NextLink href="/profiles">
                <Link>
                  <p className="text-info">Profiles</p>
                </Link>
              </NextLink>
            </MenuItem>

            <MenuItem>
              <NextLink href="/events">
                <Link className="mr-5">
                  <p className="text-info">Events</p>
                </Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>

        <Box mr={4}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout()
            router.reload()
            // router.reload()
          }}
          isLoading={fetching}
          variant="link"
        >
          logout
        </Button>
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
    >
      <Flex className="bg-neutral" flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading className="text-info">Noon</Heading>
          </Link>
        </NextLink>

        <Flex
          className="bg-red- w-2/4 justify-start px-6 justify-evenly"
          align="center"
        >
          <NextLink href="/communities">
            <Link>
              <span className="text-info">Communities</span>
            </Link>
          </NextLink>

          <NextLink href="/events">
            <Link>
              <span className="text-info">Events</span>
            </Link>
          </NextLink>

          <NextLink href="/profiles">
            <Link>
              <span className="text-info">Profiles</span>
            </Link>
          </NextLink>

          <NextLink href="/search">
            <Link>
              <span className="text-info">Search</span>
            </Link>
          </NextLink>
        </Flex>

        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  )
}
