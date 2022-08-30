import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
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
  acceptFriendRequest: Scalars['Boolean'];
  createCommunity: Community;
  joinCommunity: Scalars['Boolean'];
  clearUnreadMessagesForConversation: Scalars['Boolean'];
  updateUnreadMessagesForConversation: Scalars['Boolean'];
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


export type MutationCreateCommunityArgs = {
  input: CommunityInput;
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['Int'];
};


export type MutationClearUnreadMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUpdateUnreadMessagesForConversationArgs = {
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

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type AcceptFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptFriendRequest'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ClearUnreadMessagesForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type ClearUnreadMessagesForConversationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearUnreadMessagesForConversation'>
);

export type CreateCommunityMutationVariables = Exact<{
  input: CommunityInput;
}>;


export type CreateCommunityMutation = (
  { __typename?: 'Mutation' }
  & { createCommunity: (
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'creatorId'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type CommunitySnippetFragment = (
  { __typename?: 'Community' }
  & Pick<Community, 'id' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username'>
  ) }
);

export type ConversationProfileSnippetFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'uuid' | 'username'>
);

export type ConversationSnippetFragment = (
  { __typename?: 'Conversation' }
  & Pick<Conversation, 'uuid' | 'unreadMessages' | 'profileThatHasUnreadMessages'>
  & { profiles: Array<(
    { __typename?: 'Profile' }
    & ConversationProfileSnippetFragment
  )>, messages: Array<(
    { __typename?: 'Message' }
    & MessageSnippetFragment
  )> }
);

export type ConversationToProfileSnippetFragment = (
  { __typename?: 'ConversationToProfile' }
  & Pick<ConversationToProfile, 'uuid' | 'unreadMessages' | 'profileThatHasUnreadMessages'>
  & { profile: Array<(
    { __typename?: 'Profile' }
    & ConversationProfileSnippetFragment
  )> }
);

export type EventSnippetFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username'>
  ) }
);

export type EventToProfileSnippetFragment = (
  { __typename?: 'EventToProfile' }
  & Pick<EventToProfile, 'id'>
);

export type FriendSnippetFragment = (
  { __typename?: 'Friend' }
  & Pick<Friend, 'uuid' | 'username'>
);

export type FriendshipRequestSnippetFragment = (
  { __typename?: 'FriendshipRequest' }
  & Pick<FriendshipRequest, 'uuid' | 'username' | 'reverse'>
);

export type MessageSnippetFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'uuid' | 'content' | 'updatedAt' | 'createdAt'>
  & { sender: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'uuid' | 'username'>
  ) }
);

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'createdAt' | 'updatedAt' | 'textSnippet' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username'>
  ) }
);

export type ProfileSnippetFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'uuid' | 'username'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username'>
  ), friends: Array<(
    { __typename?: 'Friend' }
    & FriendSnippetFragment
  )>, friendshipRequests: Array<(
    { __typename?: 'FriendshipRequest' }
    & FriendshipRequestSnippetFragment
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'uuid' | 'username'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'uuid' | 'username'>
  & { profile: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'uuid' | 'username'>
  ) }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type JoinCommunityMutationVariables = Exact<{
  communityId: Scalars['Int'];
}>;


export type JoinCommunityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinCommunity'>
);

export type JoinEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type JoinEventMutation = (
  { __typename?: 'Mutation' }
  & { joinEvent: (
    { __typename?: 'Event' }
    & Pick<Event, 'timezone'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunitiesQuery = (
  { __typename?: 'Query' }
  & { communities: Array<(
    { __typename?: 'Community' }
    & CommunitySnippetFragment
  )> }
);

export type CommunityQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CommunityQuery = (
  { __typename?: 'Query' }
  & { community?: Maybe<(
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'username' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'uuid' | 'username'>
    ) }
  )> }
);

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'username' | 'title' | 'description' | 'privacy' | 'timezone' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'uuid' | 'username'>
    ) }
  )> }
);

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'PaginatedEvents' }
    & Pick<PaginatedEvents, 'hasMore'>
    & { events: Array<(
      { __typename?: 'Event' }
      & EventSnippetFragment
    )> }
  ) }
);

export type GetCommunitiesParticipantsQueryVariables = Exact<{
  communitiesIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetCommunitiesParticipantsQuery = (
  { __typename?: 'Query' }
  & { getCommunitiesParticipants: Array<(
    { __typename?: 'CommunityParticipant' }
    & Pick<CommunityParticipant, 'id' | 'profileId' | 'communityId' | 'participantUsername'>
  )> }
);

export type GetCommunityParticipantsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCommunityParticipantsQuery = (
  { __typename?: 'Query' }
  & { getCommunityParticipants: Array<(
    { __typename?: 'CommunityParticipant' }
    & Pick<CommunityParticipant, 'id' | 'profileId' | 'participantUsername'>
  )> }
);

export type GetConversationForLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationForLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { getConversationForLoggedInUser?: Maybe<Array<(
    { __typename?: 'Conversation' }
    & ConversationSnippetFragment
  )>> }
);

export type GetConversationProfileForLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationProfileForLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { getConversationProfileForLoggedInUser?: Maybe<(
    { __typename?: 'ConversationToProfile' }
    & ConversationToProfileSnippetFragment
  )> }
);

export type GetConversationsByProfileUuidQueryVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type GetConversationsByProfileUuidQuery = (
  { __typename?: 'Query' }
  & { getConversationsByProfileUuid?: Maybe<(
    { __typename?: 'Conversation' }
    & ConversationSnippetFragment
  )> }
);

export type GetProfileByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetProfileByUserIdQuery = (
  { __typename?: 'Query' }
  & { getProfileByUserId: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'uuid' | 'username'>
  ) }
);

export type GetProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilesQuery = (
  { __typename?: 'Query' }
  & { getProfiles: Array<(
    { __typename?: 'Profile' }
    & ProfileSnippetFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { friends: Array<(
      { __typename?: 'Friend' }
      & FriendSnippetFragment
    )>, friendshipRequests: Array<(
      { __typename?: 'FriendshipRequest' }
      & FriendshipRequestSnippetFragment
    )> }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'voteStatus' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'uuid' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type SearchForProfileByUuidQueryVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type SearchForProfileByUuidQuery = (
  { __typename?: 'Query' }
  & { searchForProfileByUuid?: Maybe<(
    { __typename?: 'Search' }
    & Pick<Search, 'uuid' | 'username' | 'name' | 'userId' | 'updatedAt' | 'createdAt'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SaveMessageMutationVariables = Exact<{
  message: Scalars['String'];
  conversationUuid: Scalars['String'];
  to: Scalars['String'];
}>;


export type SaveMessageMutation = (
  { __typename?: 'Mutation' }
  & { saveMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'uuid'>
  ) }
);

export type SendFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFriendRequest'>
);

export type UpdateUnreadMessagesForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type UpdateUnreadMessagesForConversationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUnreadMessagesForConversation'>
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export const CommunitySnippetFragmentDoc = gql`
    fragment CommunitySnippet on Community {
  id
  title
  description
  privacy
  timezone
  startDate
  endDate
  createdAt
  updatedAt
  creator {
    uuid
    username
  }
}
    `;
export const ConversationProfileSnippetFragmentDoc = gql`
    fragment ConversationProfileSnippet on Profile {
  uuid
  username
}
    `;
export const MessageSnippetFragmentDoc = gql`
    fragment MessageSnippet on Message {
  uuid
  content
  updatedAt
  createdAt
  sender {
    uuid
    username
  }
}
    `;
export const ConversationSnippetFragmentDoc = gql`
    fragment ConversationSnippet on Conversation {
  uuid
  unreadMessages
  profileThatHasUnreadMessages
  profiles {
    ...ConversationProfileSnippet
  }
  messages {
    ...MessageSnippet
  }
}
    ${ConversationProfileSnippetFragmentDoc}
${MessageSnippetFragmentDoc}`;
export const ConversationToProfileSnippetFragmentDoc = gql`
    fragment ConversationToProfileSnippet on ConversationToProfile {
  uuid
  unreadMessages
  profileThatHasUnreadMessages
  profile {
    ...ConversationProfileSnippet
  }
}
    ${ConversationProfileSnippetFragmentDoc}`;
export const EventSnippetFragmentDoc = gql`
    fragment EventSnippet on Event {
  id
  title
  description
  privacy
  timezone
  startDate
  endDate
  createdAt
  updatedAt
  creator {
    uuid
    username
  }
}
    `;
export const EventToProfileSnippetFragmentDoc = gql`
    fragment EventToProfileSnippet on EventToProfile {
  id
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  title
  text
  points
  createdAt
  updatedAt
  textSnippet
  voteStatus
  creator {
    uuid
    username
  }
}
    `;
export const FriendSnippetFragmentDoc = gql`
    fragment FriendSnippet on Friend {
  uuid
  username
}
    `;
export const FriendshipRequestSnippetFragmentDoc = gql`
    fragment FriendshipRequestSnippet on FriendshipRequest {
  uuid
  username
  reverse
}
    `;
export const ProfileSnippetFragmentDoc = gql`
    fragment ProfileSnippet on Profile {
  uuid
  username
  user {
    uuid
    username
  }
  friends {
    ...FriendSnippet
  }
  friendshipRequests {
    ...FriendshipRequestSnippet
  }
}
    ${FriendSnippetFragmentDoc}
${FriendshipRequestSnippetFragmentDoc}`;
export const RegularProfileFragmentDoc = gql`
    fragment RegularProfile on Profile {
  uuid
  username
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  uuid
  username
  profile {
    uuid
    username
  }
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    textSnippet
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($profileUuid: String!) {
  acceptFriendRequest(profileUuid: $profileUuid)
}
    `;

export function useAcceptFriendRequestMutation() {
  return Urql.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ClearUnreadMessagesForConversationDocument = gql`
    mutation ClearUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  clearUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;

export function useClearUnreadMessagesForConversationMutation() {
  return Urql.useMutation<ClearUnreadMessagesForConversationMutation, ClearUnreadMessagesForConversationMutationVariables>(ClearUnreadMessagesForConversationDocument);
};
export const CreateCommunityDocument = gql`
    mutation CreateCommunity($input: CommunityInput!) {
  createCommunity(input: $input) {
    id
    title
    description
    privacy
    timezone
    startDate
    endDate
    createdAt
    updatedAt
  }
}
    `;

export function useCreateCommunityMutation() {
  return Urql.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument);
};
export const CreateEventDocument = gql`
    mutation CreateEvent($input: EventInput!) {
  createEvent(input: $input) {
    id
    title
    description
    privacy
    timezone
    startDate
    endDate
    createdAt
    updatedAt
  }
}
    `;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    title
    text
    points
    creatorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const JoinCommunityDocument = gql`
    mutation JoinCommunity($communityId: Int!) {
  joinCommunity(communityId: $communityId)
}
    `;

export function useJoinCommunityMutation() {
  return Urql.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument);
};
export const JoinEventDocument = gql`
    mutation JoinEvent($eventId: Int!) {
  joinEvent(eventId: $eventId) {
    timezone
  }
}
    `;

export function useJoinEventMutation() {
  return Urql.useMutation<JoinEventMutation, JoinEventMutationVariables>(JoinEventDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CommunitiesDocument = gql`
    query Communities {
  communities {
    ...CommunitySnippet
  }
}
    ${CommunitySnippetFragmentDoc}`;

export function useCommunitiesQuery(options: Omit<Urql.UseQueryArgs<CommunitiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommunitiesQuery>({ query: CommunitiesDocument, ...options });
};
export const CommunityDocument = gql`
    query Community($id: Int!) {
  community(id: $id) {
    id
    username
    title
    description
    privacy
    timezone
    startDate
    endDate
    createdAt
    updatedAt
    creator {
      uuid
      username
    }
  }
}
    `;

export function useCommunityQuery(options: Omit<Urql.UseQueryArgs<CommunityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommunityQuery>({ query: CommunityDocument, ...options });
};
export const EventDocument = gql`
    query Event($id: Int!) {
  event(id: $id) {
    id
    username
    title
    description
    privacy
    timezone
    startDate
    endDate
    createdAt
    updatedAt
    creator {
      uuid
      username
    }
  }
}
    `;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventQuery>({ query: EventDocument, ...options });
};
export const EventsDocument = gql`
    query Events($limit: Int!, $cursor: String) {
  events(cursor: $cursor, limit: $limit) {
    hasMore
    events {
      ...EventSnippet
    }
  }
}
    ${EventSnippetFragmentDoc}`;

export function useEventsQuery(options: Omit<Urql.UseQueryArgs<EventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventsQuery>({ query: EventsDocument, ...options });
};
export const GetCommunitiesParticipantsDocument = gql`
    query GetCommunitiesParticipants($communitiesIds: [Int!]!) {
  getCommunitiesParticipants(communitiesIds: $communitiesIds) {
    id
    profileId
    communityId
    participantUsername
  }
}
    `;

export function useGetCommunitiesParticipantsQuery(options: Omit<Urql.UseQueryArgs<GetCommunitiesParticipantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommunitiesParticipantsQuery>({ query: GetCommunitiesParticipantsDocument, ...options });
};
export const GetCommunityParticipantsDocument = gql`
    query GetCommunityParticipants($id: Int!) {
  getCommunityParticipants(id: $id) {
    id
    profileId
    participantUsername
  }
}
    `;

export function useGetCommunityParticipantsQuery(options: Omit<Urql.UseQueryArgs<GetCommunityParticipantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommunityParticipantsQuery>({ query: GetCommunityParticipantsDocument, ...options });
};
export const GetConversationForLoggedInUserDocument = gql`
    query GetConversationForLoggedInUser {
  getConversationForLoggedInUser {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useGetConversationForLoggedInUserQuery(options: Omit<Urql.UseQueryArgs<GetConversationForLoggedInUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationForLoggedInUserQuery>({ query: GetConversationForLoggedInUserDocument, ...options });
};
export const GetConversationProfileForLoggedInUserDocument = gql`
    query GetConversationProfileForLoggedInUser {
  getConversationProfileForLoggedInUser {
    ...ConversationToProfileSnippet
  }
}
    ${ConversationToProfileSnippetFragmentDoc}`;

export function useGetConversationProfileForLoggedInUserQuery(options: Omit<Urql.UseQueryArgs<GetConversationProfileForLoggedInUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationProfileForLoggedInUserQuery>({ query: GetConversationProfileForLoggedInUserDocument, ...options });
};
export const GetConversationsByProfileUuidDocument = gql`
    query GetConversationsByProfileUuid($profileUuid: String!) {
  getConversationsByProfileUuid(profileUuid: $profileUuid) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

export function useGetConversationsByProfileUuidQuery(options: Omit<Urql.UseQueryArgs<GetConversationsByProfileUuidQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConversationsByProfileUuidQuery>({ query: GetConversationsByProfileUuidDocument, ...options });
};
export const GetProfileByUserIdDocument = gql`
    query GetProfileByUserId($userId: Int!) {
  getProfileByUserId(userId: $userId) {
    uuid
    username
  }
}
    `;

export function useGetProfileByUserIdQuery(options: Omit<Urql.UseQueryArgs<GetProfileByUserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfileByUserIdQuery>({ query: GetProfileByUserIdDocument, ...options });
};
export const GetProfilesDocument = gql`
    query GetProfiles {
  getProfiles {
    ...ProfileSnippet
  }
}
    ${ProfileSnippetFragmentDoc}`;

export function useGetProfilesQuery(options: Omit<Urql.UseQueryArgs<GetProfilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProfilesQuery>({ query: GetProfilesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    friends {
      ...FriendSnippet
    }
    friendshipRequests {
      ...FriendshipRequestSnippet
    }
  }
}
    ${RegularUserFragmentDoc}
${FriendSnippetFragmentDoc}
${FriendshipRequestSnippetFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    title
    text
    points
    voteStatus
    createdAt
    updatedAt
    creator {
      uuid
      username
    }
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const SearchForProfileByUuidDocument = gql`
    query SearchForProfileByUuid($profileUuid: String!) {
  searchForProfileByUuid(profileUuid: $profileUuid) {
    uuid
    username
    name
    userId
    updatedAt
    createdAt
  }
}
    `;

export function useSearchForProfileByUuidQuery(options: Omit<Urql.UseQueryArgs<SearchForProfileByUuidQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchForProfileByUuidQuery>({ query: SearchForProfileByUuidDocument, ...options });
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SaveMessageDocument = gql`
    mutation SaveMessage($message: String!, $conversationUuid: String!, $to: String!) {
  saveMessage(message: $message, conversationUuid: $conversationUuid, to: $to) {
    uuid
  }
}
    `;

export function useSaveMessageMutation() {
  return Urql.useMutation<SaveMessageMutation, SaveMessageMutationVariables>(SaveMessageDocument);
};
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($profileUuid: String!) {
  sendFriendRequest(profileUuid: $profileUuid)
}
    `;

export function useSendFriendRequestMutation() {
  return Urql.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument);
};
export const UpdateUnreadMessagesForConversationDocument = gql`
    mutation UpdateUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  updateUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;

export function useUpdateUnreadMessagesForConversationMutation() {
  return Urql.useMutation<UpdateUnreadMessagesForConversationMutation, UpdateUnreadMessagesForConversationMutationVariables>(UpdateUnreadMessagesForConversationDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};