import { Conversation, Profile, User } from '../generated/graphql'
import { Socket } from 'socket.io-client'

interface FriendshipRequestAccepted {
  loggedInUser: User
  profile: Profile
  conversation: Conversation | undefined
  socket: Socket
}

export function emitFriendshipRequestAccepted({
  loggedInUser,
  profile,
  conversation,
  socket,
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
