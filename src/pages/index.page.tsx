import { Flex } from '@chakra-ui/react'

import { withUrqlClient } from 'next-urql'

import React, { useEffect } from 'react'
import { createUrqlClient } from '../utils/createUrqlClient'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'

const IndexPage = () => {
  const router = useRouter()

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    requestPolicy: 'network-only',
  })

  useEffect(() => {
    if (data?.me?.username) {
      router.replace('/noon')
    } else {
      router.replace('/onboarding')
    }
  }, [data])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      {fetching && <p className="fixed top-12 text-5xl">Loading...</p>}
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(IndexPage)
