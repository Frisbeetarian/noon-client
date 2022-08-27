import { createSlice } from '@reduxjs/toolkit'
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
      // const conversee = action.payload.conversations.profiles.find(
      //   (element) => element.uuid != action.payload.loggedInProfileUuid
      // )
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
        from:
          messageObject.sender.uuid ==
          action.payload.loggedInUser.user.profile.uuid
            ? 'me'
            : 'computer',
        sender: {
          uuid: action.payload.loggedInUser.user.profile.uuid,
          username: action.payload.loggedInUser.user.profile.username,
        },
      })
    },
    setActiveConversee: (chat, action) => {
      console.log('set active conversee uuid:', action.payload)
      chat.activeConversee = action.payload
    },
    setActiveConversation: (chat, action) => {
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

      conversationObject.messages = [...messagesArray]

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
} = slice.actions
export default slice.reducer
