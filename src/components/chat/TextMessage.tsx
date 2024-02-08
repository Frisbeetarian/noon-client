import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const TextMessage = ({ content, isMine, isDeleted }) => (
  <Flex
    bg={isMine ? 'black' : 'gray.100'}
    color={isMine ? 'white' : 'black'}
    alignSelf={isMine ? 'flex-end' : 'flex-start'}
    justifyContent={isMine ? 'flex-end' : 'flex-start'}
    maxW="350px"
    my="1"
    p="3"
    className="relative"
  >
    <Text>
      {!isDeleted ? content : <i className="text-gray-400">{content}</i>}
    </Text>
  </Flex>
)

export default TextMessage
