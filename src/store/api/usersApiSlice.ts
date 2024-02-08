import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApiSlice = createApi({
  reducerPath: 'api/users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me',
    }),
  }),
})

export const { useGetMeQuery } = usersApiSlice
