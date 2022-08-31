import { createSlice, current } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { getSocket } from './sockets'
import { uuid } from 'uuidv4'

const slice = createSlice({
  name: 'chat',
  initialState: {
    conversations: {},
    activeConversee: null,
    activeConversation: null,
    conversationsThatHaveUnreadMessagesForProfile: [],
  },
  reducers: {
    setConversations: (chat, action) => {
      const conversationsObject = []

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

          conversationObject.conversee = converseeObject
          conversationsObject.push(conversationObject)
        })
      )

      chat.conversations = conversationsObject
    },
    addMessageToActiveConversation: (chat, action) => {
      let conversationUuid = action.payload.conversationUuid

      if (chat.activeConversation) {
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

      conversationFromStack.unreadMessages = 0
      conversationFromStack.profileThatHasUnreadMessages = []

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

      chat.activeConversation = conversationObject
    },
  },
})

export const getConversations = createSelector(
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
} = slice.actions
export default slice.reducer
