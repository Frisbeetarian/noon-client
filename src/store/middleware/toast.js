import { Button, CloseButton, Flex, useToast } from '@chakra-ui/react'
import { setFriendFlagOnProfile } from '../profiles'
import { addFriendEntry, removeFriendRequestEntry } from '../users'
import { addConversation } from '../chat'

const toast = (store) => (next) => (action) => {
  const toast = useToast()
  if (action.type === 'success') {
    console.log('INT TOAST')
    toast({
      id: senderUuid,
      title: `${senderUsername} sent you a friend request.`,
      position: 'bottom-right',
      isClosable: true,
      status: 'success',
      duration: null,
      render: () => (
        <Flex direction="column" color="white" p={3} bg="green.500">
          <Flex>
            <p>{senderUsername} sent you a friend request.</p>

            <CloseButton
              className="sticky top ml-4"
              size="sm"
              onClick={() => {
                toast.close(senderUuid)
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
                    profileUuid: senderUuid,
                  },
                })

                dispatch(
                  setFriendFlagOnProfile({
                    profileUuid: senderUuid,
                  })
                )

                dispatch(
                  removeFriendRequestEntry({
                    profileUuid: senderUuid,
                    friendRequests: loggedInUser.user?.friendshipRequests,
                  })
                )

                dispatch(
                  addFriendEntry({
                    uuid: senderUuid,
                    username: senderUsername,
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
                    to: senderUuid,
                    toUsername: senderUsername,
                    conversation:
                      acceptFriendshipResponse.data?.acceptFriendRequest,
                  })
                }

                toast.close(senderUuid)
              }}
            >
              Accept
            </Button>

            <Button bg="tomato">Reject</Button>
          </Flex>
        </Flex>
      ),
    })
  } else if (action.type === 'error') {
    toast({
      title: 'Error',
      description: action.payload.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  } else if (action.type === 'error') {
    console.log('toastify', action.payload.message)
  } else {
    return next(action)
  }
}

export default toast
