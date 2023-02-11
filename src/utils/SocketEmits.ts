import { Conversation, Profile, User } from '../generated/graphql'
import { Socket } from 'socket.io-client'

interface FriendshipRequestAccepted {
  loggedInUser: User
  profile: Profile
  conversation: Conversation | undefined
  socket: Socket
}

interface PrivateChatMessage {
  loggedInUser: User
  profile: Profile
  response: any
  activeConversation: Conversation
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

export function emitPrivateChatMessage({
  loggedInUser,
  profile,
  response,
  activeConversation,
  socket,
}: PrivateChatMessage) {
  socket.emit('private-chat-message', {
    content: loggedInUser.profile?.username + ' sent you a message.',
    from: loggedInUser.profile?.uuid,
    fromUsername: loggedInUser.profile?.username,
    to: profile.uuid,
    toUsername: profile.username,
    messageUuid: response.data?.uploadImage.uuid,
    message: response.data?.uploadImage.content,
    type: response.data?.uploadImage.type,
    src: response.data?.uploadImage.src,
    conversationUuid: activeConversation.uuid,
  })
}
