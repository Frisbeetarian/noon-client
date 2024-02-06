import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '../../utils/types'

export const conversationsApiSlice = createApi({
  reducerPath: 'api/conversations',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/conversations',
    }),
    getMessagesForConversation: builder.query<Message[], string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
    }),
  }),
})

export const { useGetConversationsQuery } = conversationsApiSlice
