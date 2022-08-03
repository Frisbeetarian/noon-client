import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { EditDeletePostButtons } from '../components/EditDeletePostButtons'
import { Layout } from '../components/Layout'

import { UpdootSection } from '../components/UpdootSection'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
// import { isServer } from '../utils/isServer'
import ClientComponent from '../components/SocketIo/Client'

const Index = () => {
  const loggedInUser = useSelector(getLoggedInUser)
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  })

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          <ClientComponent />

          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />

                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>posted by {p.creator.username}</Text>

                  <Flex align="center">
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>

                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     // const response = await fetch(
//     //   `https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`
//     // )
//     // const { data } = await response.json()
//     // store.dispatch(addUser(`${data.first_name} ${data.last_name}`))
//     store.dispatch(addBug({ description: 'dewfewfew' }))
//   }
// )

// const response = await fetch

// const mapStateToProps = (state) => ({
//   bugs: state.entities.bugs.list,
// })

// const mapDispatchToProps = (dispatch) => ({
//   loadBugs: () => dispatch(loadBugs()),
// })

// connect(mapStateToProps, mapDispatchToProps)(Index)
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     // const { id } = params
//
//     await store.dispatch(loadBugs)
//
//     console.log('State on server', store.getState())
//
//     return {
//       props: {
//         // id,
//       },
//     }
//   }
// )

export default withUrqlClient(createUrqlClient, { ssr: false })(Index)
// export default Index
