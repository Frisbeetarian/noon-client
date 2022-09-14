import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { Layout } from '../../components/Layout'

import { UpdootSection } from '../../components/UpdootSection'
import {
  usePostsQuery,
  useSearchForProfileByUuidQuery,
} from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

// import { isServer } from '../utils/isServer'
import ClientComponent from '../components/SocketIo/Client'
import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'

const Posts = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  })
  const loggedInUser = useSelector(getLoggedInUser)

  const [{ data: searchResults }] = useSearchForProfileByUuidQuery({
    variables: {
      profileUuid: loggedInUser.user?.profile?.uuid,
    },
  })

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  // useTestQueryQuery()

  // useEffect(() => {}, [])

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {/*<ClientComponent />*/}

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
                        creatorId={p.creator.uuid}
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

export default withUrqlClient(createUrqlClient, { ssr: false })(Posts)