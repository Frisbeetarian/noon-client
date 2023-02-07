import { Flex } from '@chakra-ui/react'

import React, { useEffect } from 'react'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withApollo } from '../utils/withApollo'

const Index = () => {
  const router = useRouter()

  const { data, loading } = useMeQuery({
    skip: isServer(),
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!loading) {
      if (data?.me?.username) {
        router.replace('/noon')
      } else {
        router.replace('/onboarding')
      }
    }
  }, [data, loading])

  return (
    <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
      {loading && <p className="fixed top-12 text-5xl">Loading...</p>}
    </Flex>
  )
}
export default withApollo({ ssr: true })(Index)
