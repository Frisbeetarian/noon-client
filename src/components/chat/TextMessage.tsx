import React from 'react'
import { Flex } from '@chakra-ui/react'

const TextMessage = ({ content, isMine, isDeleted }) => (
  <Flex
    bg={isMine ? 'black' : 'gray.100'}
    color={isMine ? 'white' : 'black'}
    minW="100px"
    maxW="350px"
    my="1"
    p="3"
    className="relative justify-between"
  >
    <p>{!isDeleted ? content : <i className="text-gray-400">{content}</i>}</p>
  </Flex>
)

export default TextMessage
