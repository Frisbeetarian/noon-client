import { Flex } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { isServer } from '../utils/isServer'
import { withAxios } from '../utils/withAxios'
import Head from 'next/head'
import { TypeAnimation } from 'react-type-animation'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
const Index = ({ axios }) => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // const { data, loading } = useMeQuery({
  //   skip: isServe(),
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
          // Handle error (e.g., redirect to login if unauthoried)
        })
    } else {
      setLoading(false)
    }
  }, [axios])

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      if (userData?.username) {
        router.replace('/noon')
      } else {
        router.replace('/onboarding')
      }
    }
  }, [userData, loading, router])

  const generateRandomSequence = () => {
    const sequence = [
      'N',
      randomWait(),
      'NO',
      randomWait(),
      'NOO',
      randomWait(),
      'NOON',
      2000,
    ]
    return sequence
  }

  const randomWait = () => Math.floor(Math.random() * (1250 - 300 + 1)) + 300

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>

      <Flex className="flex-col justify-center items-center bg-red-500 text-black h-screen">
        {/*{loading && <p className="fixed top-12 text-5xl">Loading...</p>}*/}

        {loading && (
          <p className="fixed top-12 text-4xl text-red-500 leading-tight">
            <TypeAnimation
              sequence={generateRandomSequence()}
              wrapper="span"
              speed={50}
              style={{
                fontSize: '1.5em',
                display: 'inline-block',
                whiteSpace: 'pre-line',
              }}
              repeat={Infinity}
            />
          </p>
        )}
      </Flex>
    </>
  )
}
export default withAxios(Index)
