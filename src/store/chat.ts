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

// interface MessagePayload {
//   uuid: string
//   message: string
//   from: 'me' | 'other' | null
//   type: string
//   src: string
//   conversationUuid: string
//   deleted?: boolean
//   sender: ProfileInMessage
//   loggedInProfileUuid: string
//   updatedAt: string
//   createdAt: string
// }

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
      let conversationObject = { ...action.payload.conversation }

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
        let conversationObject = { ...conversation }

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

        conversationObject.conversee = converseeObject
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
      let messages = action.payload.messages
      const loggedInProfileUuid = action.payload.loggedInProfileUuid

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        let tempMessages = [...chat.activeConversation.messages]

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

        let sortedMessages = tempMessages.sort(
          (a, b) => b.createdAt - a.createdAt
        )

        let conversation = chat.conversations?.find(
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
      let conversationUuid = action.payload.conversationUuid

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        chat.activeConversation.messages.unshift({
          uuid: action.payload.uuid,
          content: action.payload.message,
          // updatedAt: new Date().getTime(),
          // createdAt: new Date().getTime(),
          updatedAt: new Date(),
          createdAt: new Date(),
          from: action.payload.from,
          type: action.payload.type,
          src: action.payload.src,
          deleted: action.payload.deleted,
          sender: {
            uuid: action.payload.sender?.uuid,
            username: action.payload.sender?.username,
          },
        })

        const conversationn = chat.conversations?.find(
          (conversation) => conversation.uuid === conversationUuid
        )
        if (conversationn) {
          conversationn.messages.unshift({
            uuid: action.payload.uuid,
            content: action.payload.message,
            updatedAt: new Date(),
            createdAt: new Date(),
            from: action.payload.from,
            type: action.payload.type,
            src: action.payload.src,
            deleted: action.payload.deleted,
            sender: {
              uuid: action.payload.sender?.uuid,
              username: action.payload.sender?.username,
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
            uuid: action.payload.uuid,
            content: action.payload.message,
            updatedAt: new Date(),
            createdAt: new Date(),
            from: action.payload.from,
            type: action.payload.type,
            src: action.payload.src,
            deleted: action.payload.deleted,
            sender: {
              uuid: action.payload.sender?.uuid,
              username: action.payload.sender?.username,
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

      let index = chat.conversationsThatHaveUnreadMessagesForProfile.indexOf(
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

      let conversationObject = { ...action.payload.conversation }
      // conversationObject.unreadMessages = 0
      // conversationObject.profileThatHasUnreadMessages = []

      const conversationFromStack = chat.conversations?.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      let callInConversationStack = conversationFromStack?.calls.find(
        (call) => call.profileUuid === action.payload.loggedInProfileUuid
      )

      // let callInActiveConversation = conversationObject.calls.find(
      //   (call) => call.profileUuid === action.payload.loggedInProfileUuid
      // )

      conversationObject.pendingCall = callInConversationStack?.pendingCall
      if (conversationFromStack) {
        conversationFromStack.unreadMessages = 0
        conversationFromStack.profileThatHasUnreadMessages = []
        conversationFromStack.ongoingCall = false
      }

      if (!action.payload.conversation?.messages) {
        conversationObject.messages = []
      } else {
        let messagesArray: Message[] = []

        action.payload.conversation?.messages.map((message) => {
          let messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid === action.payload.loggedInProfileUuid
              ? 'me'
              : 'other'

          messagesArray.push(messageObject)
        })

        let sortedMessage = messagesArray.sort(
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
    setOngoingCall: (chat, action: PayloadAction<boolean>) => {
      let activeConversationObject = { ...chat.activeConversation }
      activeConversationObject.ongoingCall = action.payload

      if (chat.activeConversation) {
        chat.activeConversation = { ...activeConversationObject }
      }
    },
    setActiveGroupInStore: (
      chat,
      action: PayloadAction<ConversationPayload>
    ) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      let conversationObject = { ...action.payload.conversation }
      // conversationObject.unreadMessages = 0
      // conversationObject.profileThatHasUnreadMessages = []

      const conversationFromStack = chat.conversations?.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      if (conversationFromStack) {
        conversationFromStack.unreadMessages = 0
        conversationFromStack.profileThatHasUnreadMessages = []
        conversationFromStack.ongoingCall = false
      }

      if (!action.payload.conversation?.messages) {
        conversationObject.messages = []
      } else {
        let messagesArray: Message[] = []

        action.payload.conversation?.messages.map((message) => {
          let messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid == action.payload.loggedInProfileUuid
              ? 'me'
              : 'other'

          messagesArray.push(messageObject)
        })

        let sortedMessage = messagesArray.sort(
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
          let activeConversationObject = { ...chat.activeConversation }
          activeConversationObject.pendingCall = action.payload.pendingCall

          let callInActiveConversationObject =
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
          let callInConversationObject = conversationInList.calls.find(
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
        let activeConversationObject = { ...chat.activeConversation }

        let callInActiveConversation = activeConversationObject.calls.find(
          (call) => call.profileUuid === action.payload.loggedInProfileUuid
        )

        if (callInActiveConversation)
          callInActiveConversation.pendingCall = false

        activeConversationObject.pendingCall = false
        activeConversationObject.pendingCallProfile = null
        chat.activeConversation = { ...activeConversationObject }
      }

      let conversationInList = chat.conversations?.find(
        (conversation) => conversation.uuid === action.payload.conversationUuid
      )

      if (conversationInList) {
        let callInConversationInList = conversationInList.calls.find(
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
        let conversation = chat.conversations?.find(
          (conversation) =>
            conversation.uuid === action.payload.conversationUuid
        )

        if (conversation) {
          let messageInConversation = conversation.messages.find(
            (message) => message.uuid === action.payload.uuid
          )

          if (messageInConversation) {
            messageInConversation.deleted = action.payload.deleted
            messageInConversation.content = action.payload.content
          }
        }

        if (chat.activeConversation) {
          let messageInActiveConversation =
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
