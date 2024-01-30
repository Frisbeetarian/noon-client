import { Flex } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withAxios } from '../utils/withAxios'
// import Head from 'next/head'

const Index = ({ axios }) => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // const { data, loading } = useMeQuery({
  //   skip: isServer(),
  //   fetchPolicy: 'network-only',
  // })

  useEffect(() => {
    if (!isServer()) {
      axios
        .get('/api/users/me')
        .then((response) => {
          setUserData(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
          setLoading(false)
          // Handle error (e.g., redirect to login if unauthorized)
        })
    } else {
      setLoading(false)
    }
  }, [axios])

  useEffect(() => {
    console.log('user data:', userData)

    if (!loading) {
      // @ts-ignore
      if (userData?.username) {
        router.replace('/noon')
      } else {
        router.replace('/onboarding')
      }
    }
  }, [userData, loading, router])

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

      <Flex className="flex-col justify-center items-center bg-red-500 text-black h-screen">
        {loading && <p className="fixed top-12 text-5xl">Loading...</p>}
      </Flex>
    </>
  )
}
export default withAxios(Index)
