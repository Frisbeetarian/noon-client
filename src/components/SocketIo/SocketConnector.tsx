import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'

import { getLoggedInUser } from '../../store/users'
import { Box } from '@chakra-ui/react'
import { setSocket } from '../../store/sockets'

const ENDPOINT = 'http://localhost:4020'
const socket = io(ENDPOINT, { autoConnect: false })

export default function SocketConnector() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [socketError, setSocketError] = useState(false)

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID')
    console.log('session id:', sessionID)

    try {
      // if (!socket.connected) {
      // TODO check why adding condition for logged in user generates new session id item in storage
      // if (sessionID && loggedInUser.user.profile) {

      if (sessionID && loggedInUser.user?.profile?.uuid) {
        console.log('sessionID:', sessionID)

        // this.usernameAlreadySelected = true
        socket.auth = {
          sessionID,
          username: loggedInUser?.user?.profile?.username,
          userSocketUuid: loggedInUser.user?.profile?.uuid,
          userID: loggedInUser.user?.profile?.uuid,
        }

        socket.connect()
        dispatch(setSocket({ socket }))
      } else {
        socket.auth = {
          username: loggedInUser?.user?.profile?.username,
          userSocketUuid: loggedInUser.user?.profile?.uuid,
          userID: loggedInUser.user?.profile?.uuid,
        }

        socket.connect()
        dispatch(setSocket({ socket }))
      }
    } catch (e) {
      setSocketError(true)
      console.log('socket error:', socketError)
    }

    // if (socket) {
    socket.on('session', ({ sessionID, userID }) => {
      console.log('session received:', sessionID)
      socket.auth = { sessionID }
      localStorage.setItem('sessionID', sessionID);
      (socket as any).userID = userID
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        setIsConnected(false)
      }
    })

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })
    // }

    return () => {
      // if (socket)
      socket.off('connect')
      socket.off('disconnect')
      socket.off('session')
      socket.off('connect_error')
    }
  }, [loggedInUser])

  // useEffect(() => {
  //   if (socket) {
  // socket.on(
  //   'friendship-request-accepted',
  //   ({ content, from, fromUsername, to, conversation }) => {
  //     dispatch(
  //       addConversation({
  //         conversation,
  //         loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
  //       })
  //     )
  //
  //     toast({
  //       id: from,
  //       title: `${fromUsername} sent you a friend request.`,
  //       position: 'bottom-right',
  //       isClosable: true,
  //       status: 'success',
  //       duration: 5000,
  //       render: () => (
  //         <Flex direction="column" color="white" p={3} bg="green.500">
  //           <Flex>
  //             <p>{fromUsername} accepted your friend request.</p>
  //             <CloseButton
  //               className="sticky top ml-4"
  //               size="sm"
  //               onClick={() => {
  //                 toast.close(from)
  //               }}
  //             />
  //           </Flex>
  //         </Flex>
  //       ),
  //     })
  //   }
  // )

  // socket.on('private message', ({ content, from, fromUsername, to }) => {
  //   console.log('received private message content:', content)
  //   console.log('received private message from:', from)
  //
  //   console.log('received private message from:', fromUsername)
  //   console.log('received private message content:', to)
  //
  //   setFromFriendshipRequest(fromUsername)
  //   setprivateMessage(true)
  //
  //   toast({
  //     id: from,
  //     title: `${fromUsername} sent you a friend request.`,
  //     position: 'bottom-right',
  //     isClosable: true,
  //     status: 'success',
  //     duration: null,
  //     render: () => (
  //       <Flex direction="column" color="white" p={3} bg="green.500">
  //         <Flex>
  //           <p>{fromUsername} sent you a friend request.</p>
  //           <CloseButton
  //             className="sticky top ml-4"
  //             size="sm"
  //             onClick={() => {
  //               toast.close(from)
  //             }}
  //           />
  //         </Flex>
  //
  //         <Flex className="justify-end mt-3">
  //           <Button
  //             className="mr-3"
  //             onClick={async () => {
  //               const acceptFriendshipResponse = await acceptFriendRequest({
  //                 profileUuid: from,
  //               })
  //
  //               dispatch(
  //                 setFriendFlagOnProfile({
  //                   profileUuid: from,
  //                 })
  //               )
  //
  //               dispatch(
  //                 addFriendEntry({
  //                   friend: {
  //                     uuid: from,
  //                     username: fromUsername,
  //                   },
  //                 })
  //               )
  //
  //               dispatch(
  //                 addConversation({
  //                   conversation:
  //                     acceptFriendshipResponse.data?.acceptFriendRequest,
  //                   loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
  //                 })
  //               )
  //
  //               if (acceptFriendshipResponse) {
  //                 socket.emit('friendship-request-accepted', {
  //                   content:
  //                     loggedInUser.user?.profile?.username +
  //                     ' accepted your friend request.',
  //                   from: loggedInUser.user?.profile?.uuid,
  //                   fromUsername: loggedInUser.user?.profile?.username,
  //                   to: from,
  //                   toUsername: fromUsername,
  //                   conversation:
  //                     acceptFriendshipResponse.data?.acceptFriendRequest,
  //                 })
  //               }
  //
  //               toast.close(from)
  //             }}
  //           >
  //             Accept
  //           </Button>
  //           <Button>Reject</Button>
  //         </Flex>
  //       </Flex>
  //     ),
  //   })
  // })

  // socket.on('friend-connected', ({ username, uuid }) => {
  //   toast({
  //     id: uuid,
  //     title: `${username} went offline.`,
  //     position: 'bottom-right',
  //     isClosable: true,
  //     status: 'warning',
  //     duration: 5000,
  //   })
  // })

  // socket.on('friend-disconnected', ({ username, uuid }) => {
  //   toast({
  //     id: uuid,
  //     title: `${username} went offline.`,
  //     position: 'bottom-right',
  //     isClosable: true,
  //     status: 'warning',
  //     duration: 5000,
  //   })
  // })
  //
  // socket.on(
  //   'set-pending-call-for-conversation',
  //   ({ from, fromUsername, to, toUsername, conversationUuid }) => {
  //     dispatch(
  //       setPendingCall({
  //         uuid: conversationUuid,
  //         initiator: {
  //           uuid: from,
  //           username: fromUsername,
  //         },
  //       })
  //     )
  //   }
  // )
  //
  // socket.on(
  //   'cancel-pending-call-for-conversation',
  //   ({ conversationUuid }) => {
  //     dispatch(
  //       cancelPendingCall({
  //         conversationUuid,
  //       })
  //     )
  //   }
  // )

  //     return () => {
  //       // socket.off('private message')
  //       // socket.off('friendship-request-accepted')
  //       // socket.off('friend-disconnected')
  //       // socket.off('set-ongoing-call-for-conversation')
  //       // socket.off('set-pending-call-for-conversation')
  //       // socket.off('cancel-pending-call-for-conversation')
  //     }
  //   }
  // }, [socket])

  return (
    <Box className="flex mt-0.5">
      {isConnected ? (
        <div className="w-2 h-2 bg-green-500 rounded ml-2 "></div>
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded ml-2 "></div>
      )}

      {/*<Alert status="error" hidden={!socketError}>*/}
      {/*  <AlertIcon />*/}
      {/*  <AlertTitle>Error while trying to connect to socket.</AlertTitle>*/}
      {/*  <AlertDescription>*/}
      {/*    Your Chakra experience may be degraded.*/}
      {/*  </AlertDescription>*/}
      {/*</Alert>*/}
    </Box>
  )
}
