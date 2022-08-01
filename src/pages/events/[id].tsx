import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
// import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { Layout } from '../../components/Layout'
import {
  useGetProfilesQuery,
  usePostQuery,
  usePostsQuery,
} from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetEventFromUrl } from '../../utils/useGetEventFromUrl'
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl'
import { UpdootSection } from '../../components/UpdootSection'

const Event = ({}) => {
  const [{ data, error, fetching }] = useGetEventFromUrl()
  // const [, eventToProfiles] = useGetProfilesQuery({
  //   variables: { id: 13 },
  // })
  // console.log('data: ', data.event.id)

  const [
    {
      data: eventParticipants,
      error: eventParticipantsError,
      fetching: eventParticipantsFetching,
    },
  ] = useGetProfilesQuery({
    variables: { id: data?.event?.id },
  })

  // return usePostQuery({
  //   pause: intId === -1,
  //   variables: {
  //     id: intId,
  //   },
  // })
  // const [{ data, error, fetching }] = useGetProfilesQuery({
  //   variables,
  // })

  console.log('eventToProfiles: ', eventParticipants)

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

  if (!data?.event) {
    return (
      <Layout>
        <Box>could not find event</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading mb={4}>{data.event.title}</Heading>
      {data.event.description}

      <Box className="w-1/3 ml-auto">
        Participants
        {eventParticipantsFetching && !eventParticipants ? (
          <div>...loading</div>
        ) : (
          <Stack className="" spacing={8}>
            {eventParticipants!.getProfiles.map((p) =>
              !p ? null : (
                <Flex
                  className="w-full text-white border-error"
                  key={p.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                >
                  {p.participantUsername}
                </Flex>
              )
            )}
          </Stack>
        )}
      </Box>
      {/*<EditDeleteEventButtons*/}
      {/*  id={data.event.id}*/}
      {/*  creatorId={data.event.creator.id}*/}
      {/*/>*/}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Event)
