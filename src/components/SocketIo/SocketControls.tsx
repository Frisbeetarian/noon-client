import React, { useEffect } from 'react'
import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendRequestEntry,
} from '../../store/users'
import { Button, CloseButton, Flex, useToast } from '@chakra-ui/react'
import { setFriendFlagOnProfile } from '../../store/profiles'
import { addConversation } from '../../store/chat'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../../store/sockets'
import { useAcceptFriendRequestMutation } from '../../generated/graphql'

function SocketControls() {
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const toast = useToast()
  const loggedInUser = useSelector(getLoggedInUser)
  const [
    acceptFriendRequest,
    // {loading: acceptFriendRequestLoading}
  ] = useAcceptFriendRequestMutation()

  useEffect(() => {
    if (socket) {
      socket.on('send-friend-request', ({ from, fromUsername }) => {
        dispatch(
          addFriendRequestEntry({
            friendRequest: {
              uuid: from,
              username: fromUsername,
              reverse: true,
            },
          })
        )

        toast({
          id: from,
          title: `${fromUsername} sent you a friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'success',
          duration: null,
          render: () => (
            <Flex direction="column" color="white" p={3} bg="green.500">
              <Flex>
                <p>{fromUsername} sent you a friend request.</p>

                <CloseButton
                  className="sticky top ml-4"
                  size="sm"
                  onClick={() => {
                    toast.close(from)
                  }}
                  name="close button"
                />
              </Flex>

              <Flex className="justify-end mt-3">
                <Button
                  variant="green"
                  className="mr-3"
                  onClick={async () => {
                    const acceptFriendshipResponse = await acceptFriendRequest({
                      variables: {
                        profileUuid: from,
                      },
                    })

                    dispatch(
                      setFriendFlagOnProfile({
                        profileUuid: from,
                      })
                    )

                    dispatch(
                      removeFriendRequestEntry({
                        profileUuid: from,
                        friendRequests: loggedInUser.user?.friendshipRequests,
                      })
                    )

                    dispatch(
                      addFriendEntry({
                        friend: {
                          uuid: from,
                          username: fromUsername,
                        },
                      })
                    )

                    dispatch(
                      addConversation({
                        conversation:
                          acceptFriendshipResponse.data?.acceptFriendRequest,
                        loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                      })
                    )

                    if (acceptFriendshipResponse) {
                      socket.emit('friendship-request-accepted', {
                        content:
                          loggedInUser.user?.profile?.username +
                          ' accepted your friend request.',
                        from: loggedInUser.user?.profile?.uuid,
                        fromUsername: loggedInUser.user?.profile?.username,
                        to: from,
                        toUsername: fromUsername,
                        conversation:
                          acceptFriendshipResponse.data?.acceptFriendRequest,
                      })
                    }

                    toast.close(from)
                  }}
                >
                  Accept
                </Button>

                <Button bg="tomato">Reject</Button>
              </Flex>
            </Flex>
          ),
        })
      })
    }

    return () => {
      if (socket) {
        socket.off('send-friend-request')
      }
    }
  }, [socket])

  return null
}

export default SocketControls
