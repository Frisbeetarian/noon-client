import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'

import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { Layout } from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import CreateEvent from './create-community'

import {
  useCommunitiesQuery,
  useEventsQuery,
  useGetCommunitiesParticipantsQuery,
  useGetProfileByUserIdQuery,
  useGetProfilesQuery,
  useJoinCommunityMutation,
  useJoinEventMutation,
} from '../../generated/graphql'

// import {} from '../../generated/graphql'
import { UpdootSection } from '../../components/UpdootSection'
import NextLink from 'next/link'
import { isServer } from '../../utils/isServer'
import CreateCommunity from './create-community'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'

const Communities = ({}) => {
  const loggedInUser = useSelector(getLoggedInUser)
  console.log('LOGGED IN USER: ', loggedInUser)

  const [{ data, error, fetching }] = useCommunitiesQuery()
  // console.log('communities data: ', data?.communities)

  const [{ data: profileData, fetching: profileFetching }] =
    useGetProfileByUserIdQuery({
      variables: {
        userId: loggedInUser?.me?.id,
      },
    })

  const communitiesIds = []
  data?.communities.map((community) => {
    communitiesIds.push(community.id)
  })

  const [
    {
      data: communitiesParticipants,
      error: communitiesParticipantsError,
      loading: communitiesParticipantsFetching,
    },
  ] = useGetCommunitiesParticipantsQuery({
    variables: { communitiesIds: communitiesIds },
  })

  const setCommunities = []
  // const participants = []

  data?.communities.map(async (community) => {
    const participants =
      communitiesParticipants?.getCommunitiesParticipants.filter(
        (communityParticipant) =>
          communityParticipant.communityId === community.id
      )

    // participants.map(async (participant) => {
    //   if (participant.profileId === loggedInUser?.me.id) {
    //     alert('Fewfew')
    //     community.joined = true
    //   }
    // })

    community = { ...community, participants: participants }
    setCommunities.push(community)

    // console.log('community: ', community)
    // community.participants = participants

    // console.log('participants: ', participants)

    // if (communityIsJoined) {
    //   community.joined = true
    // } else {
    //   community.joined = false
    // }

    //   community.participants = participants
    //   // let entity = {
    //   //   id: community.id,
    //   //   title: community.title,
    //   //   participants: participants,
    //   //   creator: community.creator,
    //   //   description: community.description,
    //   //   startDate: community.startDate,
    //   //   endDate: community.endDate,
    //   //   privacy: community.privacy,
    //   //   timezone: community.timezone,
    //   //   updatedAt: community.updatedAt,
    //   //   createdAt: community.createdAt,
    //   // }
    // setCommunities.push(entity)
  })

  // console.log('COMMUNITIES: ', setCommunities)
  const [, joinCommunity] = useJoinCommunityMutation()

  if (!fetching && !data) {
    return (
      <div>
        <div>query failed for some reason</div>
        <div>{error}</div>
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

  if (!data?.communities) {
    return (
      <Layout>
        <CreateCommunity className="w-full"></CreateCommunity>

        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Button>Create Community</Button>

      {/*<Flex className="bg-orange-500 w-full">*/}
      <CreateCommunity className="w-full"></CreateCommunity>

      {/*</Flex>*/}
      {/*<Heading mb={4}>{data.post.title}</Heading>*/}
      {/*{data.post.text}*/}

      {/*<EditDeletePostButtons*/}
      {/*  id={data.post.id}*/}
      {/*  creatorId={data.post.creator.id}*/}
      {/*/>*/}

      {fetching && !setCommunities ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {setCommunities?.map((e) =>
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
                  <NextLink
                    href="/communities/[id]"
                    as={`/communities/${e.id}`}
                  >
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

                    <Stack className="" spacing={8}>
                      {e.participants?.map((p) =>
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

                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={e.id}
                        creatorId={e.creator.id}
                      />

                      <IconButton
                        onClick={async () => {
                          // await vote({
                          //   postId: post.id,
                          //   value: -1,
                          // })
                        }}
                        // colorScheme={w.voteStatus === -1 ? 'red' : undefined}
                        // isLoading={e.participants?.find(
                        //   (communityParticipant) =>
                        //     communityParticipant.profileId ===
                        //     profileData?.getProfileByUserId.id
                        // )}
                        aria-label="Search database"
                        icon={<ChevronDownIcon />}
                      />

                      {e.joined ? null : (
                        <Button
                          onClick={() => {
                            joinCommunity({ communityId: e.id })
                          }}
                        >
                          join community
                        </Button>
                      )}
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

export default withUrqlClient(createUrqlClient, { ssr: false })(Communities)
