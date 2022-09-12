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
  },
  reducers: {
    setActiveConversationSet: (chat, action) => {
      chat.activeConversationSet = action.payload
    },
    setConversations: (chat, action) => {
      const conversationsArray = []

      Promise.all(
        action.payload.conversationsToSend.map((conversation) => {
          let conversationObject = { ...conversation }

          let converseeObject = conversationObject.profiles.find(
            (element) => element.uuid != action.payload.loggedInProfileUuid
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

          // conversationObject.ongoingCall = false

          conversationObject.conversee = converseeObject
          conversationsArray.push(conversationObject)
        })
      )

      chat.conversations = conversationsArray
    },
    addMessageToActiveConversation: (chat, action) => {
      let conversationUuid = action.payload.conversationUuid

      if (
        chat.activeConversation &&
        chat.activeConversation.uuid === conversationUuid
      ) {
        chat.activeConversation.messages.push({
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
            uuid: action.payload.loggedInUser?.user?.profile?.uuid,
            username: action.payload.loggedInUser?.user?.profile?.username,
          },
        })
      } else {
        const conversationn = chat.conversations.find(
          (conversation) => conversation.uuid === conversationUuid
        )

        console.log('conversationUuid:', conversationUuid)
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
        console.log('conversationn:', conversationn)

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
      }
    },
    addMessageToConversationByConversationUuid: (chat, action) => {
      let conversationUuid = action.payload.conversationUuid
      let message = action.payload.message

      const conversationn = chat.conversations.find(
        (conversation) => conversation.uuid === conversationUuid
      )

      console.log('conversationUuid:', conversationUuid)

      // let item = chat.conversations.map((conversation) => {
      //   if (conversation.uuid === conversationUuid) return conversation
      // })

      // const target_copy = Object.assign({}, item)
      console.log('conversation in store:', current(conversationn))
      // const conversationObject = { ...conversation }
      // current(conversationn.messages.push(message))
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
      console.log('set active conversee uuid:', action.payload)
      chat.activeConversee = action.payload
    },
    clearUnreadMessagesForConversationInStore: (chat, action) => {
      const conversation = chat.activeConversation

      conversation.unreadMessages = 0
      conversation.profileThatHasUnreadMessages = []
    },
    setActiveConversation: (chat, action) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      // if (action.payload) {
      let index = chat.conversationsThatHaveUnreadMessagesForProfile.indexOf(
        action.payload.conversation.uuid
      )

      if (index > -1) {
        chat.conversationsThatHaveUnreadMessagesForProfile.splice(index, 1)
      }
      // }

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

      conversationFromStack.unreadMessages = 0
      conversationFromStack.profileThatHasUnreadMessages = []
      conversationFromStack.ongoingCall = false

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
        (a, b) => a.createdAt - b.createdAt
      )

      conversationObject.messages = [...sortedMessage]
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
    setPendingCall: (chat, action) => {
      let activeConversationObject = { ...chat.activeConversation }
      activeConversationObject.pendingCall = true
      activeConversationObject.pendingCallProfile = {
        uuid: action.payload?.initiator?.uuid,
        username: action.payload?.initiator?.username,
        updatedAt: new Date(),
        createdAt: new Date(),
      }
      chat.activeConversation = { ...activeConversationObject }
    },
    cancelPendingCall: (chat) => {
      let activeConversationObject = { ...chat.activeConversation }
      activeConversationObject.pendingCall = false
      activeConversationObject.pendingCallProfile = null
      chat.activeConversation = { ...activeConversationObject }
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

export const getConversationsThatHaveUnreadMessagesForProfile = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.conversationsThatHaveUnreadMessagesForProfile
)

export const {
  setConversations,
  setActiveConversee,
  setActiveConversation,
  addMessageToActiveConversation,
  addMessageToConversationByConversationUuid,
  clearUnreadMessagesForConversationInStore,
  setActiveConversationSet,
  setOngoingCall,
  setPendingCall,
  cancelPendingCall,
} = slice.actions
export default slice.reducer
