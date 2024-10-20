import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const conversationsApiSlice = createApi({
  reducerPath: 'api/conversations',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Conversations', 'Messages'],
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/conversations',
      providesTags: (result, _, __) =>
        result
          ? [
              ...result.map(({ uuid }) => ({
                type: 'Conversations',
                id: uuid,
              })),
              'Conversations',
            ]
          : ['Conversations'],
    }),
    getMessagesForConversation: builder.query({
      query: ({ conversationUuid, limit = 20, cursor }) => {
        let queryString = `/conversations/${conversationUuid}/messages?limit=${limit}`;
        if (cursor) {
          queryString += `&cursor=${cursor}`;
        }
        return queryString;
      },
      providesTags: (_, __, arg) => [
        { type: 'Messages', id: arg.conversationUuid },
      ],
    }),
  }),
});

export const { useGetConversationsQuery, useGetMessagesForConversationQuery } =
  conversationsApiSlice;
