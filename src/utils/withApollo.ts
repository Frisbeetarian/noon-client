import { withApollo as createWithApollo } from 'next-apollo'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'
import { createUploadLink } from 'apollo-upload-client'

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: 'include',
      headers: {
        cookie:
          (typeof window === 'undefined'
            ? ctx?.req?.headers.cookie
            : undefined) || '',
      },
    }),
  })

export const withApollo = createWithApollo(createClient)
