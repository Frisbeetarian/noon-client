"use strict";
exports.id = 711;
exports.ids = [711];
exports.modules = {

/***/ 9402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r9": () => (/* binding */ useAcceptFriendRequestMutation),
/* harmony export */   "Gk": () => (/* binding */ useCancelFriendRequestMutation),
/* harmony export */   "Fg": () => (/* binding */ useCancelPendingCallForConversationMutation),
/* harmony export */   "N3": () => (/* binding */ useClearUnreadMessagesForConversationMutation),
/* harmony export */   "yW": () => (/* binding */ useCreateGroupConversationMutation),
/* harmony export */   "h$": () => (/* binding */ useDeleteMessageMutation),
/* harmony export */   "zN": () => (/* binding */ useForgotPasswordMutation),
/* harmony export */   "nm": () => (/* binding */ useLeaveGroupMutation),
/* harmony export */   "YA": () => (/* binding */ useLoginMutation),
/* harmony export */   "_y": () => (/* binding */ useLogoutMutation),
/* harmony export */   "jE": () => (/* binding */ useCheckIfConversationHasMoreMessagesQuery),
/* harmony export */   "Yq": () => (/* binding */ useGetConversationForLoggedInUserQuery),
/* harmony export */   "VO": () => (/* binding */ useGetMessagesForConversationQuery),
/* harmony export */   "en": () => (/* binding */ MeDocument),
/* harmony export */   "UE": () => (/* binding */ useMeQuery),
/* harmony export */   "Rh": () => (/* binding */ useSearchForProfileByUsernameQuery),
/* harmony export */   "l4": () => (/* binding */ useRegisterMutation),
/* harmony export */   "g6": () => (/* binding */ useSaveGroupMessageMutation),
/* harmony export */   "J_": () => (/* binding */ useSaveMessageMutation),
/* harmony export */   "Gx": () => (/* binding */ useSendFriendRequestMutation),
/* harmony export */   "xD": () => (/* binding */ useSetPendingCallForConversationMutation),
/* harmony export */   "kJ": () => (/* binding */ useUnfriendMutation),
/* harmony export */   "FG": () => (/* binding */ useUpdateUnreadMessagesForConversationMutation)
/* harmony export */ });
/* unused harmony exports CommunitySnippetFragmentDoc, ConversationProfileSnippetFragmentDoc, MessageSnippetFragmentDoc, CallsSnippetFragmentDoc, ConversationSnippetFragmentDoc, ConversationToProfileSnippetFragmentDoc, EventSnippetFragmentDoc, EventToProfileSnippetFragmentDoc, PostSnippetFragmentDoc, FriendSnippetFragmentDoc, FriendshipRequestSnippetFragmentDoc, ProfileSnippetFragmentDoc, RegularProfileFragmentDoc, RegularErrorFragmentDoc, RegularUserFragmentDoc, RegularUserResponseFragmentDoc, UpdatePostDocument, useUpdatePostMutation, AcceptFriendRequestDocument, CancelFriendRequestDocument, CancelPendingCallForConversationDocument, ChangePasswordDocument, useChangePasswordMutation, ClearUnreadMessagesForConversationDocument, CreateCommunityDocument, useCreateCommunityMutation, CreateEventDocument, useCreateEventMutation, CreateGroupConversationDocument, CreatePostDocument, useCreatePostMutation, DeleteMessageDocument, DeletePostDocument, useDeletePostMutation, ForgotPasswordDocument, JoinCommunityDocument, useJoinCommunityMutation, JoinEventDocument, useJoinEventMutation, LeaveGroupDocument, LoginDocument, LogoutDocument, CheckIfConversationHasMoreMessagesDocument, CommunitiesDocument, useCommunitiesQuery, CommunityDocument, useCommunityQuery, EventDocument, useEventQuery, EventsDocument, useEventsQuery, GetCommunitiesParticipantsDocument, useGetCommunitiesParticipantsQuery, GetCommunityParticipantsDocument, useGetCommunityParticipantsQuery, GetConversationForLoggedInUserDocument, GetConversationProfileForLoggedInUserDocument, useGetConversationProfileForLoggedInUserQuery, GetConversationsByProfileUuidDocument, useGetConversationsByProfileUuidQuery, GetMessagesForConversationDocument, GetProfileByUserIdDocument, useGetProfileByUserIdQuery, GetProfilesDocument, useGetProfilesQuery, PostDocument, usePostQuery, PostsDocument, usePostsQuery, SearchForProfileByUsernameDocument, SearchForProfileByUuidDocument, useSearchForProfileByUuidQuery, RefuseFriendRequestDocument, useRefuseFriendRequestMutation, RegisterDocument, SaveGroupMessageDocument, SaveMessageDocument, SendFriendRequestDocument, SetPendingCallForConversationDocument, UnfriendDocument, UpdateUnreadMessagesForConversationDocument, UploadImageDocument, useUploadImageMutation, VoteDocument, useVoteMutation */
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_1__);
// @ts-nocheck


const CommunitySnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const ConversationProfileSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment ConversationProfileSnippet on Profile {
  uuid
  username
}
    `;
const MessageSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const CallsSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment CallsSnippet on ConversationToProfile {
  profileUuid
  profileUsername
  pendingCall
  ongoingCall
}
    `;
const ConversationSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const ConversationToProfileSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment ConversationToProfileSnippet on ConversationToProfile {
  uuid
  unreadMessages
  profileThatHasUnreadMessages
  profile {
    ...ConversationProfileSnippet
  }
}
    ${ConversationProfileSnippetFragmentDoc}`;
const EventSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const EventToProfileSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment EventToProfileSnippet on EventToProfile {
  id
}
    `;
const PostSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const FriendSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment FriendSnippet on Friend {
  uuid
  username
}
    `;
const FriendshipRequestSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment FriendshipRequestSnippet on FriendshipRequest {
  uuid
  username
  reverse
}
    `;
const ProfileSnippetFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const RegularProfileFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment RegularProfile on Profile {
  uuid
  username
}
    `;
const RegularErrorFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    fragment RegularError on FieldError {
  field
  message
}
    `;
const RegularUserFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const RegularUserResponseFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
const UpdatePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    textSnippet
  }
}
    `;
function useUpdatePostMutation() {
    return Urql.useMutation(UpdatePostDocument);
}
const AcceptFriendRequestDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation AcceptFriendRequest($profileUuid: String!) {
  acceptFriendRequest(profileUuid: $profileUuid) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
function useAcceptFriendRequestMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(AcceptFriendRequestDocument);
}
const CancelFriendRequestDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation CancelFriendRequest($profileUuid: String!) {
  cancelFriendRequest(profileUuid: $profileUuid)
}
    `;
function useCancelFriendRequestMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(CancelFriendRequestDocument);
}
const CancelPendingCallForConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation CancelPendingCallForConversation($conversationUuid: String!, $profileUuid: String!) {
  cancelPendingCallForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
function useCancelPendingCallForConversationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(CancelPendingCallForConversationDocument);
}
const ChangePasswordDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
function useChangePasswordMutation() {
    return Urql.useMutation(ChangePasswordDocument);
}
const ClearUnreadMessagesForConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation ClearUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  clearUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
function useClearUnreadMessagesForConversationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(ClearUnreadMessagesForConversationDocument);
}
const CreateCommunityDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useCreateCommunityMutation() {
    return Urql.useMutation(CreateCommunityDocument);
}
const CreateEventDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useCreateEventMutation() {
    return Urql.useMutation(CreateEventDocument);
}
const CreateGroupConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation CreateGroupConversation($input: GroupInput!, $participants: [String!]!) {
  createGroupConversation(input: $input, participants: $participants) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
function useCreateGroupConversationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(CreateGroupConversationDocument);
}
const CreatePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useCreatePostMutation() {
    return Urql.useMutation(CreatePostDocument);
}
const DeleteMessageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useDeleteMessageMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(DeleteMessageDocument);
}
const DeletePostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
function useDeletePostMutation() {
    return Urql.useMutation(DeletePostDocument);
}
const ForgotPasswordDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
function useForgotPasswordMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(ForgotPasswordDocument);
}
const JoinCommunityDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation JoinCommunity($communityId: Int!) {
  joinCommunity(communityId: $communityId)
}
    `;
function useJoinCommunityMutation() {
    return Urql.useMutation(JoinCommunityDocument);
}
const JoinEventDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation JoinEvent($eventId: Int!) {
  joinEvent(eventId: $eventId) {
    timezone
  }
}
    `;
function useJoinEventMutation() {
    return Urql.useMutation(JoinEventDocument);
}
const LeaveGroupDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation LeaveGroup($groupUuid: String!) {
  leaveGroup(groupUuid: $groupUuid)
}
    `;
function useLeaveGroupMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LeaveGroupDocument);
}
const LoginDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
function useLoginMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LoginDocument);
}
const LogoutDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation Logout {
  logout
}
    `;
function useLogoutMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(LogoutDocument);
}
const CheckIfConversationHasMoreMessagesDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query CheckIfConversationHasMoreMessages($conversationUuid: String!) {
  checkIfConversationHasMoreMessages(conversationUuid: $conversationUuid)
}
    `;
function useCheckIfConversationHasMoreMessagesQuery(options = {}) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: CheckIfConversationHasMoreMessagesDocument,
        ...options
    });
}
const CommunitiesDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query Communities {
  communities {
    ...CommunitySnippet
  }
}
    ${CommunitySnippetFragmentDoc}`;
function useCommunitiesQuery(options = {}) {
    return Urql.useQuery({
        query: CommunitiesDocument,
        ...options
    });
}
const CommunityDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useCommunityQuery(options = {}) {
    return Urql.useQuery({
        query: CommunityDocument,
        ...options
    });
}
const EventDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useEventQuery(options = {}) {
    return Urql.useQuery({
        query: EventDocument,
        ...options
    });
}
const EventsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query Events($limit: Int!, $cursor: String) {
  events(cursor: $cursor, limit: $limit) {
    hasMore
    events {
      ...EventSnippet
    }
  }
}
    ${EventSnippetFragmentDoc}`;
function useEventsQuery(options = {}) {
    return Urql.useQuery({
        query: EventsDocument,
        ...options
    });
}
const GetCommunitiesParticipantsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetCommunitiesParticipants($communitiesIds: [Int!]!) {
  getCommunitiesParticipants(communitiesIds: $communitiesIds) {
    id
    profileId
    communityId
    participantUsername
  }
}
    `;
function useGetCommunitiesParticipantsQuery(options = {}) {
    return Urql.useQuery({
        query: GetCommunitiesParticipantsDocument,
        ...options
    });
}
const GetCommunityParticipantsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetCommunityParticipants($id: Int!) {
  getCommunityParticipants(id: $id) {
    id
    profileId
    participantUsername
  }
}
    `;
function useGetCommunityParticipantsQuery(options = {}) {
    return Urql.useQuery({
        query: GetCommunityParticipantsDocument,
        ...options
    });
}
const GetConversationForLoggedInUserDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetConversationForLoggedInUser {
  getConversationForLoggedInUser {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
function useGetConversationForLoggedInUserQuery(options = {}) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: GetConversationForLoggedInUserDocument,
        ...options
    });
}
const GetConversationProfileForLoggedInUserDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetConversationProfileForLoggedInUser {
  getConversationProfileForLoggedInUser {
    ...ConversationToProfileSnippet
  }
}
    ${ConversationToProfileSnippetFragmentDoc}`;
function useGetConversationProfileForLoggedInUserQuery(options = {}) {
    return Urql.useQuery({
        query: GetConversationProfileForLoggedInUserDocument,
        ...options
    });
}
const GetConversationsByProfileUuidDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetConversationsByProfileUuid($profileUuid: String!) {
  getConversationsByProfileUuid(profileUuid: $profileUuid) {
    ...ConversationSnippet
  }
}
    ${ConversationSnippetFragmentDoc}`;
function useGetConversationsByProfileUuidQuery(options = {}) {
    return Urql.useQuery({
        query: GetConversationsByProfileUuidDocument,
        ...options
    });
}
const GetMessagesForConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useGetMessagesForConversationQuery(options = {}) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: GetMessagesForConversationDocument,
        ...options
    });
}
const GetProfileByUserIdDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetProfileByUserId($userId: Int!) {
  getProfileByUserId(userId: $userId) {
    uuid
    username
  }
}
    `;
function useGetProfileByUserIdQuery(options = {}) {
    return Urql.useQuery({
        query: GetProfileByUserIdDocument,
        ...options
    });
}
const GetProfilesDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query GetProfiles {
  getProfiles {
    ...ProfileSnippet
  }
}
    ${ProfileSnippetFragmentDoc}`;
function useGetProfilesQuery(options = {}) {
    return Urql.useQuery({
        query: GetProfilesDocument,
        ...options
    });
}
const MeDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useMeQuery(options = {}) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: MeDocument,
        ...options
    });
}
const PostDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function usePostQuery(options = {}) {
    return Urql.useQuery({
        query: PostDocument,
        ...options
    });
}
const PostsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    query Posts($limit: Int!, $cursor: String) {
  posts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;
function usePostsQuery(options = {}) {
    return Urql.useQuery({
        query: PostsDocument,
        ...options
    });
}
const SearchForProfileByUsernameDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useSearchForProfileByUsernameQuery(options = {}) {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useQuery({
        query: SearchForProfileByUsernameDocument,
        ...options
    });
}
const SearchForProfileByUuidDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useSearchForProfileByUuidQuery(options = {}) {
    return Urql.useQuery({
        query: SearchForProfileByUuidDocument,
        ...options
    });
}
const RefuseFriendRequestDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation RefuseFriendRequest($profileUuid: String!) {
  refuseFriendRequest(profileUuid: $profileUuid)
}
    `;
function useRefuseFriendRequestMutation() {
    return Urql.useMutation(RefuseFriendRequestDocument);
}
const RegisterDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
function useRegisterMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(RegisterDocument);
}
const SaveGroupMessageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useSaveGroupMessageMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(SaveGroupMessageDocument);
}
const SaveMessageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
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
function useSaveMessageMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(SaveMessageDocument);
}
const SendFriendRequestDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation SendFriendRequest($profileUuid: String!) {
  sendFriendRequest(profileUuid: $profileUuid)
}
    `;
function useSendFriendRequestMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(SendFriendRequestDocument);
}
const SetPendingCallForConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation SetPendingCallForConversation($conversationUuid: String!, $profileUuid: String!) {
  setPendingCallForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
function useSetPendingCallForConversationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(SetPendingCallForConversationDocument);
}
const UnfriendDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation Unfriend($profileUuid: String!, $conversationUuid: String!) {
  unfriend(profileUuid: $profileUuid, conversationUuid: $conversationUuid)
}
    `;
function useUnfriendMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(UnfriendDocument);
}
const UpdateUnreadMessagesForConversationDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation UpdateUnreadMessagesForConversation($conversationUuid: String!, $profileUuid: String!) {
  updateUnreadMessagesForConversation(
    conversationUuid: $conversationUuid
    profileUuid: $profileUuid
  )
}
    `;
function useUpdateUnreadMessagesForConversationMutation() {
    return urql__WEBPACK_IMPORTED_MODULE_1__.useMutation(UpdateUnreadMessagesForConversationDocument);
}
const UploadImageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation UploadImage($profileUuid: String!, $conversationUuid: String!, $file: Upload!) {
  uploadImage(
    profileUuid: $profileUuid
    conversationUuid: $conversationUuid
    file: $file
  ) {
    uuid
  }
}
    `;
function useUploadImageMutation() {
    return Urql.useMutation(UploadImageDocument);
}
const VoteDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
function useVoteMutation() {
    return Urql.useMutation(VoteDocument);
}


/***/ }),

/***/ 9012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ betterUpdateQuery)
/* harmony export */ });
function betterUpdateQuery(cache, qi, result, fn) {
    return cache.updateQuery(qi, (data)=>fn(result, data)
    );
}


/***/ }),

/***/ 4711:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ createUrqlClient)
/* harmony export */ });
/* harmony import */ var _urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9352);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2977);
/* harmony import */ var urql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var wonka__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3342);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9402);
/* harmony import */ var _betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9012);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _isServer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7786);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__, wonka__WEBPACK_IMPORTED_MODULE_3__]);
([_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__, wonka__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// @ts-nocheck


// import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';






const errorExchange = ({ forward  })=>{
    return (ops$)=>{
        return (0,wonka__WEBPACK_IMPORTED_MODULE_3__.pipe)(forward(ops$), (0,wonka__WEBPACK_IMPORTED_MODULE_3__.tap)(({ error  })=>{
            if (error) {
                if (error === null || error === void 0 ? void 0 : error.message.includes('not authenticated')) {
                    next_router__WEBPACK_IMPORTED_MODULE_5___default().replace('/onboarding');
                }
            }
        }));
    };
};
const messagesCursorPagination = (mergeMode = 'after')=>{
    return (_parent, fieldArgs, cache, info1)=>{
        const { parentKey: entityKey , fieldName  } = info1;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_1__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'messages');
        info1.partial = !isItInTheCache;
        let hasMore = true;
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'messages');
            const _hasMore = cache.resolve(key, 'hasMore)');
            if (!_hasMore) {
                hasMore = _hasMore;
            }
            results.push(...data);
        });
        return {
            __typename: 'PaginatedMessages',
            hasMore,
            messages: results
        };
    };
};
const eventsCursorPagination = (mergeMode = 'after')=>{
    return (_parent, fieldArgs, cache, info2)=>{
        const { parentKey: entityKey , fieldName  } = info2;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_1__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'events');
        info2.partial = !isItInTheCache;
        let hasMore = true;
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'events');
            const _hasMore = cache.resolve(key, 'hasMore');
            if (!_hasMore) {
                hasMore = _hasMore;
            }
            results.push(...data);
        });
        return {
            __typename: 'PaginatedEvents',
            hasMore,
            events: results
        };
    // const visited = new Set()
    // let result: NullArray<string> = []
    // let prevOffset: number | null = null
    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i]
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue
    //   }
    //   const links = cache.resolve(entityKey, fieldKey) as string[]
    //   const currentOffset = args[cursorArgument]
    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue
    //   }
    //   const tempResult: NullArray<string> = []
    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j]
    //     if (visited.has(link)) continue
    //     tempResult.push(link)
    //     visited.add(link)
    //   }
    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult]
    //   } else {
    //     result = [...tempResult, ...result]
    //   }
    //   prevOffset = currentOffset
    // }
    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs)
    // if (hasCurrentPage) {
    //   return result
    // } else if (!(info as any).store.schema) {
    //   return undefined
    // } else {
    //   info.partial = true
    //   return result
    // }
    };
};
const postsCursorPagination = (mergeMode = 'after')=>{
    return (_parent, fieldArgs, cache, info3)=>{
        const { parentKey: entityKey , fieldName  } = info3;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_1__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'posts');
        info3.partial = !isItInTheCache;
        let hasMore = true;
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'posts');
            const _hasMore = cache.resolve(key, 'hasMore');
            if (!_hasMore) {
                hasMore = _hasMore;
            }
            results.push(...data);
        });
        return {
            __typename: 'PaginatedPosts',
            hasMore,
            posts: results
        };
    };
};
const filteredProfilesPagination = (mergeMode = 'after')=>{
    return (_parent, fieldArgs, cache, info4)=>{
        const { parentKey: entityKey , fieldName  } = info4;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${(0,urql__WEBPACK_IMPORTED_MODULE_1__.stringifyVariables)(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'eventToProfiles');
        info4.partial = !isItInTheCache;
        // let hasMore = true
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'eventToProfiles');
            // const _hasMore = cache.resolve(key, 'hasMore')
            // if (!_hasMore) {
            //   hasMore = _hasMore as boolean
            // }
            results.push(...data);
        });
        return {
            __typename: 'filteredProfilesPagination',
            eventToProfiles: results
        };
    };
};
const CommunitiesResolver = (mergeMode = 'after')=>{
    return (_parent, fieldArgs, cache, info5)=>{
        const { parentKey: entityKey , fieldName  } = info5;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info)=>info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey), 'communities');
        info5.partial = !isItInTheCache;
        const results = [];
        fieldInfos.forEach((fi)=>{
            const key = cache.resolveFieldByKey(entityKey, fi.fieldKey);
            const data = cache.resolve(key, 'communities');
            results.push(...data);
        });
        return {
            __typename: 'Communities',
            communities: results
        };
    };
};
function invalidateAllPosts(cache) {
    const allFields = cache.inspectFields('Query');
    const fieldInfos = allFields.filter((info)=>info.fieldName === 'posts'
    );
    fieldInfos.forEach((fi)=>{
        cache.invalidate('Query', 'posts', fi.arguments || {});
    });
}
function invalidateAllEvents(cache) {
    const allFields = cache.inspectFields('Query');
    const fieldInfos = allFields.filter((info)=>info.fieldName === 'events'
    );
    fieldInfos.forEach((fi)=>{
        cache.invalidate('Query', 'events', fi.arguments || {});
    });
}
const transformToDate = (parent, _args, _cache, info)=>new Date(parent[info.fieldName])
;
const createUrqlClient = (ssrExchange, ctx)=>{
    let cookie = '';
    if ((0,_isServer__WEBPACK_IMPORTED_MODULE_6__/* .isServer */ .s)()) {
        var ref, ref1;
        cookie = ctx === null || ctx === void 0 ? void 0 : (ref = ctx.req) === null || ref === void 0 ? void 0 : (ref1 = ref.headers) === null || ref1 === void 0 ? void 0 : ref1.cookie;
    }
    console.log('cookie on platform start:', ctx);
    console.log('NEXT_PUBLIC_API_URL:', "http://localhost:4020/graphql");
    return {
        url: "http://localhost:4020/graphql",
        fetchOptions: {
            credentials: 'include',
            headers: cookie ? {
                cookie
            } : undefined
        },
        exchanges: [
            urql__WEBPACK_IMPORTED_MODULE_1__.dedupExchange,
            (0,_urql_exchange_graphcache__WEBPACK_IMPORTED_MODULE_0__.cacheExchange)({
                keys: {
                    PaginatedPosts: ()=>null
                    ,
                    PaginatedEvents: ()=>null
                    ,
                    FilteredProfiles: (data)=>data.uuid
                    ,
                    User: (data)=>data.uuid
                    ,
                    Profile: (data)=>data.uuid
                    ,
                    Friend: (data)=>data.uuid
                    ,
                    FriendshipRequest: (data)=>data.uuid
                    ,
                    Search: (data)=>data.uuid
                    ,
                    Conversation: (data)=>data.uuid
                    ,
                    Message: (data)=>data.uuid
                    ,
                    Calls: (data)=>data.profileUuid
                    ,
                    ConversationToProfile: (data)=>data.uuid
                    ,
                    PaginatedMessages: ()=>null
                },
                resolvers: {
                    Query: {
                        posts: postsCursorPagination(),
                        events: eventsCursorPagination(),
                        messages: messagesCursorPagination(),
                        eventToProfiles: filteredProfilesPagination(),
                        communities: {
                            description: '00009'
                        }
                    }
                },
                updates: {
                    Mutation: {
                        deletePost: (_result, args, cache, info)=>{
                            cache.invalidate({
                                __typename: 'Post',
                                id: args.id
                            });
                        },
                        vote: (_result, args, cache, info)=>{
                            const { postId , value  } = args;
                            const data = cache.readFragment((graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `, {
                                id: postId
                            });
                            if (data) {
                                if (data.voteStatus === value) {
                                    return;
                                }
                                const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
                                cache.writeFragment((graphql_tag__WEBPACK_IMPORTED_MODULE_2___default())`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `, {
                                    id: postId,
                                    points: newPoints,
                                    voteStatus: value
                                });
                            }
                        },
                        createPost: (_result, args, cache, info)=>{
                            invalidateAllPosts(cache);
                        // const allFields = cache.inspectFields('Query')
                        // const fieldInfos = allFields.filter(
                        //   (info) => info.fieldName === 'posts'
                        // )
                        // fieldInfos.forEach((fieldInfo) => {
                        //   console.log('start')
                        //   console.log(cache.inspectFields('Query'))
                        //   cache.invalidate('Query', 'posts', fieldInfo.arguments)
                        //   console.log(cache.inspectFields('Query'))
                        //   console.log('end')
                        // })
                        },
                        createEvent: (_result, args, cache, info)=>{
                            invalidateAllEvents(cache);
                        },
                        // createCommunity: (_result, args, cache, info) => {
                        //   invalidateAllEvents(cache)
                        // },
                        logout: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_4__/* .MeDocument */ .en
                            }, _result, ()=>({
                                    me: null
                                })
                            );
                        },
                        login: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_4__/* .MeDocument */ .en
                            }, _result, (result, query)=>{
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.login.user
                                    };
                                }
                            });
                            invalidateAllPosts(cache);
                        },
                        register: (_result, args, cache, info)=>{
                            (0,_betterUpdateQuery__WEBPACK_IMPORTED_MODULE_7__/* .betterUpdateQuery */ .U)(cache, {
                                query: _generated_graphql__WEBPACK_IMPORTED_MODULE_4__/* .MeDocument */ .en
                            }, _result, (result, query)=>{
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user
                                    };
                                }
                            });
                        }
                    }
                }
            }),
            errorExchange,
            ssrExchange,
            urql__WEBPACK_IMPORTED_MODULE_1__.fetchExchange, 
        ]
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7786:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ isServer)
/* harmony export */ });
const isServer = ()=>"undefined" === 'undefined'
;


/***/ })

};
;