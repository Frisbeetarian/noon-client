import { Flex } from '@chakra-ui/react'

import React, { useEffect } from 'react'

import { useMeQuery } from '../generated/graphql'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withApollo } from '../utils/withApollo'
// import Head from 'next/head'

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
    <>
      {/*<Head>*/}
      {/*  <title>{meta.title}</title>*/}
      {/*  <meta name="robots" content="follow, index" />*/}
      {/*  <meta content={meta.description} name="description" />*/}
      {/*  <meta property="og:url" content={`https://noon.tube${router.asPath}`} />*/}
      {/*  <link rel="canonical" href={`https://noon.tube${router.asPath}`} />*/}
      {/*  <meta property="og:type" content={meta.type} />*/}
      {/*  <meta property="og:site_name" content="Noon" />*/}
      {/*  <meta property="og:description" content={meta.description} />*/}
      {/*  <meta property="og:title" content={meta.title} />*/}
      {/*  <meta property="og:image" content={meta.image} />*/}
      {/*</Head>*/}

      <Flex className="flex-col justify-center items-center bg-black text-white h-screen">
        {loading && <p className="fixed top-12 text-5xl">Loading...</p>}
      </Flex>
    </>
  )
}
export default withApollo({ ssr: true })(Index)
