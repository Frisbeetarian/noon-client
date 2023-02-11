import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { Conversation, Message, Profile, Sender } from '../generated/graphql'

// import { Conversation, Message, Profile } from '../utils/types'

interface ChatState {
  conversations: Conversation[] | null | undefined
  activeConversee: Profile | null
  activeConversation: Conversation | null | undefined
  conversationController: {
    conversee: Sender | null | undefined
  }
  conversationsThatHaveUnreadMessagesForProfile: string[]
  activeConversationSet: boolean
  shouldPauseCheckHasMore: boolean
}

interface ConversationPayload {
  conversation?: Conversation | undefined
  conversationsToSend?: Conversation[] | null | undefined
  loggedInProfileUuid?: string | null | undefined
  conversationUuid?: string | null | undefined
  participantUuid?: string | null | undefined
}

interface MessagesPayload {
  messages: Message[]
  conversationUuid: string
  loggedInProfileUuid: string
}

interface MessagePayload {
  message: Message
  loggedInProfileUuid: string
}

interface PendingCallPayload {
  profileUuid: string
  from: 'me' | 'other'
  pendingCall: boolean
  ongoingCall: boolean
  conversationUuid: string
  fromJoin?: boolean
}

interface CancelPendingCallPayload {
  conversationUuid: string
  loggedInProfileUuid: string
}

interface DeleteMessagePayload {
  uuid: string
  content: string
  deleted: boolean
  conversationUuid: string
}

const initialState: ChatState = {
  conversations: [],
  activeConversee: null,
  activeConversation: null,
  conversationController: {
    conversee: null,
  },
  conversationsThatHaveUnreadMessagesForProfile: [],
  activeConversationSet: false,
  shouldPauseCheckHasMore: false,
}

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversationSet: (chat, action: PayloadAction<boolean>) => {
      chat.activeConversationSet = action.payload
    },
    addConversation: (chat, action: PayloadAction<ConversationPayload>) => {
      const conversationObject = { ...action.payload.conversation }

      if (conversationObject.type !== 'group') {
        chat.conversationController.conversee =
          conversationObject.profiles?.find(
            (element) => element.uuid !== action.payload.loggedInProfileUuid
          )
      }

      // if (
      //   conversation.unreadMessages !== 0 &&
      //   conversation.profileThatHasUnreadMessages ===
      //     action.payload.loggedInProfileUuid
      // ) {
      //   chat.conversationsThatHaveUnreadMessagesForProfile.push(
      //     conversation.uuid
      //   )
      // }

      // conversationObject.ongoingCall = false
      chat.conversations?.push(action.payload.conversation)
    },
    removeConversation: (
      chat,
      action: PayloadAction<{ conversationUuid: string }>
    ) => {
      chat.conversations = chat.conversations?.filter(
        (conversation) => conversation.uuid != action.payload.conversationUuid
      )
    },
    removeParticipantFromGroup: (
      chat,
      action: PayloadAction<ConversationPayload>
    ) => {
      const participantUuid = action.payload.participantUuid

      const conversation = chat.conversations?.find(
        (conversation) => conversation.uuid === action.payload.conversationUuid
      )

      if (conversation) {
        const profiles = [...conversation.profiles]
        profiles.splice(profiles.indexOf(participantUuid), 1)
        conversation.profiles = profiles

        if (
          chat.activeConversation &&
          chat.activeConversation.uuid === action.payload.conversationUuid
        ) {
          let activeConversationProfiles = [...chat.activeConversation.profiles]

          activeConversationProfiles = activeConversationProfiles.filter(
            (profile) => profile.uuid != action.payload.participantUuid
          )

          chat.activeConversation.profiles = activeConversationProfiles
        }
      }
    },
    setConversations: (chat, action: PayloadAction<ConversationPayload>) => {
      const conversationsArray: Conversation[] = []

      // Promise.all(
      action.payload.conversationsToSend?.map((conversation) => {
        const conversationObject = { ...conversation }

        const converseeObject = conversationObject.profiles.find(
          (element) => element.uuid !== action.payload.loggedInProfileUuid
        )

        const callObject = conversationObject.calls?.find(
          (call) => call.profileUuid === action.payload.loggedInProfileUuid
        )

        if (
          conversation.unreadMessages !== 0 &&
          conversation.profileThatHasUnreadMessages ===
            action.payload.loggedInProfileUuid
        ) {
          chat.conversationsThatHaveUnreadMessagesForProfile.push(
            conversation.uuid
          )
        }

        if (conversationObject.calls && callObject) {
          conversationObject.pendingCall = callObject.pendingCall
          conversationObject.ongoingCall = callObject.ongoingCall
        }

        // conversationObject.conversee = converseeObject
        chat.conversationController.conversee = converseeObject
        conversationsArray.push(conversationObject)
      })
      // )

      chat.conversations = conversationsArray
    },
    addMessagesToConversation: (
      chat,
      action: PayloadAction<MessagesPayload>
    ) => {
      const conversationUuid = action.payload.conversationUuid
      const messages = action.payload.messages
      const loggedInProfileUuid = action.payload.loggedInProfileUuid

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        const tempMessages = [...chat.activeConversation.messages]

        Promise.all(
          messages.map((message) => {
            if (message.sender.uuid === loggedInProfileUuid) {
              message = { ...message, from: 'me' }
            } else {
              message = { ...message, from: 'other' }
            }

            tempMessages.push(message)
          })
        )

        const sortedMessages = tempMessages.sort(
          (a, b) => b.createdAt - a.createdAt
        )

        const conversation = chat.conversations?.find(
          (conversation) => conversation.uuid === conversationUuid
        )

        if (conversation) {
          conversation.messages = [...sortedMessages]
          chat.activeConversation.messages = sortedMessages
        }
      }
    },
    addMessageToActiveConversation: (
      chat,
      action: PayloadAction<MessagePayload>
    ) => {
      const conversationUuid = action.payload.message.conversationUuid

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        chat.activeConversation.messages.unshift({
          uuid: action.payload.message.uuid,
          content: action.payload.message.content,
          conversationUuid: action.payload.message.conversationUuid,
          // updatedAt: new Date().getTime(),
          // createdAt: new Date().getTime(),
          updatedAt: action.payload.message.updatedAt,
          createdAt: action.payload.message.createdAt,
          from: action.payload.message.from,
          type: action.payload.message.type,
          src: action.payload.message.src,
          deleted: action.payload.message.deleted,
          sender: {
            uuid: action.payload.message.sender?.uuid,
            username: action.payload.message.sender?.username,
          },
        })

        const conversationn = chat.conversations?.find(
          (conversation) => conversation.uuid === conversationUuid
        )
        if (conversationn) {
          conversationn.messages.unshift({
            uuid: action.payload.message.uuid,
            content: action.payload.message.content,
            conversationUuid: action.payload.message.conversationUuid,
            updatedAt: new Date().toString(),
            createdAt: new Date().toString(),
            from: action.payload.message.from,
            type: action.payload.message.type,
            src: action.payload.message.src,
            deleted: action.payload.message.deleted,
            sender: {
              uuid: action.payload.message.sender?.uuid,
              username: action.payload.message.sender?.username,
            },
          })
        }
      } else {
        const conversationn = chat.conversations?.find(
          (conversation) => conversation.uuid === conversationUuid
        )
        if (conversationn) {
          conversationn.unreadMessages = conversationn.unreadMessages + 1
          conversationn.profileThatHasUnreadMessages =
            action.payload.loggedInProfileUuid

          if (
            chat.conversationsThatHaveUnreadMessagesForProfile[
              conversationUuid
            ] == undefined
          ) {
            chat.conversationsThatHaveUnreadMessagesForProfile.push(
              conversationUuid
            )
          }

          conversationn.messages.unshift({
            uuid: action.payload.message.uuid,
            content: action.payload.message.content,
            conversationUuid: action.payload.message.conversationUuid,
            updatedAt: action.payload.message.updatedAt,
            createdAt: action.payload.message.createdAt,
            from: action.payload.message.from,
            type: action.payload.message.type,
            src: action.payload.message.src,
            deleted: action.payload.message.deleted,
            sender: {
              uuid: action.payload.message.sender?.uuid,
              username: action.payload.message.sender?.username,
            },
          })
        }
      }
    },
    setActiveConversee: (chat, action: PayloadAction<Profile | null>) => {
      chat.activeConversee = action.payload
    },
    clearUnreadMessagesForConversationInStore: (chat) => {
      const conversation = chat.activeConversation

      if (conversation) {
        conversation.unreadMessages = 0
        conversation.profileThatHasUnreadMessages = []
      }
    },
    setActiveConversationHasMoreMessages: (
      chat,
      action: PayloadAction<boolean>
    ) => {
      if (chat.activeConversation)
        chat.activeConversation.hasMore = action.payload
    },
    setShouldPauseCheckHasMore: (chat, action: PayloadAction<boolean>) => {
      chat.shouldPauseCheckHasMore = action.payload
    },
    setActiveConversation: (
      chat,
      action: PayloadAction<ConversationPayload | null>
    ) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      const index = chat.conversationsThatHaveUnreadMessagesForProfile.indexOf(
        action.payload.conversation?.uuid as string
      )

      if (index > -1) {
        chat.conversationsThatHaveUnreadMessagesForProfile.splice(index, 1)
      }

      // chat.conversationsThatHaveUnreadMessagesForProfile =
      //   chat.conversationsThatHaveUnreadMessagesForProfile.filter(
      //     (conversationUuid) =>
      //       conversationUuid === action.payload.conversation.uuid
      //   )

      const conversationObject = { ...action.payload.conversation }
      // conversationObject.unreadMessages = 0
      // conversationObject.profileThatHasUnreadMessages = []

      const conversationFromStack = chat.conversations?.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      const callInConversationStack = conversationFromStack?.calls.find(
        (call) => call.profileUuid === action.payload?.loggedInProfileUuid
      )

      // let callInActiveConversation = conversationObject.calls.find(
      //   (call) => call.profileUuid === action.payload.loggedInProfileUuid
      // )

      conversationObject.pendingCall = callInConversationStack?.pendingCall
      if (conversationFromStack) {
        conversationFromStack.unreadMessages = 0
        conversationFromStack.profileThatHasUnreadMessages = null
        conversationFromStack.ongoingCall = false
      }

      if (!action.payload.conversation?.messages) {
        conversationObject.messages = []
      } else {
        const messagesArray: Message[] = []

        action.payload.conversation?.messages.map((message) => {
          const messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid === action.payload?.loggedInProfileUuid
              ? 'me'
              : 'other'

          messagesArray.push(messageObject)
        })

        const sortedMessage = messagesArray.sort(
          (a, b) => b.createdAt - a.createdAt
        )

        conversationObject.messages = [...sortedMessage]
      }

      if (!chat['activeConversation']) {
        chat['activeConversation'] = null
      }

      if (chat.activeConversation) {
        chat.activeConversation = conversationObject
      }
    },
    setOngoingCall: (
      chat,
      action: PayloadAction<{
        uuid: string
        initiator: {
          uuid: string
          username: string
        }
      }>
    ) => {
      const activeConversationObject = { ...chat.activeConversation }
      activeConversationObject.ongoingCall = true

      if (chat.activeConversation) {
        chat.activeConversation = { ...activeConversationObject }
      }
    },
    setActiveGroupInStore: (
      chat,
      action: PayloadAction<ConversationPayload | null>
    ) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      const conversationObject = { ...action.payload.conversation }
      // conversationObject.unreadMessages = 0
      // conversationObject.profileThatHasUnreadMessages = []

      const conversationFromStack = chat.conversations?.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      if (conversationFromStack) {
        conversationFromStack.unreadMessages = 0
        conversationFromStack.profileThatHasUnreadMessages = null
        conversationFromStack.ongoingCall = false
      }

      if (!action.payload.conversation?.messages) {
        conversationObject.messages = []
      } else {
        const messagesArray: Message[] = []

        action.payload.conversation?.messages.map((message) => {
          const messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid == action.payload.loggedInProfileUuid
              ? 'me'
              : 'other'

          messagesArray.push(messageObject)
        })

        const sortedMessage = messagesArray.sort(
          (a, b) => b.createdAt - a.createdAt
        )

        conversationObject.messages = [...sortedMessage]
      }

      if (!chat['activeConversation']) {
        chat['activeConversation'] = null
      }

      if (chat.activeConversation) {
        chat.activeConversation = conversationObject
      }
    },
    setPendingCall: (chat, action: PayloadAction<PendingCallPayload>) => {
      try {
        if (
          chat.activeConversation &&
          chat.activeConversation.uuid === action.payload?.conversationUuid &&
          action.payload.profileUuid !== action.payload.from
        ) {
          const activeConversationObject = { ...chat.activeConversation }
          activeConversationObject.pendingCall = action.payload.pendingCall

          const callInActiveConversationObject =
            activeConversationObject.calls.find(
              (call) => call.profileUuid === action.payload.profileUuid
            )

          if (callInActiveConversationObject)
            callInActiveConversationObject.pendingCall =
              action.payload.pendingCall

          chat.activeConversation = { ...activeConversationObject }
        }

        const conversationInList = chat.conversations?.find(
          (conversation) =>
            conversation.uuid === action.payload?.conversationUuid
        )
        if (conversationInList) {
          const callInConversationObject = conversationInList.calls.find(
            (call) => call.profileUuid === action.payload.profileUuid
          )

          if (!action.payload.fromJoin && callInConversationObject) {
            callInConversationObject.pendingCall = action.payload.pendingCall
          }

          conversationInList.pendingCall = action.payload.pendingCall
        }
      } catch (e) {
        console.log('error:', e)
      }
    },
    cancelPendingCall: (
      chat,
      action: PayloadAction<CancelPendingCallPayload>
    ) => {
      if (chat.activeConversation) {
        const activeConversationObject = { ...chat.activeConversation }

        const callInActiveConversation = activeConversationObject.calls.find(
          (call) => call.profileUuid === action.payload.loggedInProfileUuid
        )

        if (callInActiveConversation)
          callInActiveConversation.pendingCall = false

        activeConversationObject.pendingCall = false
        activeConversationObject.pendingCallProfile = null
        chat.activeConversation = { ...activeConversationObject }
      }

      const conversationInList = chat.conversations?.find(
        (conversation) => conversation.uuid === action.payload.conversationUuid
      )

      if (conversationInList) {
        const callInConversationInList = conversationInList.calls.find(
          (call) => call.profileUuid === action.payload.loggedInProfileUuid
        )

        if (callInConversationInList)
          callInConversationInList.pendingCall = false

        conversationInList.pendingCall = false
        conversationInList.pendingCallProfile = null
      }
    },
    deleteMessageInStore: (
      chat,
      action: PayloadAction<DeleteMessagePayload>
    ) => {
      try {
        const conversation = chat.conversations?.find(
          (conversation) =>
            conversation.uuid === action.payload.conversationUuid
        )

        if (conversation) {
          const messageInConversation = conversation.messages.find(
            (message) => message.uuid === action.payload.uuid
          )

          if (messageInConversation) {
            messageInConversation.deleted = action.payload.deleted
            messageInConversation.content = action.payload.content
          }
        }

        if (chat.activeConversation) {
          const messageInActiveConversation =
            chat.activeConversation.messages.find(
              (message) => message.uuid === action.payload.uuid
            )

          if (messageInActiveConversation) {
            messageInActiveConversation.deleted = action.payload.deleted
            messageInActiveConversation.content = action.payload.content
          }
        }
        // messageInConversation = { ...action.payload.message }
      } catch (e) {
        console.log('error:', e)
      }
    },
  },
})

export const getConversations = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.conversations
)

export const getSortedConversations = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.conversations
)

export const getActiveConversee = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.activeConversee
)

export const getActiveConversation = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.activeConversation
)

export const getActiveConversationSet = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.activeConversationSet
)

export const getShouldPauseCheckHasMore = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.shouldPauseCheckHasMore
)

export const getConversationsThatHaveUnreadMessagesForProfile = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.conversationsThatHaveUnreadMessagesForProfile
)

export const {
  addConversation,
  removeConversation,
  setConversations,
  setActiveConversee,
  setActiveConversation,
  addMessageToActiveConversation,
  addMessagesToConversation,
  clearUnreadMessagesForConversationInStore,
  setActiveConversationSet,
  setOngoingCall,
  setPendingCall,
  cancelPendingCall,
  setActiveConversationHasMoreMessages,
  setShouldPauseCheckHasMore,
  setActiveGroupInStore,
  removeParticipantFromGroup,
  deleteMessageInStore,
} = slice.actions

export default slice.reducer
