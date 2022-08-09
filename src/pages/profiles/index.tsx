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
import CreateCommunity from '../communities/create-community'
import NextLink from 'next/link'
import io from 'socket.io-client'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
// const ENDPOINT = 'http://localhost:4020'
// const socket = io(ENDPOINT, { autoConnect: false })

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  console.log('profiles: ', data?.getProfiles)

  // const [isConnected, setIsConnected] = useState(socket.connected)
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  const [privateMessage, setprivateMessage] = useState(true)

  // useEffect(() => {
  //   socket.connect()
  //
  //   socket.on('connect', () => {
  //     console.log('connected')
  //     setIsConnected(true)
  //   })
  //   socket.on('disconnect', () => {
  //     setIsConnected(false)
  //   })
  //   // socket.on('message', (data) => {
  //   //   setLastMessage(data)
  //   // })
  //   return () => {
  //     socket.off('connect')
  //     socket.off('disconnect')
  //     socket.off('message')
  //   }
  // }, [])

  // useEffect(() => {
  //   // socket.connect()
  //   console.log('logged in user:', loggedInUser.user.profile)
  //   const sessionID = localStorage.getItem('sessionID')
  //
  //   if (sessionID && loggedInUser.user.profile) {
  //     socket.auth = {
  //       sessionID,
  //       username: loggedInUser?.user?.profile?.username,
  //     }
  //
  //     socket.connect()
  //   }
  //
  //   socket.on('session', ({ sessionID, userID }) => {
  //     // attach the session ID to the next reconnection attempts
  //     socket.auth = { sessionID }
  //
  //     // store it in the localStorage
  //     localStorage.setItem('sessionID', sessionID)
  //
  //     // save the ID of the user
  //     socket.userID = userID
  //   })
  //
  //   socket.on('connect_error', (err) => {
  //     if (err.message === 'invalid username') {
  //       // this.usernameAlreadySelected = false
  //       setIsConnected(false)
  //     }
  //   })
  //
  //   socket.on('connect', () => {
  //     setIsConnected(true)
  //   })
  //
  //   socket.onAny((event, ...args) => {
  //     console.log(event, args)
  //   })
  //   return () => socket.off('connect_error')
  // }, [loggedInUser])

  useEffect(() => {
    // dispatch(loadBugs())
    if (socket) {
      socket.on('private message', ({ content, from, to }) => {
        console.log('received private message')
        setprivateMessage(true)
        // for (let i = 0; i < this.users.length; i++) {
        //   const user = this.users[i]
        //   const fromSelf = socket.userID === from
        //   if (user.userID === (fromSelf ? to : from)) {
        //     user.messages.push({
        //       content,
        //       fromSelf,
        //     })
        //     if (user !== this.selectedUser) {
        //       user.hasNewMessages = true
        //     }
        //     break
        //   }
        // }
      })

      return () => {
        // if (socket)
        socket.off('private message')
      }
    }
  }, [socket])

  // console.log('BUGS: ', bugs)

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

  // function sendFriendRequest()

  return (
    <Layout>
      <header>Profiles Page</header>
      <Alert status="success" hidden={!privateMessage}>
        <AlertIcon />
        <AlertTitle>Error while trying to connect to socket.</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

      {fetching && !data?.getProfiles ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {data?.getProfiles.map((profile, i) =>
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
                        profileUuid: profile.id,
                      })

                      socket.emit('private message', {
                        content:
                          loggedInUser.user?.profile?.username +
                          ' wants to be your friend.',
                        from: loggedInUser.user?.profile?.id,
                        to: profile.id,
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

// export default Profiles
export default withUrqlClient(createUrqlClient, { ssr: false })(Profiles)
