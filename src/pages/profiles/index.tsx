import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Tooltip,
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
import { addProfiles, getProfiles } from '../../store/profiles'

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const profiles = useSelector(getProfiles)
  const socket = useSelector(getSocket)

  useEffect(() => {
    dispatch(showFriendshipRequestToast(socket))
  }, [])

  useEffect(() => {
    console.log('profiles: ', data?.getProfiles)

    if (data?.getProfiles) {
      dispatch(addProfiles({ profiles: data?.getProfiles, loggedInUser }))
    }
  }, [data?.getProfiles])

  if (!fetching && !profiles) {
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

  if (!profiles) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <header>Profiles Page</header>

      {fetching && !profiles ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {[...Object.values(profiles)].map((profile, i) =>
            !profile ? null : (
              <Flex
                className="w-full text-white border-error"
                direction="column"
                key={i}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Flex className="justify-between w-full">
                  <Box className="w-full" flex={1}>
                    <NextLink
                      href="/profiles/[uuid]"
                      as={`/profiles/${profile.uuid}`}
                    >
                      <Link className="prose">
                        <Heading fontSize="xl">{profile.username}</Heading>
                      </Link>
                    </NextLink>
                  </Box>

                  {profile.isAFriend ? null : (
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
                  )}
                </Flex>

                <AvatarGroup max={10}>
                  {profile.friends.map((friend, i) =>
                    !friend ? null : (
                      <Tooltip
                        label={friend.username}
                        aria-label={friend.username}
                        placement="bottom"
                      >
                        <Avatar key={i} name={friend.username} size="sm">
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                      </Tooltip>
                    )
                  )}
                </AvatarGroup>
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Profiles)
