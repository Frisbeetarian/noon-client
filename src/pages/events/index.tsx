import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { Layout } from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import CreateEvent from './create-event'
import { useEventsQuery, useJoinEventMutation } from '../../generated/graphql'
// import {} from '../../generated/graphql'
import { UpdootSection } from '../../components/UpdootSection'
import NextLink from 'next/link'

const Events = ({}) => {
  // const [{ data, error, fetching }] = useGetPostFromUrl()
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })

  const [{ data, error, fetching }] = useEventsQuery({
    variables,
  })

  const [, joinEvent] = useJoinEventMutation()

  if (data?.events) console.log('data.events', data.events)

  if (!fetching && !data) {
    return (
      <div>
        <div>query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data?.events) {
    return (
      <Layout>
        <CreateEvent className="w-full"></CreateEvent>

        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Button>Create Event</Button>

      {/*<Flex className="bg-orange-500 w-full">*/}
      <CreateEvent className="w-full"></CreateEvent>
      {/*</Flex>*/}

      {/*<Heading mb={4}>{data.post.title}</Heading>*/}
      {/*{data.post.text}*/}

      {/*<EditDeletePostButtons*/}
      {/*  id={data.post.id}*/}
      {/*  creatorId={data.post.creator.id}*/}
      {/*/>*/}

      {fetching && !data ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {data!.events.events.map((e) =>
            !e ? null : (
              <Flex
                className="w-full text-white border-error"
                key={e.id}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                {/*<UpdootSection post={e} />*/}

                <Box className="w-full" flex={1}>
                  <NextLink href="/events/[id]" as={`/events/${e.id}`}>
                    <Link className="prose">
                      <Heading fontSize="xl">{e.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text className="prose">
                    Created by: {e.creator.username}
                  </Text>

                  <Flex align="center">
                    <Text flex={1} mt={4} className="prose">
                      {e.description}
                    </Text>

                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={e.id}
                        creatorId={e.creator.id}
                      />

                      <Button
                        onClick={() => {
                          joinEvent({ profileId: 1, eventId: e.id })
                        }}
                      >
                        join event
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Events)
