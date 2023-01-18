import { createSlice, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { getSocket } from './sockets'
import { uuid } from 'uuidv4'

const slice = createSlice({
  name: 'chat',
  initialState: {
    conversations: null,
    activeConversee: null,
    activeConversation: null,
    conversationsThatHaveUnreadMessagesForProfile: [],
    activeConversationSet: false,
    shouldPauseCheckHasMore: false,
  },
  reducers: {
    setActiveConversationSet: (chat, action) => {
      chat.activeConversationSet = action.payload
    },
    addConversation: (chat, action) => {
      let conversationObject = { ...action.payload.conversation }
      console.log('conversation object:', conversationObject)

      if (conversationObject.type !== 'group') {
        conversationObject.conversee = conversationObject.profiles?.find(
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
      chat.conversations.push(conversationObject)
    },
    removeConversation: (chat, action) => {
      chat.conversations = chat.conversations.filter(
        (conversation) => conversation.uuid != action.payload.conversationUuid
      )
    },
    removeParticipantFromGroup: (chat, action) => {
      const conversation = chat.conversations.find(
        (conversation) => conversation.uuid === action.payload.conversationUuid
      )

      const profiles = [...conversation.profiles]
      profiles.splice(profiles.indexOf(action.payload.participantUuid), 1)
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
    },
    setConversations: (chat, action) => {
      const conversationsArray = []

      Promise.all(
        action.payload.conversationsToSend.map((conversation) => {
          let conversationObject = { ...conversation }

          const converseeObject = conversationObject.profiles.find(
            (element) => element.uuid !== action.payload.loggedInProfileUuid
          )

          console.log('action.payload.loggedInProfileUuid:', action.payload)

          console.log('conversee object:', converseeObject)
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

          if (conversationObject.call) {
            conversationObject.pendingCall = callObject.pendingCall
            conversationObject.ongoingCall = callObject.ongoingCall
          }

          conversationObject.conversee = converseeObject
          conversationsArray.push(conversationObject)
        })
      )

      chat.conversations = conversationsArray
    },
    addMessagesToConversation: (chat, action) => {
      const conversationUuid = action.payload.conversationUuid
      let messages = action.payload.messages
      const loggedInProfileUuid =
        action.payload.loggedInUser.user?.profile?.uuid

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

        let conversation = chat.conversations.find(
          (conversation) => conversation.uuid === conversationUuid
        )

        conversation.messages = [...sortedMessages]
        chat.activeConversation.messages = sortedMessages
      }
    },
    addMessageToActiveConversation: (chat, action) => {
      let conversationUuid = action.payload.conversationUuid

      console.log('chat active converastion:', chat.activeConversation)
      console.log('payload.conversationUuid:', action.payload.conversationUuid)
      console.log('action.payload:', action.payload)

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        chat.activeConversation.messages.unshift({
          uuid: action.payload.uuid,
          content: action.payload.message,
          updatedAt: new Date().getTime(),
          createdAt: new Date().getTime(),
          from: action.payload.from,
          type: action.payload.type,
          src: action.payload.src,
          deleted: action.payload.deleted,
          sender: {
            uuid: action.payload.sender?.uuid,
            username: action.payload.sender?.username,
          },
        })

        const conversationn = chat.conversations.find(
          (conversation) => conversation.uuid === conversationUuid
        )

        conversationn.messages.unshift({
          uuid: action.payload.uuid,
          content: action.payload.message,
          // updatedAt: action.payload.updatedAt,
          // createdAt: action.payload.createdAt,
          updatedAt: new Date().getTime(),
          createdAt: new Date().getTime(),
          type: action.payload.type,
          src: action.payload.src,
          deleted: action.payload.deleted,
          sender: {
            uuid: action.payload.sender?.uuid,
            username: action.payload.sender?.username,
          },
        })
      } else {
        const conversationn = chat.conversations.find(
          (conversation) => conversation.uuid === conversationUuid
        )

        conversationn.unreadMessages = conversationn.unreadMessages + 1
        conversationn.profileThatHasUnreadMessages =
          action.payload.loggedInProfile.uuid

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
          updatedAt: new Date().getTime(),
          createdAt: new Date().getTime(),
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
    },
    addMessageToConversationByConversationUuid: (chat, action) => {
      let conversationUuid = action.payload.conversationUuid
      let message = action.payload.message

      const conversationn = chat.conversations.find(
        (conversation) => conversation.uuid === conversationUuid
      )

      conversationn.messages.push({
        uuid: uuid(),
        content: action.payload.message,
        updatedAt: new Date(),
        createdAt: new Date(),
        from: action.payload.from,
        sender: {
          uuid: action.payload.loggedInUser.uuid,
          username: action.payload.loggedInUser.username,
        },
      })
    },
    setActiveConversee: (chat, action) => {
      chat.activeConversee = action.payload
    },
    clearUnreadMessagesForConversationInStore: (chat, action) => {
      const conversation = chat.activeConversation
      conversation.unreadMessages = 0
      conversation.profileThatHasUnreadMessages = []
    },
    setActiveConversationHasMoreMessages: (chat, action) => {
      chat.activeConversation.hasMore = action.payload
    },
    setShouldPauseCheckHasMore: (chat, action) => {
      chat.shouldPauseCheckHasMore = action.payload
    },
    setActiveConversation: (chat, action) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      let index = chat.conversationsThatHaveUnreadMessagesForProfile.indexOf(
        action.payload.conversation.uuid
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

      const conversationFromStack = chat.conversations.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      let callInConversationStack = conversationFromStack.calls.find(
        (call) => call.profileUuid === action.payload.loggedInProfileUuid
      )

      // let callInActiveConversation = conversationObject.calls.find(
      //   (call) => call.profileUuid === action.payload.loggedInProfileUuid
      // )

      conversationObject.pendingCall = callInConversationStack.pendingCall
      conversationFromStack.unreadMessages = 0
      conversationFromStack.profileThatHasUnreadMessages = []
      conversationFromStack.ongoingCall = false

      if (!action.payload.conversation.messages) {
        conversationObject.messages = []
      } else {
        let messagesArray = []

        action.payload.conversation.messages.map((message) => {
          let messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid == action.payload.loggedInProfileUuid
              ? 'me'
              : 'computer'

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

      chat.activeConversation = conversationObject
    },
    setOngoingCall: (chat, action) => {
      let activeConversationObject = { ...chat.activeConversation }
      activeConversationObject.ongoingCall = action.payload
      chat.activeConversation = { ...activeConversationObject }
    },
    setActiveGroupInStore: (chat, action) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      let conversationObject = { ...action.payload.conversation }
      // conversationObject.unreadMessages = 0
      // conversationObject.profileThatHasUnreadMessages = []

      const conversationFromStack = chat.conversations.find(
        (conversation) => conversation.uuid === conversationObject.uuid
      )

      conversationFromStack.unreadMessages = 0
      conversationFromStack.profileThatHasUnreadMessages = []
      conversationFromStack.ongoingCall = false

      if (!action.payload.conversation.messages) {
        conversationObject.messages = []
      } else {
        let messagesArray = []

        action.payload.conversation.messages.map((message) => {
          let messageObject = { ...message }

          messageObject.from =
            messageObject.sender.uuid == action.payload.loggedInProfileUuid
              ? 'me'
              : 'computer'

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

      chat.activeConversation = conversationObject
    },
    setPendingCall: (chat, action) => {
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

          callInActiveConversationObject.pendingCall =
            action.payload.pendingCall

          chat.activeConversation = { ...activeConversationObject }
        }

        const conversationInList = chat.conversations.find(
          (conversation) =>
            conversation.uuid === action.payload?.conversationUuid
        )

        let callInConversationObject = conversationInList.calls.find(
          (call) => call.profileUuid === action.payload.profileUuid
        )

        if (!action.payload.fromJoin) {
          callInConversationObject.pendingCall = action.payload.pendingCall
        }

        conversationInList.pendingCall = action.payload.pendingCall
      } catch (e) {
        console.log('error:', e)
      }
    },
    cancelPendingCall: (chat, action) => {
      if (chat.activeConversation) {
        let activeConversationObject = { ...chat.activeConversation }

        let callInActiveConversation = activeConversationObject.calls.find(
          (call) => call.profileUuid === action.payload.loggedInProfileUuid
        )

        callInActiveConversation.pendingCall = false
        activeConversationObject.pendingCall = false
        activeConversationObject.pendingCallProfile = null
        chat.activeConversation = { ...activeConversationObject }
      }

      let conversationInList = chat.conversations.find(
        (conversation) => conversation.uuid === action.payload.conversationUuid
      )

      let callInConversationInList = conversationInList.calls.find(
        (call) => call.profileUuid === action.payload.loggedInProfileUuid
      )

      callInConversationInList.pendingCall = false
      conversationInList.pendingCall = false
      conversationInList.pendingCallProfile = null
    },
    deleteMessageInStore: (chat, action) => {
      console.log('message in update message:', action.payload)

      try {
        let conversation = chat.conversations.find(
          (conversation) =>
            conversation.uuid === action.payload.conversationUuid
        )

        let messageInConversation = conversation.messages.find(
          (message) => message.uuid === action.payload.uuid
        )

        console.log('message in update message:', action.payload.message)
        messageInConversation.deleted = action.payload.deleted
        messageInConversation.content = action.payload.content

        if (chat.activeConversation) {
          let messageInActiveConversation =
            chat.activeConversation.messages.find(
              (message) => message.uuid === action.payload.uuid
            )

          messageInActiveConversation.deleted = action.payload.deleted
          messageInActiveConversation.content = action.payload.content
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
  addMessageToConversationByConversationUuid,
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
