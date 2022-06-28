import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })
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
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout()
            router.reload()
          }}
          isLoading={logoutFetching}
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
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  )
}
