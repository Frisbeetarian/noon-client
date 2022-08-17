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
import React, { useEffect, useState } from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'

import { Layout } from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'

import {
  useCommunitiesQuery,
  useGetCommunitiesParticipantsQuery,
  useJoinCommunityMutation,
} from '../../generated/graphql'

import NextLink from 'next/link'
import CreateCommunity from './create-community'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCommunities,
  addCommunity,
  getCommunities,
} from '../../store/communities'
import SimpleSidebar from '../../components/Sidebar'

const Communities = ({}) => {
  const dispatch = useDispatch()

  const [{ data, error, fetching }] = useCommunitiesQuery()

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
  const communities = useSelector(getCommunities)

  useEffect(() => {
    if (data && communitiesParticipants) {
      data?.communities.map(async (community) => {
        const participants =
          communitiesParticipants?.getCommunitiesParticipants.filter(
            (communityParticipant) =>
              communityParticipant.communityId === community.id
          )

        community = { ...community, participants: participants }
        dispatch(addCommunity({ community: community }))
      })
    }
  }, [data, communitiesParticipants])

  useEffect(() => {}, [communities])

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

  function joinCommunityFunction(communityId: number) {
    console.log('logging')
    joinCommunity(communityId)
  }

  return (
    <Layout>
      {/*<Button>Create Community</Button>*/}
      <Box className="">
        <SimpleSidebar />
      </Box>

      {/*<Flex className="bg-orange-500 w-full">*/}
      <CreateCommunity className="w-full"></CreateCommunity>

      {/*</Flex>*/}
      {/*<Heading mb={4}>{data.post.title}</Heading>*/}
      {/*{data.post.text}*/}

      {/*<EditDeletePostButtons*/}
      {/*  id={data.post.id}*/}
      {/*  creatorId={data.post.creator.id}*/}
      {/*/>*/}

      {fetching &&
      !communities &&
      [...Object.values(communities)].length === 0 ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {[...Object.values(communities)].map((community, i) =>
            !community ? null : (
              <Flex
                className="w-full text-white border-error"
                key={i}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                {/*<UpdootSection post={e} />*/}

                <Box className="w-full" flex={1}>
                  <NextLink
                    href="/communities/[id]"
                    as={`/communities/${community.id}`}
                  >
                    <Link className="prose">
                      <Heading fontSize="xl">{community.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text className="prose">
                    Created by: {community.creator.username}
                  </Text>

                  <Flex align="center">
                    <Text flex={1} mt={4} className="prose">
                      {community.description}
                    </Text>

                    <Stack className="" spacing={8}>
                      {community.participants?.map((p) =>
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
                      {/*<EditDeletePostButtons*/}
                      {/*  id={e.id}*/}
                      {/*  creatorId={e.creator.id}*/}
                      {/*/>*/}

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

                      {community.joined ? null : (
                        <Button
                          onClick={() => {
                            joinCommunityFunction({
                              communityId: community.id,
                            })
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
