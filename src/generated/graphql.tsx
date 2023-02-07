import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: import('graphql-upload-minimal').FileUpload;
};

export type Conversation = {
  __typename?: 'Conversation';
  calls: Array<ConversationToProfile>;
  conversationToProfiles: Array<ConversationToProfile>;
  conversations: Array<ConversationToProfile>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  pendingCallProfile?: Maybe<Profile>;
  profileThatHasUnreadMessages: Scalars['String'];
  profiles: Array<Profile>;
  type: Scalars['String'];
  unreadMessages: Scalars['Float'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type ConversationToProfile = {
  __typename?: 'ConversationToProfile';
  conversation: Conversation;
  conversationUuid: Scalars['String'];
  createdAt: Scalars['String'];
  ongoingCall: Scalars['Boolean'];
  pendingCall: Scalars['Boolean'];
  profile: Array<Profile>;
  profileThatHasUnreadMessages: Scalars['String'];
  profileUsername: Scalars['String'];
  profileUuid: Scalars['String'];
  unreadMessages: Scalars['Float'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type FriendshipRequest = {
  __typename?: 'FriendshipRequest';
  reverse: Scalars['Boolean'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type GroupInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversationUuid: Scalars['String'];
  createdAt: Scalars['String'];
  deleted: Scalars['Boolean'];
  sender: Profile;
  src?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  uuid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: Conversation;
  cancelFriendRequest: Scalars['Boolean'];
  cancelPendingCallForConversation: Scalars['Boolean'];
  changePassword: UserResponse;
  clearUnreadMessagesForConversation: Scalars['Boolean'];
  createGroupConversation: Conversation;
  createPost: Post;
  deleteMessage: Message;
  deletePost: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  leaveGroup: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  refuseFriendRequest: Scalars['Boolean'];
  register: UserResponse;
  saveGroupMessage: Message;
  saveMessage: Message;
  sendFriendRequest: Scalars['Boolean'];
  setPendingCallForConversation: Scalars['Boolean'];
  unfriend: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  updateUnreadMessagesForConversation: Scalars['Boolean'];
  uploadImage: Message;
  uploadVoiceRecording: Message;
  vote: Scalars['Boolean'];
};


export type MutationAcceptFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationCancelFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationCancelPendingCallForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationClearUnreadMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationCreateGroupConversationArgs = {
  input: GroupInput;
  participants: Array<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeleteMessageArgs = {
  conversationUuid: Scalars['String'];
  from: Scalars['String'];
  messageUuid: Scalars['String'];
  src: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLeaveGroupArgs = {
  groupUuid: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
  username: Scalars['String'];
};


export type MutationRefuseFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSaveGroupMessageArgs = {
  conversationUuid: Scalars['String'];
  message: Scalars['String'];
  src: Scalars['String'];
  type: Scalars['String'];
};


export type MutationSaveMessageArgs = {
  conversationUuid: Scalars['String'];
  message: Scalars['String'];
  src: Scalars['String'];
  to: Scalars['String'];
  type: Scalars['String'];
};


export type MutationSendFriendRequestArgs = {
  profileUuid: Scalars['String'];
};


export type MutationSetPendingCallForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUnfriendArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUnreadMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
};


export type MutationUploadImageArgs = {
  conversationUuid: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  profileUuid: Scalars['String'];
};


export type MutationUploadVoiceRecordingArgs = {
  conversationUuid: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  profileUuid: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['Float'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['String'];
  friends: Array<Friend>;
  friendshipRequests: Array<FriendshipRequest>;
  updatedAt: Scalars['String'];
  user: User;
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkIfConversationHasMoreMessages: Scalars['Boolean'];
  getConversationForLoggedInUser?: Maybe<Array<Conversation>>;
  getConversationProfileForLoggedInUser?: Maybe<ConversationToProfile>;
  getConversationsByProfileUuid?: Maybe<Conversation>;
  getMessagesForConversation: PaginatedMessages;
  getProfileByUserId: Profile;
  getProfileByUsername: Profile;
  getProfiles: Array<Profile>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  profile?: Maybe<Profile>;
  searchForProfileByUsername?: Maybe<Array<Search>>;
  searchForProfileByUuid?: Maybe<Search>;
};


export type QueryCheckIfConversationHasMoreMessagesArgs = {
  conversationUuid: Scalars['String'];
};


export type QueryGetConversationsByProfileUuidArgs = {
  profileUuid: Scalars['String'];
};


export type QueryGetMessagesForConversationArgs = {
  conversationUuid: Scalars['String'];
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetProfileByUserIdArgs = {
  userId: Scalars['Int'];
};


export type QueryGetProfileByUsernameArgs = {
  username: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProfileArgs = {
  uuid: Scalars['String'];
};


export type QuerySearchForProfileByUsernameArgs = {
  username: Scalars['String'];
};


export type QuerySearchForProfileByUuidArgs = {
  profileUuid: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  createdAt: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  friends: Array<Friend>;
  friendshipRequests: Array<FriendshipRequest>;
  profile: Profile;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: number, title: string, text: string, textSnippet: string } | null };

export type AcceptFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'Conversation', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, updatedAt: string, createdAt: string, hasMore: boolean, type: string, name?: string | null, description?: string | null, profiles: Array<{ __typename?: 'Profile', uuid: string, username: string }>, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }>, calls: Array<{ __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean }>, pendingCallProfile?: { __typename?: 'Profile', uuid: string, username: string } | null } };

export type CancelFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest: boolean };

export type CancelPendingCallForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type CancelPendingCallForConversationMutation = { __typename?: 'Mutation', cancelPendingCallForConversation: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, profile: { __typename?: 'Profile', uuid: string, username: string } } | null } };

export type ClearUnreadMessagesForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type ClearUnreadMessagesForConversationMutation = { __typename?: 'Mutation', clearUnreadMessagesForConversation: boolean };

export type CreateGroupConversationMutationVariables = Exact<{
  input: GroupInput;
  participants: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateGroupConversationMutation = { __typename?: 'Mutation', createGroupConversation: { __typename?: 'Conversation', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, updatedAt: string, createdAt: string, hasMore: boolean, type: string, name?: string | null, description?: string | null, profiles: Array<{ __typename?: 'Profile', uuid: string, username: string }>, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }>, calls: Array<{ __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean }>, pendingCallProfile?: { __typename?: 'Profile', uuid: string, username: string } | null } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, creatorId: string } };

export type DeleteMessageMutationVariables = Exact<{
  messageUuid: Scalars['String'];
  conversationUuid: Scalars['String'];
  from: Scalars['String'];
  type: Scalars['String'];
  src: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'Message', uuid: string, content: string, deleted: boolean } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type CallsSnippetFragment = { __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean };

export type ConversationProfileSnippetFragment = { __typename?: 'Profile', uuid: string, username: string };

export type ConversationSnippetFragment = { __typename?: 'Conversation', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, updatedAt: string, createdAt: string, hasMore: boolean, type: string, name?: string | null, description?: string | null, profiles: Array<{ __typename?: 'Profile', uuid: string, username: string }>, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }>, calls: Array<{ __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean }>, pendingCallProfile?: { __typename?: 'Profile', uuid: string, username: string } | null };

export type ConversationToProfileSnippetFragment = { __typename?: 'ConversationToProfile', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, profile: Array<{ __typename?: 'Profile', uuid: string, username: string }> };

export type FriendSnippetFragment = { __typename?: 'Friend', uuid: string, username: string };

export type FriendshipRequestSnippetFragment = { __typename?: 'FriendshipRequest', uuid: string, username: string, reverse: boolean };

export type MessageSnippetFragment = { __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } };

export type PostSnippetFragment = { __typename?: 'Post', id: number, title: string, text: string, points: number, createdAt: string, updatedAt: string, textSnippet: string, voteStatus?: number | null, creator: { __typename?: 'User', uuid: string, username: string } };

export type ProfileSnippetFragment = { __typename?: 'Profile', uuid: string, username: string, user: { __typename?: 'User', uuid: string, username: string }, friends: Array<{ __typename?: 'Friend', uuid: string, username: string }>, friendshipRequests: Array<{ __typename?: 'FriendshipRequest', uuid: string, username: string, reverse: boolean }> };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularProfileFragment = { __typename?: 'Profile', uuid: string, username: string };

export type RegularUserFragment = { __typename?: 'User', uuid: string, username: string, email: string, profile: { __typename?: 'Profile', uuid: string, username: string } };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, profile: { __typename?: 'Profile', uuid: string, username: string } } | null };

export type LeaveGroupMutationVariables = Exact<{
  groupUuid: Scalars['String'];
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup: boolean };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, profile: { __typename?: 'Profile', uuid: string, username: string } } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CheckIfConversationHasMoreMessagesQueryVariables = Exact<{
  conversationUuid: Scalars['String'];
}>;


export type CheckIfConversationHasMoreMessagesQuery = { __typename?: 'Query', checkIfConversationHasMoreMessages: boolean };

export type GetConversationForLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationForLoggedInUserQuery = { __typename?: 'Query', getConversationForLoggedInUser?: Array<{ __typename?: 'Conversation', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, updatedAt: string, createdAt: string, hasMore: boolean, type: string, name?: string | null, description?: string | null, profiles: Array<{ __typename?: 'Profile', uuid: string, username: string }>, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }>, calls: Array<{ __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean }>, pendingCallProfile?: { __typename?: 'Profile', uuid: string, username: string } | null }> | null };

export type GetConversationProfileForLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationProfileForLoggedInUserQuery = { __typename?: 'Query', getConversationProfileForLoggedInUser?: { __typename?: 'ConversationToProfile', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, profile: Array<{ __typename?: 'Profile', uuid: string, username: string }> } | null };

export type GetConversationsByProfileUuidQueryVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type GetConversationsByProfileUuidQuery = { __typename?: 'Query', getConversationsByProfileUuid?: { __typename?: 'Conversation', uuid: string, unreadMessages: number, profileThatHasUnreadMessages: string, updatedAt: string, createdAt: string, hasMore: boolean, type: string, name?: string | null, description?: string | null, profiles: Array<{ __typename?: 'Profile', uuid: string, username: string }>, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }>, calls: Array<{ __typename?: 'ConversationToProfile', profileUuid: string, profileUsername: string, pendingCall: boolean, ongoingCall: boolean }>, pendingCallProfile?: { __typename?: 'Profile', uuid: string, username: string } | null } | null };

export type GetMessagesForConversationQueryVariables = Exact<{
  conversationUuid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetMessagesForConversationQuery = { __typename?: 'Query', getMessagesForConversation: { __typename?: 'PaginatedMessages', hasMore: boolean, messages: Array<{ __typename?: 'Message', uuid: string, content: string, updatedAt: string, createdAt: string, type: string, src?: string | null, deleted: boolean, sender: { __typename?: 'Profile', uuid: string, username: string } }> } };

export type GetProfileByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetProfileByUserIdQuery = { __typename?: 'Query', getProfileByUserId: { __typename?: 'Profile', uuid: string, username: string } };

export type GetProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilesQuery = { __typename?: 'Query', getProfiles: Array<{ __typename?: 'Profile', uuid: string, username: string, user: { __typename?: 'User', uuid: string, username: string }, friends: Array<{ __typename?: 'Friend', uuid: string, username: string }>, friendshipRequests: Array<{ __typename?: 'FriendshipRequest', uuid: string, username: string, reverse: boolean }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', uuid: string, username: string, email: string, friends: Array<{ __typename?: 'Friend', uuid: string, username: string }>, friendshipRequests: Array<{ __typename?: 'FriendshipRequest', uuid: string, username: string, reverse: boolean }>, profile: { __typename?: 'Profile', uuid: string, username: string } } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, text: string, points: number, voteStatus?: number | null, createdAt: string, updatedAt: string, creator: { __typename?: 'User', uuid: string, username: string } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, title: string, text: string, points: number, createdAt: string, updatedAt: string, textSnippet: string, voteStatus?: number | null, creator: { __typename?: 'User', uuid: string, username: string } }> } };

export type SearchForProfileByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchForProfileByUsernameQuery = { __typename?: 'Query', searchForProfileByUsername?: Array<{ __typename?: 'Search', uuid: string, username: string, name: string, userId: string, updatedAt: string, createdAt: string }> | null };

export type SearchForProfileByUuidQueryVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type SearchForProfileByUuidQuery = { __typename?: 'Query', searchForProfileByUuid?: { __typename?: 'Search', uuid: string, username: string, name: string, userId: string, updatedAt: string, createdAt: string } | null };

export type RefuseFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type RefuseFriendRequestMutation = { __typename?: 'Mutation', refuseFriendRequest: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', uuid: string, username: string, email: string, profile: { __typename?: 'Profile', uuid: string, username: string } } | null } };

export type SaveGroupMessageMutationVariables = Exact<{
  message: Scalars['String'];
  conversationUuid: Scalars['String'];
  type: Scalars['String'];
  src: Scalars['String'];
}>;


export type SaveGroupMessageMutation = { __typename?: 'Mutation', saveGroupMessage: { __typename?: 'Message', uuid: string } };

export type SaveMessageMutationVariables = Exact<{
  message: Scalars['String'];
  conversationUuid: Scalars['String'];
  to: Scalars['String'];
  type: Scalars['String'];
  src: Scalars['String'];
}>;


export type SaveMessageMutation = { __typename?: 'Mutation', saveMessage: { __typename?: 'Message', uuid: string } };

export type SendFriendRequestMutationVariables = Exact<{
  profileUuid: Scalars['String'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: boolean };

export type SetPendingCallForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type SetPendingCallForConversationMutation = { __typename?: 'Mutation', setPendingCallForConversation: boolean };

export type UnfriendMutationVariables = Exact<{
  profileUuid: Scalars['String'];
  conversationUuid: Scalars['String'];
}>;


export type UnfriendMutation = { __typename?: 'Mutation', unfriend: boolean };

export type UpdateUnreadMessagesForConversationMutationVariables = Exact<{
  conversationUuid: Scalars['String'];
  profileUuid: Scalars['String'];
}>;


export type UpdateUnreadMessagesForConversationMutation = { __typename?: 'Mutation', updateUnreadMessagesForConversation: boolean };

export type UploadImageMutationVariables = Exact<{
  profileUuid: Scalars['String'];
  conversationUuid: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'Message', uuid: string, content: string, type: string, src?: string | null } };

export type UploadVoiceRecordingMutationVariables = Exact<{
  profileUuid: Scalars['String'];
  conversationUuid: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadVoiceRecordingMutation = { __typename?: 'Mutation', uploadVoiceRecording: { __typename?: 'Message', uuid: string, content: string, type: string, src?: string | null } };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

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
  type
  src
  deleted
  sender {
    uuid
    username
  }
}
    `;
export const CallsSnippetFragmentDoc = gql`
    fragment CallsSnippet on ConversationToProfile {
  profileUuid
  profileUsername
  pendingCall
  ongoingCall
}
    `;
export const ConversationSnippetFragmentDoc = gql`
    fragment ConversationSnippet on Conversation {
  uuid
  unreadMessages
  profileThatHasUnreadMessages
  updatedAt
  createdAt
  profiles {
    ...ConversationProfileSnippet
  }
  messages {
    ...MessageSnippet
  }
  hasMore
  calls {
    ...CallsSnippet
  }
  type
  name
  description
  pendingCallProfile {
    ...ConversationProfileSnippet
  }
}
    ${ConversationProfileSnippetFragmentDoc}
${MessageSnippetFragmentDoc}
${CallsSnippetFragmentDoc}`;
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
  email
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
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($profileUuid: String!) {
  acceptFriendRequest(profileUuid: $profileUuid) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($profileUuid: String!) {
  cancelFriendRequest(profileUuid: $profileUuid)
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, options);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const CancelPendingCallForConversationDocument = gql`
    mutation CancelPendingCallForConversation($conversationUuid: String!, $profileUuid: String!) {
  cancelPendingCallForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
export type CancelPendingCallForConversationMutationFn = Apollo.MutationFunction<CancelPendingCallForConversationMutation, CancelPendingCallForConversationMutationVariables>;

/**
 * __useCancelPendingCallForConversationMutation__
 *
 * To run a mutation, you first call `useCancelPendingCallForConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPendingCallForConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPendingCallForConversationMutation, { data, loading, error }] = useCancelPendingCallForConversationMutation({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useCancelPendingCallForConversationMutation(baseOptions?: Apollo.MutationHookOptions<CancelPendingCallForConversationMutation, CancelPendingCallForConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelPendingCallForConversationMutation, CancelPendingCallForConversationMutationVariables>(CancelPendingCallForConversationDocument, options);
      }
export type CancelPendingCallForConversationMutationHookResult = ReturnType<typeof useCancelPendingCallForConversationMutation>;
export type CancelPendingCallForConversationMutationResult = Apollo.MutationResult<CancelPendingCallForConversationMutation>;
export type CancelPendingCallForConversationMutationOptions = Apollo.BaseMutationOptions<CancelPendingCallForConversationMutation, CancelPendingCallForConversationMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ClearUnreadMessagesForConversationDocument = gql`
    mutation ClearUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  clearUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
export type ClearUnreadMessagesForConversationMutationFn = Apollo.MutationFunction<ClearUnreadMessagesForConversationMutation, ClearUnreadMessagesForConversationMutationVariables>;

/**
 * __useClearUnreadMessagesForConversationMutation__
 *
 * To run a mutation, you first call `useClearUnreadMessagesForConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearUnreadMessagesForConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearUnreadMessagesForConversationMutation, { data, loading, error }] = useClearUnreadMessagesForConversationMutation({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useClearUnreadMessagesForConversationMutation(baseOptions?: Apollo.MutationHookOptions<ClearUnreadMessagesForConversationMutation, ClearUnreadMessagesForConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearUnreadMessagesForConversationMutation, ClearUnreadMessagesForConversationMutationVariables>(ClearUnreadMessagesForConversationDocument, options);
      }
export type ClearUnreadMessagesForConversationMutationHookResult = ReturnType<typeof useClearUnreadMessagesForConversationMutation>;
export type ClearUnreadMessagesForConversationMutationResult = Apollo.MutationResult<ClearUnreadMessagesForConversationMutation>;
export type ClearUnreadMessagesForConversationMutationOptions = Apollo.BaseMutationOptions<ClearUnreadMessagesForConversationMutation, ClearUnreadMessagesForConversationMutationVariables>;
export const CreateGroupConversationDocument = gql`
    mutation CreateGroupConversation($input: GroupInput!, $participants: [String!]!) {
  createGroupConversation(input: $input, participants: $participants) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
export type CreateGroupConversationMutationFn = Apollo.MutationFunction<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>;

/**
 * __useCreateGroupConversationMutation__
 *
 * To run a mutation, you first call `useCreateGroupConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupConversationMutation, { data, loading, error }] = useCreateGroupConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useCreateGroupConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>(CreateGroupConversationDocument, options);
      }
export type CreateGroupConversationMutationHookResult = ReturnType<typeof useCreateGroupConversationMutation>;
export type CreateGroupConversationMutationResult = Apollo.MutationResult<CreateGroupConversationMutation>;
export type CreateGroupConversationMutationOptions = Apollo.BaseMutationOptions<CreateGroupConversationMutation, CreateGroupConversationMutationVariables>;
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
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageUuid: String!, $conversationUuid: String!, $from: String!, $type: String!, $src: String!) {
  deleteMessage(
    messageUuid: $messageUuid
    conversationUuid: $conversationUuid
    from: $from
    type: $type
    src: $src
  ) {
    uuid
    content
    deleted
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageUuid: // value for 'messageUuid'
 *      conversationUuid: // value for 'conversationUuid'
 *      from: // value for 'from'
 *      type: // value for 'type'
 *      src: // value for 'src'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation LeaveGroup($groupUuid: String!) {
  leaveGroup(groupUuid: $groupUuid)
}
    `;
export type LeaveGroupMutationFn = Apollo.MutationFunction<LeaveGroupMutation, LeaveGroupMutationVariables>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *      groupUuid: // value for 'groupUuid'
 *   },
 * });
 */
export function useLeaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGroupMutation, LeaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
      }
export type LeaveGroupMutationHookResult = ReturnType<typeof useLeaveGroupMutation>;
export type LeaveGroupMutationResult = Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {
  login(username: $username, password: $password, rememberMe: $rememberMe) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      rememberMe: // value for 'rememberMe'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CheckIfConversationHasMoreMessagesDocument = gql`
    query CheckIfConversationHasMoreMessages($conversationUuid: String!) {
  checkIfConversationHasMoreMessages(conversationUuid: $conversationUuid)
}
    `;

/**
 * __useCheckIfConversationHasMoreMessagesQuery__
 *
 * To run a query within a React component, call `useCheckIfConversationHasMoreMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfConversationHasMoreMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfConversationHasMoreMessagesQuery({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *   },
 * });
 */
export function useCheckIfConversationHasMoreMessagesQuery(baseOptions: Apollo.QueryHookOptions<CheckIfConversationHasMoreMessagesQuery, CheckIfConversationHasMoreMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfConversationHasMoreMessagesQuery, CheckIfConversationHasMoreMessagesQueryVariables>(CheckIfConversationHasMoreMessagesDocument, options);
      }
export function useCheckIfConversationHasMoreMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfConversationHasMoreMessagesQuery, CheckIfConversationHasMoreMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfConversationHasMoreMessagesQuery, CheckIfConversationHasMoreMessagesQueryVariables>(CheckIfConversationHasMoreMessagesDocument, options);
        }
export type CheckIfConversationHasMoreMessagesQueryHookResult = ReturnType<typeof useCheckIfConversationHasMoreMessagesQuery>;
export type CheckIfConversationHasMoreMessagesLazyQueryHookResult = ReturnType<typeof useCheckIfConversationHasMoreMessagesLazyQuery>;
export type CheckIfConversationHasMoreMessagesQueryResult = Apollo.QueryResult<CheckIfConversationHasMoreMessagesQuery, CheckIfConversationHasMoreMessagesQueryVariables>;
export const GetConversationForLoggedInUserDocument = gql`
    query GetConversationForLoggedInUser {
  getConversationForLoggedInUser {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

/**
 * __useGetConversationForLoggedInUserQuery__
 *
 * To run a query within a React component, call `useGetConversationForLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationForLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationForLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationForLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationForLoggedInUserQuery, GetConversationForLoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationForLoggedInUserQuery, GetConversationForLoggedInUserQueryVariables>(GetConversationForLoggedInUserDocument, options);
      }
export function useGetConversationForLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationForLoggedInUserQuery, GetConversationForLoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationForLoggedInUserQuery, GetConversationForLoggedInUserQueryVariables>(GetConversationForLoggedInUserDocument, options);
        }
export type GetConversationForLoggedInUserQueryHookResult = ReturnType<typeof useGetConversationForLoggedInUserQuery>;
export type GetConversationForLoggedInUserLazyQueryHookResult = ReturnType<typeof useGetConversationForLoggedInUserLazyQuery>;
export type GetConversationForLoggedInUserQueryResult = Apollo.QueryResult<GetConversationForLoggedInUserQuery, GetConversationForLoggedInUserQueryVariables>;
export const GetConversationProfileForLoggedInUserDocument = gql`
    query GetConversationProfileForLoggedInUser {
  getConversationProfileForLoggedInUser {
    ...ConversationToProfileSnippet
  }
}
    ${ConversationToProfileSnippetFragmentDoc}`;

/**
 * __useGetConversationProfileForLoggedInUserQuery__
 *
 * To run a query within a React component, call `useGetConversationProfileForLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationProfileForLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationProfileForLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationProfileForLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationProfileForLoggedInUserQuery, GetConversationProfileForLoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationProfileForLoggedInUserQuery, GetConversationProfileForLoggedInUserQueryVariables>(GetConversationProfileForLoggedInUserDocument, options);
      }
export function useGetConversationProfileForLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationProfileForLoggedInUserQuery, GetConversationProfileForLoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationProfileForLoggedInUserQuery, GetConversationProfileForLoggedInUserQueryVariables>(GetConversationProfileForLoggedInUserDocument, options);
        }
export type GetConversationProfileForLoggedInUserQueryHookResult = ReturnType<typeof useGetConversationProfileForLoggedInUserQuery>;
export type GetConversationProfileForLoggedInUserLazyQueryHookResult = ReturnType<typeof useGetConversationProfileForLoggedInUserLazyQuery>;
export type GetConversationProfileForLoggedInUserQueryResult = Apollo.QueryResult<GetConversationProfileForLoggedInUserQuery, GetConversationProfileForLoggedInUserQueryVariables>;
export const GetConversationsByProfileUuidDocument = gql`
    query GetConversationsByProfileUuid($profileUuid: String!) {
  getConversationsByProfileUuid(profileUuid: $profileUuid) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;

/**
 * __useGetConversationsByProfileUuidQuery__
 *
 * To run a query within a React component, call `useGetConversationsByProfileUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsByProfileUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsByProfileUuidQuery({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useGetConversationsByProfileUuidQuery(baseOptions: Apollo.QueryHookOptions<GetConversationsByProfileUuidQuery, GetConversationsByProfileUuidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsByProfileUuidQuery, GetConversationsByProfileUuidQueryVariables>(GetConversationsByProfileUuidDocument, options);
      }
export function useGetConversationsByProfileUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsByProfileUuidQuery, GetConversationsByProfileUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsByProfileUuidQuery, GetConversationsByProfileUuidQueryVariables>(GetConversationsByProfileUuidDocument, options);
        }
export type GetConversationsByProfileUuidQueryHookResult = ReturnType<typeof useGetConversationsByProfileUuidQuery>;
export type GetConversationsByProfileUuidLazyQueryHookResult = ReturnType<typeof useGetConversationsByProfileUuidLazyQuery>;
export type GetConversationsByProfileUuidQueryResult = Apollo.QueryResult<GetConversationsByProfileUuidQuery, GetConversationsByProfileUuidQueryVariables>;
export const GetMessagesForConversationDocument = gql`
    query GetMessagesForConversation($conversationUuid: String!, $limit: Int!, $cursor: String) {
  getMessagesForConversation(
    conversationUuid: $conversationUuid
    cursor: $cursor
    limit: $limit
  ) {
    hasMore
    messages {
      ...MessageSnippet
    }
  }
}
    ${MessageSnippetFragmentDoc}`;

/**
 * __useGetMessagesForConversationQuery__
 *
 * To run a query within a React component, call `useGetMessagesForConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesForConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesForConversationQuery({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMessagesForConversationQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesForConversationQuery, GetMessagesForConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesForConversationQuery, GetMessagesForConversationQueryVariables>(GetMessagesForConversationDocument, options);
      }
export function useGetMessagesForConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesForConversationQuery, GetMessagesForConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesForConversationQuery, GetMessagesForConversationQueryVariables>(GetMessagesForConversationDocument, options);
        }
export type GetMessagesForConversationQueryHookResult = ReturnType<typeof useGetMessagesForConversationQuery>;
export type GetMessagesForConversationLazyQueryHookResult = ReturnType<typeof useGetMessagesForConversationLazyQuery>;
export type GetMessagesForConversationQueryResult = Apollo.QueryResult<GetMessagesForConversationQuery, GetMessagesForConversationQueryVariables>;
export const GetProfileByUserIdDocument = gql`
    query GetProfileByUserId($userId: Int!) {
  getProfileByUserId(userId: $userId) {
    uuid
    username
  }
}
    `;

/**
 * __useGetProfileByUserIdQuery__
 *
 * To run a query within a React component, call `useGetProfileByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProfileByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>(GetProfileByUserIdDocument, options);
      }
export function useGetProfileByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>(GetProfileByUserIdDocument, options);
        }
export type GetProfileByUserIdQueryHookResult = ReturnType<typeof useGetProfileByUserIdQuery>;
export type GetProfileByUserIdLazyQueryHookResult = ReturnType<typeof useGetProfileByUserIdLazyQuery>;
export type GetProfileByUserIdQueryResult = Apollo.QueryResult<GetProfileByUserIdQuery, GetProfileByUserIdQueryVariables>;
export const GetProfilesDocument = gql`
    query GetProfiles {
  getProfiles {
    ...ProfileSnippet
  }
}
    ${ProfileSnippetFragmentDoc}`;

/**
 * __useGetProfilesQuery__
 *
 * To run a query within a React component, call `useGetProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfilesQuery(baseOptions?: Apollo.QueryHookOptions<GetProfilesQuery, GetProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, options);
      }
export function useGetProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilesQuery, GetProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, options);
        }
export type GetProfilesQueryHookResult = ReturnType<typeof useGetProfilesQuery>;
export type GetProfilesLazyQueryHookResult = ReturnType<typeof useGetProfilesLazyQuery>;
export type GetProfilesQueryResult = Apollo.QueryResult<GetProfilesQuery, GetProfilesQueryVariables>;
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
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

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SearchForProfileByUsernameDocument = gql`
    query SearchForProfileByUsername($username: String!) {
  searchForProfileByUsername(username: $username) {
    uuid
    username
    name
    userId
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useSearchForProfileByUsernameQuery__
 *
 * To run a query within a React component, call `useSearchForProfileByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForProfileByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForProfileByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchForProfileByUsernameQuery(baseOptions: Apollo.QueryHookOptions<SearchForProfileByUsernameQuery, SearchForProfileByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForProfileByUsernameQuery, SearchForProfileByUsernameQueryVariables>(SearchForProfileByUsernameDocument, options);
      }
export function useSearchForProfileByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForProfileByUsernameQuery, SearchForProfileByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForProfileByUsernameQuery, SearchForProfileByUsernameQueryVariables>(SearchForProfileByUsernameDocument, options);
        }
export type SearchForProfileByUsernameQueryHookResult = ReturnType<typeof useSearchForProfileByUsernameQuery>;
export type SearchForProfileByUsernameLazyQueryHookResult = ReturnType<typeof useSearchForProfileByUsernameLazyQuery>;
export type SearchForProfileByUsernameQueryResult = Apollo.QueryResult<SearchForProfileByUsernameQuery, SearchForProfileByUsernameQueryVariables>;
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

/**
 * __useSearchForProfileByUuidQuery__
 *
 * To run a query within a React component, call `useSearchForProfileByUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForProfileByUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForProfileByUuidQuery({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useSearchForProfileByUuidQuery(baseOptions: Apollo.QueryHookOptions<SearchForProfileByUuidQuery, SearchForProfileByUuidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForProfileByUuidQuery, SearchForProfileByUuidQueryVariables>(SearchForProfileByUuidDocument, options);
      }
export function useSearchForProfileByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForProfileByUuidQuery, SearchForProfileByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForProfileByUuidQuery, SearchForProfileByUuidQueryVariables>(SearchForProfileByUuidDocument, options);
        }
export type SearchForProfileByUuidQueryHookResult = ReturnType<typeof useSearchForProfileByUuidQuery>;
export type SearchForProfileByUuidLazyQueryHookResult = ReturnType<typeof useSearchForProfileByUuidLazyQuery>;
export type SearchForProfileByUuidQueryResult = Apollo.QueryResult<SearchForProfileByUuidQuery, SearchForProfileByUuidQueryVariables>;
export const RefuseFriendRequestDocument = gql`
    mutation RefuseFriendRequest($profileUuid: String!) {
  refuseFriendRequest(profileUuid: $profileUuid)
}
    `;
export type RefuseFriendRequestMutationFn = Apollo.MutationFunction<RefuseFriendRequestMutation, RefuseFriendRequestMutationVariables>;

/**
 * __useRefuseFriendRequestMutation__
 *
 * To run a mutation, you first call `useRefuseFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefuseFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refuseFriendRequestMutation, { data, loading, error }] = useRefuseFriendRequestMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useRefuseFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<RefuseFriendRequestMutation, RefuseFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefuseFriendRequestMutation, RefuseFriendRequestMutationVariables>(RefuseFriendRequestDocument, options);
      }
export type RefuseFriendRequestMutationHookResult = ReturnType<typeof useRefuseFriendRequestMutation>;
export type RefuseFriendRequestMutationResult = Apollo.MutationResult<RefuseFriendRequestMutation>;
export type RefuseFriendRequestMutationOptions = Apollo.BaseMutationOptions<RefuseFriendRequestMutation, RefuseFriendRequestMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SaveGroupMessageDocument = gql`
    mutation SaveGroupMessage($message: String!, $conversationUuid: String!, $type: String!, $src: String!) {
  saveGroupMessage(
    message: $message
    conversationUuid: $conversationUuid
    type: $type
    src: $src
  ) {
    uuid
  }
}
    `;
export type SaveGroupMessageMutationFn = Apollo.MutationFunction<SaveGroupMessageMutation, SaveGroupMessageMutationVariables>;

/**
 * __useSaveGroupMessageMutation__
 *
 * To run a mutation, you first call `useSaveGroupMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveGroupMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveGroupMessageMutation, { data, loading, error }] = useSaveGroupMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *      conversationUuid: // value for 'conversationUuid'
 *      type: // value for 'type'
 *      src: // value for 'src'
 *   },
 * });
 */
export function useSaveGroupMessageMutation(baseOptions?: Apollo.MutationHookOptions<SaveGroupMessageMutation, SaveGroupMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveGroupMessageMutation, SaveGroupMessageMutationVariables>(SaveGroupMessageDocument, options);
      }
export type SaveGroupMessageMutationHookResult = ReturnType<typeof useSaveGroupMessageMutation>;
export type SaveGroupMessageMutationResult = Apollo.MutationResult<SaveGroupMessageMutation>;
export type SaveGroupMessageMutationOptions = Apollo.BaseMutationOptions<SaveGroupMessageMutation, SaveGroupMessageMutationVariables>;
export const SaveMessageDocument = gql`
    mutation SaveMessage($message: String!, $conversationUuid: String!, $to: String!, $type: String!, $src: String!) {
  saveMessage(
    message: $message
    conversationUuid: $conversationUuid
    to: $to
    type: $type
    src: $src
  ) {
    uuid
  }
}
    `;
export type SaveMessageMutationFn = Apollo.MutationFunction<SaveMessageMutation, SaveMessageMutationVariables>;

/**
 * __useSaveMessageMutation__
 *
 * To run a mutation, you first call `useSaveMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMessageMutation, { data, loading, error }] = useSaveMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *      conversationUuid: // value for 'conversationUuid'
 *      to: // value for 'to'
 *      type: // value for 'type'
 *      src: // value for 'src'
 *   },
 * });
 */
export function useSaveMessageMutation(baseOptions?: Apollo.MutationHookOptions<SaveMessageMutation, SaveMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMessageMutation, SaveMessageMutationVariables>(SaveMessageDocument, options);
      }
export type SaveMessageMutationHookResult = ReturnType<typeof useSaveMessageMutation>;
export type SaveMessageMutationResult = Apollo.MutationResult<SaveMessageMutation>;
export type SaveMessageMutationOptions = Apollo.BaseMutationOptions<SaveMessageMutation, SaveMessageMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($profileUuid: String!) {
  sendFriendRequest(profileUuid: $profileUuid)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const SetPendingCallForConversationDocument = gql`
    mutation SetPendingCallForConversation($conversationUuid: String!, $profileUuid: String!) {
  setPendingCallForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
export type SetPendingCallForConversationMutationFn = Apollo.MutationFunction<SetPendingCallForConversationMutation, SetPendingCallForConversationMutationVariables>;

/**
 * __useSetPendingCallForConversationMutation__
 *
 * To run a mutation, you first call `useSetPendingCallForConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPendingCallForConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPendingCallForConversationMutation, { data, loading, error }] = useSetPendingCallForConversationMutation({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useSetPendingCallForConversationMutation(baseOptions?: Apollo.MutationHookOptions<SetPendingCallForConversationMutation, SetPendingCallForConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPendingCallForConversationMutation, SetPendingCallForConversationMutationVariables>(SetPendingCallForConversationDocument, options);
      }
export type SetPendingCallForConversationMutationHookResult = ReturnType<typeof useSetPendingCallForConversationMutation>;
export type SetPendingCallForConversationMutationResult = Apollo.MutationResult<SetPendingCallForConversationMutation>;
export type SetPendingCallForConversationMutationOptions = Apollo.BaseMutationOptions<SetPendingCallForConversationMutation, SetPendingCallForConversationMutationVariables>;
export const UnfriendDocument = gql`
    mutation Unfriend($profileUuid: String!, $conversationUuid: String!) {
  unfriend(profileUuid: $profileUuid, conversationUuid: $conversationUuid)
}
    `;
export type UnfriendMutationFn = Apollo.MutationFunction<UnfriendMutation, UnfriendMutationVariables>;

/**
 * __useUnfriendMutation__
 *
 * To run a mutation, you first call `useUnfriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfriendMutation, { data, loading, error }] = useUnfriendMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *      conversationUuid: // value for 'conversationUuid'
 *   },
 * });
 */
export function useUnfriendMutation(baseOptions?: Apollo.MutationHookOptions<UnfriendMutation, UnfriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfriendMutation, UnfriendMutationVariables>(UnfriendDocument, options);
      }
export type UnfriendMutationHookResult = ReturnType<typeof useUnfriendMutation>;
export type UnfriendMutationResult = Apollo.MutationResult<UnfriendMutation>;
export type UnfriendMutationOptions = Apollo.BaseMutationOptions<UnfriendMutation, UnfriendMutationVariables>;
export const UpdateUnreadMessagesForConversationDocument = gql`
    mutation UpdateUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  updateUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
export type UpdateUnreadMessagesForConversationMutationFn = Apollo.MutationFunction<UpdateUnreadMessagesForConversationMutation, UpdateUnreadMessagesForConversationMutationVariables>;

/**
 * __useUpdateUnreadMessagesForConversationMutation__
 *
 * To run a mutation, you first call `useUpdateUnreadMessagesForConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnreadMessagesForConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnreadMessagesForConversationMutation, { data, loading, error }] = useUpdateUnreadMessagesForConversationMutation({
 *   variables: {
 *      conversationUuid: // value for 'conversationUuid'
 *      profileUuid: // value for 'profileUuid'
 *   },
 * });
 */
export function useUpdateUnreadMessagesForConversationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUnreadMessagesForConversationMutation, UpdateUnreadMessagesForConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUnreadMessagesForConversationMutation, UpdateUnreadMessagesForConversationMutationVariables>(UpdateUnreadMessagesForConversationDocument, options);
      }
export type UpdateUnreadMessagesForConversationMutationHookResult = ReturnType<typeof useUpdateUnreadMessagesForConversationMutation>;
export type UpdateUnreadMessagesForConversationMutationResult = Apollo.MutationResult<UpdateUnreadMessagesForConversationMutation>;
export type UpdateUnreadMessagesForConversationMutationOptions = Apollo.BaseMutationOptions<UpdateUnreadMessagesForConversationMutation, UpdateUnreadMessagesForConversationMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($profileUuid: String!, $conversationUuid: String!, $file: Upload!) {
  uploadImage(
    profileUuid: $profileUuid
    conversationUuid: $conversationUuid
    file: $file
  ) {
    uuid
    content
    type
    src
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *      conversationUuid: // value for 'conversationUuid'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const UploadVoiceRecordingDocument = gql`
    mutation UploadVoiceRecording($profileUuid: String!, $conversationUuid: String!, $file: Upload!) {
  uploadVoiceRecording(
    profileUuid: $profileUuid
    conversationUuid: $conversationUuid
    file: $file
  ) {
    uuid
    content
    type
    src
  }
}
    `;
export type UploadVoiceRecordingMutationFn = Apollo.MutationFunction<UploadVoiceRecordingMutation, UploadVoiceRecordingMutationVariables>;

/**
 * __useUploadVoiceRecordingMutation__
 *
 * To run a mutation, you first call `useUploadVoiceRecordingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVoiceRecordingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVoiceRecordingMutation, { data, loading, error }] = useUploadVoiceRecordingMutation({
 *   variables: {
 *      profileUuid: // value for 'profileUuid'
 *      conversationUuid: // value for 'conversationUuid'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadVoiceRecordingMutation(baseOptions?: Apollo.MutationHookOptions<UploadVoiceRecordingMutation, UploadVoiceRecordingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadVoiceRecordingMutation, UploadVoiceRecordingMutationVariables>(UploadVoiceRecordingDocument, options);
      }
export type UploadVoiceRecordingMutationHookResult = ReturnType<typeof useUploadVoiceRecordingMutation>;
export type UploadVoiceRecordingMutationResult = Apollo.MutationResult<UploadVoiceRecordingMutation>;
export type UploadVoiceRecordingMutationOptions = Apollo.BaseMutationOptions<UploadVoiceRecordingMutation, UploadVoiceRecordingMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;