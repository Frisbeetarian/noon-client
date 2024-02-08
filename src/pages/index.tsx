import { Flex } from '@chakra-ui/react'
import Reactfrom 'react'
import Head from 'next/head'
import { TypeAnimation } from 'react-type-animation'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
const Index = () => {
  const generateRandomSequence = (): (string | number)[] => [
    'N',
    randomWait(),
    'NO',
    randomWait(),
    'NOO',
    randomWait(),
    'NOON',
    2000,
  ]

  const randomWait = (): number =>
    Math.floor(Math.random() * (1250 - 300 + 1)) + 300

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>

      <Flex className="flex-col justify-center items-center bg-black text-black h-screen">
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
      </Flex>
    </>
  )
}
export default Index
