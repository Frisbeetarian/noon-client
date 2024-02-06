import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '../../utils/types'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_URL }),
  endpoints: (builder) => ({
    getMessagesForConversation: builder.query<Message[], string>({
      query: (conversationUuid) => `messages/${conversationUuid}`,
    }),

    // Add other endpoints here
  }),
})

export const { useGetMessagesForConversationQuery } = apiSlice
