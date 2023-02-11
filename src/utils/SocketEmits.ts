import { useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'
import { Conversation, Profile, User } from './types'

const socket = useSelector(getSocket)

interface FriendshipRequestAccepted {
  loggedInUser: User
  profile: Profile
  conversation: Conversation
}

export function emitFriendshipRequestAccepted({
  loggedInUser,
  profile,
  conversation,
}: FriendshipRequestAccepted) {
  socket.emit('friendship-request-accepted', {
    content:
      loggedInUser.user?.profile?.username + ' accepted your friend request.',
    from: loggedInUser.user?.profile?.uuid,
    fromUsername: loggedInUser.user?.profile?.username,
    to: profile.uuid,
    toUsername: profile.username,
    conversation,
  })
}
