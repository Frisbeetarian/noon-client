import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const conversationsApiSlice = createApi({
  reducerPath: 'api/conversations',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4020/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/conversations',
    }),
  }),
})

export const { useGetConversationsQuery } = conversationsApiSlice
