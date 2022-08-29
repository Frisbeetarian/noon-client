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

          conversationObject.conversee = converseeObject
          conversationsObject.push(conversationObject)
        })
      )

      chat.conversations = conversationsObject
    },
    addMessageToActiveConversation: (chat, action) => {
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

      // chat.conversations.find((conversation) => {
      //
      // })
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
    setActiveConversation: (chat, action) => {
      if (action.payload === null) {
        chat.activeConversation = null
        return
      }

      let conversationObject = { ...action.payload.conversation }
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

export const {
  setConversations,
  setActiveConversee,
  setActiveConversation,
  addMessageToActiveConversation,
  addMessageToConversationByConversationUuid,
} = slice.actions
export default slice.reducer
