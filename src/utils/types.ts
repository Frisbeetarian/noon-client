export type User = {
  uuid: string
  username: string
  email: string
  profile: ProfileInUser
  friendshipRequests: FriendshipRequest[]
  friends: Friend[]
  publicKey: string
}

export type UserResponse = {
  errors: RegularError[]
  user: User
}

export type ProfileInUser = {
  uuid: string
  username: string
  friends: Friend[]
  friendshipRequests: FriendshipRequest[]
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

export interface Auth {
  sessionID?: string | null | undefined
  username?: string
  userSocketUuid?: string
  userID?: string
}

export type Friend = {
  uuid: string
  username: string
  name: string
  publicKey?: string
}

export type FriendshipRequest = {
  uuid: string
  username: string
  reverse: boolean
}

export type Conversation = {
  uuid: string
  unreadMessages: number
  profileThatHasUnreadMessages: string | []
  profiles: ProfileInConversation[]
  messages: Message[]
  hasMore: boolean
  calls: Call[]
  pendingCall: boolean | null | undefined
  ongoingCall: boolean | null | undefined
  type: string
  name: string
  description: string
  pendingCallProfile: ProfileInConversation
  updatedAt: Date
  createdAt: Date
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
  from: 'me' | 'other' | null
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

export type FriendRequest = {
  uuid: string
  username: string
  reverse: boolean
}
