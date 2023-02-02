export type User = {
  uuid: string
  username: string
  email: string
  profile: ProfileInUser
}

export type UserResponse = {
  errors: RegularError[]
  user: User
}

export type ProfileInUser = {
  uuid: string
  username: string
}

export type ProfileInConversation = {
  uuid: string
  username: string
}

export type ProfileInMessage = {
  uuid: string
  username: string
}

export type Profile = {
  uuid: string
  username: string
  user: {
    uuid: string
    username: string
  }
  friends: Friend[]
  friendshipRequests: FriendshipRequest[]
}

export type Friend = {
  uuid: string
  username: string
}

export type FriendshipRequest = {
  uuid: string
  username: string
  reverse: boolean
}

export type Conversation = {
  uuid: string
  unreadMessages: number
  profileThatHasUnreadMessages: Profile
  updatedAt: Date
  createdAt: Date
  profiles: ProfileInConversation[]
  messages: Message[]
  hasMore: boolean
  calls: Call[]
  type: string
  name: string
  description: string
  pendingCallProfile: ProfileInConversation
}

export type Message = {
  uuid: string
  content: string
  updatedAt: Date
  createdAt: Date
  type: string
  src: string
  deleted: boolean
  sender: ProfileInMessage
}

export type Call = {
  profileUuid: string
  profileUsername: string
  pendingCall: boolean
  ongoingCall: boolean
}
export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form
  message?: string
}

export type RegularError = {
  field: string
  message: string
}

export type acceptFriendRequest = {
  uuid: string
  unreadMessages: number
  profileThatHasUnreadMessages: string
  updatedAt: string
  createdAt: string
  hasMore: boolean
  type: string
  name: string | null
  description: string | null
  profiles: ProfileInUser[]
  messages: Message[]
  calls: Call[]
  pendingCallProfile: ProfileInUser | null
}