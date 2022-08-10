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

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  console.log('profiles: ', data?.getProfiles)
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  // const [privateMessage, setprivateMessage] = useState(true)
  // const [fromFriendshipRequest, setFromFriendshipRequest] =
  //   useState('undefined')
  // const toast = useToast()

  useEffect(() => {
    // if (socket) {
    //   socket.on('private message', ({ content, from, fromUsername, to }) => {
    //     console.log('received private message content:', content)
    //     console.log('received private message from:', from)
    //
    //     console.log('received private message from:', fromUsername)
    //     console.log('received private message content:', to)
    //     setFromFriendshipRequest(fromUsername)
    //     setprivateMessage(true)
    //
    //     toast({
    //       id: from,
    //       title: `${fromUsername} sent you a friend request.`,
    //       position: 'bottom-right',
    //       isClosable: true,
    //       status: 'success',
    //       duration: null,
    //       render: () => (
    //         <Flex direction="column" color="white" p={3} bg="green.500">
    //           <Flex>
    //             <p>{fromUsername} sent you a friend request.</p>
    //             <CloseButton
    //               className="sticky top ml-4"
    //               size="sm"
    //               onClick={() => {
    //                 toast.close(from)
    //               }}
    //             />
    //           </Flex>
    //
    //           <Flex className="justify-end mt-3">
    //             <Button className="mr-3">Accept</Button>
    //             <Button>Reject</Button>
    //           </Flex>
    //         </Flex>
    //       ),
    //     })
    //   })
    //
    //   return () => {
    //     socket.off('private message')
    //   }
    // }
  }, [])

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
      {/*<Alert status="success" variant="left-accent" hidden={!privateMessage}>*/}
      {/*  <AlertIcon />*/}
      {/*  <AlertTitle>*/}
      {/*    {fromFriendshipRequest} has sent you a friend request.*/}
      {/*  </AlertTitle>*/}
      {/*  <AlertDescription></AlertDescription>*/}
      {/*</Alert>*/}

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
                        fromUsername: loggedInUser.user?.profile?.username,
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
