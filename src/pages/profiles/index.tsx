import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  useToast,
  CloseButton,
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'

import { useDispatch, useSelector } from 'react-redux'

import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'

import {
  useGetProfilesQuery,
  useSendFriendRequestMutation,
} from '../../generated/graphql'
import NextLink from 'next/link'

import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'

import { showFriendshipRequestToast } from '../../store/ui'
import { addProfiles } from '../../store/profiles'

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)

  useEffect(() => {
    dispatch(showFriendshipRequestToast(socket))
  }, [])

  useEffect(() => {
    console.log('profiles: ', data?.getProfiles)

    if (data?.getProfiles) {
      dispatch(addProfiles(data?.getProfiles))
    }
  }, [data?.getProfiles])

  if (!fetching && !data) {
    return (
      <div>
        <div>query failed for some reason</div>
        <div>{error}</div>
      </div>
    )
  }

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data?.getProfiles) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <header>Profiles Page</header>

      {fetching && !data?.getProfiles ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {[...Object.values(data?.getProfiles)].map((profile, i) =>
            !profile ? null : (
              <Flex
                className="w-full text-white border-error"
                key={i}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Box className="w-full" flex={1}>
                  <NextLink
                    href="/profiles/[id]"
                    as={`/profiles/${profile.id}`}
                  >
                    <Link className="prose">
                      <Heading fontSize="xl">{profile.username}</Heading>
                    </Link>
                  </NextLink>
                </Box>

                <Box>
                  <Button
                    onClick={async () => {
                      await sendFriendRequest({
                        profileUuid: profile.uuid,
                      })

                      socket.emit('private message', {
                        content:
                          loggedInUser.user?.profile?.username +
                          ' wants to be your friend.',
                        from: loggedInUser.user?.profile?.uuid,
                        fromUsername: loggedInUser.user?.profile?.username,
                        to: profile.uuid,
                        toUsername: profile.username,
                      })
                    }}
                  >
                    Send friend request
                  </Button>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Profiles)
