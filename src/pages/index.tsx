import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { TypeAnimation } from 'react-type-animation'

// import { isServer } from '../utils/isServer'
import { withAxios } from '../utils/withAxios'
import { useGetMeQuery } from '../store/api/usersApiSlice'
import { setLoggedInUser } from '../store/users'
import { useDispatch } from 'react-redux'

interface IndexProps {
  axios: any
}

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
const Index: React.FC<IndexProps> = ({ axios }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: user, isLoading } = useGetMeQuery(undefined)

  useEffect(() => {
    if (!isLoading) {
      if (user?.username) {
        dispatch(setLoggedInUser(user))
        router.replace('/noon')
      } else {
        router.replace('/onboarding')
      }
    }
  }, [user, isLoading, router])

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

      <Flex className="flex-col justify-center items-center bg-black text-black h-screen">
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
