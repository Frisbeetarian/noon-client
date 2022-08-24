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
  useAcceptFriendRequestMutation,
  useGetProfilesQuery,
  useSendFriendRequestMutation,
} from '../../generated/graphql'

import NextLink from 'next/link'

import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { setActiveConversee } from '../../store/chat'
import { showFriendshipRequestToast } from '../../store/ui'
import {
  addProfiles,
  setFriendshipRequestSentOnProfile,
  getProfiles,
} from '../../store/profiles'
import { ChatIcon } from '@chakra-ui/icons'

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  const [{ fetching: friendRequestFetching }, sendFriendRequest] =
    useSendFriendRequestMutation()
  const loggedInUser = useSelector(getLoggedInUser)
  const profiles = useSelector(getProfiles)
  const socket = useSelector(getSocket)

  const [, acceptFriendRequest] = useAcceptFriendRequestMutation()

  useEffect(() => {
    dispatch(showFriendshipRequestToast(socket))
  }, [])
  let sessionID

  useEffect(() => {
    sessionID = localStorage.getItem('sessionID')

    if (data?.getProfiles && loggedInUser.user.profile) {
      dispatch(addProfiles({ profiles: data?.getProfiles, loggedInUser }))
    }
  }, [data?.getProfiles, loggedInUser])

  function setActiveConverseeFunction(profile) {
    dispatch(setActiveConversee(profile))
  }

  useEffect(() => {
    console.log('logged in user:', loggedInUser)
  }, [loggedInUser])

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

                  {profile.hasSentFriendshipToProfile ? (
                    <Button disabled={true} className="text-green-500">
                      Friendship request sent
                    </Button>
                  ) : profile.hasFriendshipRequestFromLoggedInProfile ? (
                    <Flex className="justify-end mt-3">
                      <Button
                        className="mr-3 bg-green-500"
                        variant="ghost"
                        onClick={async () => {
                          const acceptFriendshipResponse =
                            await acceptFriendRequest({
                              profileUuid: profile.uuid,
                            })

                          if (acceptFriendshipResponse) {
                            socket.emit('friendship-request-accepted', {
                              content:
                                loggedInUser.user?.profile?.username +
                                ' accepted your friend request.',
                              from: loggedInUser.user?.profile?.uuid,
                              fromUsername:
                                loggedInUser.user?.profile?.username,
                              to: profile.uuid,
                              toUsername: profile.username,
                            })
                          }
                        }}
                      >
                        Accept
                      </Button>
                      <Button className="bg-red-500" variant="tomato">
                        Reject
                      </Button>
                    </Flex>
                  ) : (
                    <Box>
                      {profile.isAFriend ? (
                        <Flex className="bg-red-500 w-full z-40 h-full cursor-pointer">
                          <ChatIcon
                            className="mr-3 mt-1"
                            onClick={() => {
                              setActiveConverseeFunction(profile)
                            }}
                          />
                        </Flex>
                      ) : (
                        <Button
                          onClick={async () => {
                            dispatch(
                              setFriendshipRequestSentOnProfile({
                                profileUuid: profile.uuid,
                              })
                            )

                            await sendFriendRequest({
                              profileUuid: profile.uuid,
                            })

                            socket.emit('private message', {
                              content:
                                loggedInUser.user?.profile?.username +
                                ' wants to be your friend.',
                              from: loggedInUser.user?.profile?.uuid,
                              fromUsername:
                                loggedInUser.user?.profile?.username,
                              to: profile.uuid,
                              toUsername: profile.username,
                            })
                          }}
                        >
                          Send friend request
                        </Button>
                      )}
                    </Box>
                  )}
                </Flex>

                <AvatarGroup className="" max={10}>
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
