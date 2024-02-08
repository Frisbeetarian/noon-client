import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

const ImageMessage = ({ src, alt, isDeleted }) => (
  <Flex
    className="relative"
    minW="100px"
    maxW="350px"
    my="1"
    p="0"
    bg={isDeleted ? 'gray.100' : 'transparent'}
  >
    {!isDeleted ? (
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      </div>
    ) : (
      <p>
        <i className="text-gray-400">{alt}</i>
      </p>
    )}
  </Flex>
)

export default ImageMessage
