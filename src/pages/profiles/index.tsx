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

import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetProfilesQuery } from '../../generated/graphql'
import CreateCommunity from '../communities/create-community'
import NextLink from 'next/link'

const Profiles = ({}) => {
  const dispatch = useDispatch()
  const [{ data, error, fetching }] = useGetProfilesQuery()

  console.log('profiles: ', data?.getProfiles)

  useEffect(() => {
    // dispatch(loadBugs())
  }, [])

  // console.log('BUGS: ', bugs)

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

  if (!data?.getProfiles) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <header>Profiles Page</header>

      {fetching && !data?.getProfiles ? (
        <div>...loading</div>
      ) : (
        <Stack className="mt-8" spacing={8}>
          {data?.getProfiles.map((profile, i) =>
            !profile ? null : (
              <Flex
                className="w-full text-white border-error"
                key={i}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Box className="w-full" flex={1}>
                  <NextLink
                    href="/profiles/[id]"
                    as={`/profiles/${profile.id}`}
                  >
                    <Link className="prose">
                      <Heading fontSize="xl">{profile.username}</Heading>
                    </Link>
                  </NextLink>
                </Box>

                <Box>
                  <Button>Send friend request</Button>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  )
}

// export default Profiles
export default withUrqlClient(createUrqlClient, { ssr: false })(Profiles)
