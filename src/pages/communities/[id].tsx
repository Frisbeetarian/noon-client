import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'

import React from 'react'
import { Layout } from '../../components/Layout'

import { useGetCommunityParticipantsQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

import { useGetCommunityFromUrl } from '../../utils/useGetCommunityFromUrl'
import { useGetIntId } from '../../utils/useGetIntId'

const Community = ({}) => {
  const [{ data, error, fetching }] = useGetCommunityFromUrl()

  const [
    {
      data: communityParticipants,
      error: communityParticipantsError,
      fetching: communityParticipantsFetching,
    },
  ] = useGetCommunityParticipantsQuery({
    variables: { id: data?.community?.id },
  })

  console.log('communityToProfiles: ', communityParticipants)

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

  if (!data?.community) {
    return (
      <Layout>
        <Box>could not find community</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading mb={4}>{data.community.title}</Heading>
      {data.community.description}

      <Box className="w-1/3 ml-auto">
        Participants
        {communityParticipantsFetching && !communityParticipants ? (
          <div>...loading</div>
        ) : (
          <Stack className="" spacing={8}>
            {communityParticipants?.getCommunityParticipants.map((p) =>
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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Community)
