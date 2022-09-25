import { ReadStream } from 'fs';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream( options?:{ encoding?: string, highWaterMark?: number } ): ReadStream;
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Promise<GraphQLFileUpload>;
};

export type Community = {
  __typename?: 'Community';
  id: Scalars['Int'];
  username: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  privacy: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  timezone: Scalars['String'];
  creatorId: Scalars['String'];
  creator: User;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  participants: Profile;
};

export type CommunityInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  privacy: Scalars['String'];
  timezone: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type CommunityParticipant = {
  __typename?: 'CommunityParticipant';
  id: Scalars['Int'];
  profileId: Scalars['Float'];
  communityId: Scalars['Float'];
  participantUsername: Scalars['String'];
};

export type Conversation = {
  __typename?: 'Conversation';
  uuid: Scalars['String'];
  unreadMessages: Scalars['Float'];
  profileThatHasUnreadMessages: Scalars['String'];
  ongoingCall: Scalars['Boolean'];
  pendingCall: Scalars['Boolean'];
  pendingCallProfile?: Maybe<Profile>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  profiles: Array<Profile>;
  conversations: Array<ConversationToProfile>;
  messages: Array<Message>;
};

export type ConversationToProfile = {
  __typename?: 'ConversationToProfile';
  uuid: Scalars['String'];
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
  unreadMessages: Scalars['Float'];
  profileThatHasUnreadMessages: Scalars['String'];
  conversation: Conversation;
  profile: Array<Profile>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
};


export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
  username: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  privacy: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  timezone: Scalars['String'];
  creatorId: Scalars['String'];
  creator: User;
  eventToProfiles: EventToProfile;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
};

export type EventInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  privacy: Scalars['String'];
  timezone: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type EventToProfile = {
  __typename?: 'EventToProfile';
  id: Scalars['Float'];
  eventId: Scalars['Float'];
  profileId: Scalars['Float'];
  event: Event;
  profile: Profile;
  participantUsername: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  uuid: Scalars['String'];
  username: Scalars['String'];
};

export type FriendshipRequest = {
  __typename?: 'FriendshipRequest';
  uuid: Scalars['String'];
  username: Scalars['String'];
  reverse?: Maybe<Scalars['Boolean']>;
};

export type Message = {
  __typename?: 'Message';
  uuid: Scalars['String'];
  sender: Profile;
  content: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createEvent: Event;
  joinEvent: Event;
  sendFriendRequest: Scalars['Boolean'];
  acceptFriendRequest: Conversation;
  cancelFriendRequest: Scalars['Boolean'];
  refuseFriendRequest: Scalars['Boolean'];
  unfriend: Scalars['Boolean'];
  createCommunity: Community;
  joinCommunity: Scalars['Boolean'];
  setPendingCallForConversation: Scalars['Boolean'];
  cancelPendingCallForConversation: Scalars['Boolean'];
  clearUnreadMessagesForConversation: Scalars['Boolean'];
  updateUnreadMessagesForConversation: Scalars['Boolean'];
  uploadImage: Message;
  saveMessage: Message;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationJoinEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationSendFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationAcceptFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationCancelFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationRefuseFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationUnfriendArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationCreateCommunityArgs = {
  input: CommunityInput;
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['Int'];
};


export type MutationSetPendingCallForConversationArgs = {
  pendingCallInitiatorUuid: Scalars['String'];
  conversationUuid: Scalars['String'];
};


export type MutationCancelPendingCallForConversationArgs = {
  conversationUuid: Scalars['String'];
};


export type MutationClearUnreadMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUpdateUnreadMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUploadImageArgs = {
  upload?: Maybe<Scalars['Upload']>;
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationSaveMessageArgs = {
  conversationUuid: Scalars['String'];
  to: Scalars['String'];
  message: Scalars['String'];
};

export type PaginatedEvents = {
  __typename?: 'PaginatedEvents';
  events: Array<Event>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['String'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  uuid: Scalars['String'];
  username: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  user: User;
  friends: Array<Friend>;
  friendshipRequests: Array<FriendshipRequest>;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  me?: Maybe<User>;
  event?: Maybe<Event>;
  events: PaginatedEvents;
  profile?: Maybe<Profile>;
  getProfileByUserId: Profile;
  getProfiles: Array<Profile>;
  getProfileByUsername: Profile;
  community?: Maybe<Community>;
  communities: Array<Community>;
  getCommunityParticipants: Array<CommunityParticipant>;
  getCommunitiesParticipants: Array<CommunityParticipant>;
  searchForProfileByUsername?: Maybe<Array<Search>>;
  searchForProfileByUuid?: Maybe<Search>;
  getConversationForLoggedInUser?: Maybe<Array<Conversation>>;
  getConversationsByProfileUuid?: Maybe<Conversation>;
  getConversationProfileForLoggedInUser?: Maybe<ConversationToProfile>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryEventsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProfileArgs = {
  uuid: Scalars['String'];
};


export type QueryGetProfileByUserIdArgs = {
  userId: Scalars['Int'];
};


export type QueryGetProfileByUsernameArgs = {
  username: Scalars['Int'];
};


export type QueryCommunityArgs = {
  id: Scalars['Int'];
};


export type QueryGetCommunityParticipantsArgs = {
  id: Scalars['Int'];
};


export type QueryGetCommunitiesParticipantsArgs = {
  communitiesIds: Array<Scalars['Int']>;
};


export type QuerySearchForProfileByUsernameArgs = {
  username: Scalars['String'];
};


export type QuerySearchForProfileByUuidArgs = {
  profileUuid: Scalars['String'];
};


export type QueryGetConversationsByProfileUuidArgs = {
  profileUuid: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  uuid: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  uuid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  profile: Profile;
  friends: Array<Friend>;
  friendshipRequests: Array<FriendshipRequest>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user: User;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};
