import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const conversationsApiSlice = createApi({
  reducerPath: 'api/conversations',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Conversations', 'Messages'],
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/conversations',
    }),
    getMessagesForConversation: builder.query({
      query: ({ conversationUuid, limit = 20, cursor }) => {
        let queryString = `/conversations/${conversationUuid}/messages?limit=${limit}`
        if (cursor) {
          queryString += `&cursor=${cursor}`
        }
        return queryString
      },
    }),
  }),
})

export const { useGetConversationsQuery, useGetMessagesForConversationQuery } =
  conversationsApiSlice
