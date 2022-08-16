import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache'
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from 'urql'
import gql from 'graphql-tag'

import { pipe, tap } from 'wonka'
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'
import Router from 'next/router'
import { fieldInfoOfKey } from '@urql/exchange-graphcache/dist/types/store'
import { isServer } from './isServer'

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error) {
          if (error?.message.includes('not authenticated')) {
            Router.replace('/login')
          }
        }
      })
    )
  }

const eventsCursorPagination = (mergeMode = 'after'): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length

    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      'events'
    )

    info.partial = !isItInTheCache

    let hasMore = true
    const results: string[] = []

    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'events') as string[]
      const _hasMore = cache.resolve(key, 'hasMore')

      if (!_hasMore) {
        hasMore = _hasMore as boolean
      }

      results.push(...data)
    })

    return {
      __typename: 'PaginatedEvents',
      hasMore,
      events: results,
    }

    // const visited = new Set()
    // let result: NullArray<string> = []
    // let prevOffset: number | null = null

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i]
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[]
    //   const currentOffset = args[cursorArgument]

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue
    //   }

    //   const tempResult: NullArray<string> = []

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j]
    //     if (visited.has(link)) continue
    //     tempResult.push(link)
    //     visited.add(link)
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult]
    //   } else {
    //     result = [...tempResult, ...result]
    //   }

    //   prevOffset = currentOffset
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs)
    // if (hasCurrentPage) {
    //   return result
    // } else if (!(info as any).store.schema) {
    //   return undefined
    // } else {
    //   info.partial = true
    //   return result
    // }
  }
}

const postsCursorPagination = (mergeMode = 'after'): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      'posts'
    )
    info.partial = !isItInTheCache

    let hasMore = true
    const results: string[] = []
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMore = cache.resolve(key, 'hasMore')

      if (!_hasMore) {
        hasMore = _hasMore as boolean
      }
      results.push(...data)
    })

    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results,
    }
  }
}

const filteredProfilesPagination = (mergeMode = 'after'): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length

    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      'eventToProfiles'
    )
    info.partial = !isItInTheCache

    // let hasMore = true
    const results: string[] = []
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'eventToProfiles') as string[]
      // const _hasMore = cache.resolve(key, 'hasMore')

      // if (!_hasMore) {
      //   hasMore = _hasMore as boolean
      // }
      results.push(...data)
    })

    return {
      __typename: 'filteredProfilesPagination',
      eventToProfiles: results,
    }
  }
}

const CommunitiesResolver = (mergeMode = 'after'): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length

    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      'communities'
    )
    info.partial = !isItInTheCache

    const results: string[] = []
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, 'communities') as string[]

      results.push(...data)
    })

    return {
      __typename: 'Communities',
      communities: results,
    }
  }
}

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts')
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {})
  })
}

function invalidateAllEvents(cache: Cache) {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'events')
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'events', fi.arguments || {})
  })
}

const transformToDate = (parent, _args, _cache, info) =>
  new Date(parent[info.fieldName])

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = ''

  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie
  }

  return {
    url: 'http://localhost:4020/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
          PaginatedEvents: () => null,
          FilteredProfiles: (data) => data.uuid,
          User: (data) => data.uuid,
          Profile: (data) => data.uuid,
          Friend: (data) => data.uuid,
          FriendshipRequest: (data) => data.uuid,
        },
        resolvers: {
          Query: {
            posts: postsCursorPagination(),
            events: eventsCursorPagination(),
            eventToProfiles: filteredProfilesPagination(),
            communities: {
              description: '00009',
            },
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: 'Post',
                id: (args as DeletePostMutationVariables).id,
              })
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              )

              if (data) {
                if (data.voteStatus === value) {
                  return
                }
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value

                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any
                )
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache)
              // const allFields = cache.inspectFields('Query')
              // const fieldInfos = allFields.filter(
              //   (info) => info.fieldName === 'posts'
              // )
              // fieldInfos.forEach((fieldInfo) => {
              //   console.log('start')
              //   console.log(cache.inspectFields('Query'))
              //   cache.invalidate('Query', 'posts', fieldInfo.arguments)
              //   console.log(cache.inspectFields('Query'))
              //   console.log('end')
              // })
            },
            createEvent: (_result, args, cache, info) => {
              invalidateAllEvents(cache)
            },
            // createCommunity: (_result, args, cache, info) => {
            //   invalidateAllEvents(cache)
            // },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      me: result.login.user,
                    }
                  }
                }
              )
              invalidateAllPosts(cache)
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return {
                      me: result.register.user,
                    }
                  }
                }
              )
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
}
