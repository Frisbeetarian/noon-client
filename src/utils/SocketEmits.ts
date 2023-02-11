import { useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'
import { Conversation, Profile, User } from '../generated/graphql'

const socket = useSelector(getSocket)

interface FriendshipRequestAccepted {
  loggedInUser: User
  profile: Profile
  conversation: Conversation | undefined
}

export function emitFriendshipRequestAccepted({
  loggedInUser,
  profile,
  conversation,
}: FriendshipRequestAccepted) {
  socket.emit('friendship-request-accepted', {
    content: loggedInUser.profile?.username + ' accepted your friend request.',
    from: loggedInUser.profile?.uuid,
    fromUsername: loggedInUser.profile?.username,
    to: profile.uuid,
    toUsername: profile.username,
    conversation,
  })
}
