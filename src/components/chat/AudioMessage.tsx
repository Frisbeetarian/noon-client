import React from 'react'
import { Flex } from '@chakra-ui/react'
import ReactAudioPlayer from 'react-audio-player'

const AudioMessage = ({ src, isDeleted }) => (
  <Flex
    className="relative"
    minW="100px"
    maxW="350px"
    my="1"
    p="0"
    bg={isDeleted ? 'gray.100' : 'transparent'}
  >
    {!isDeleted ? (
      <ReactAudioPlayer src={src} controls />
    ) : (
      <p>
        <i className="text-gray-400">Audio message deleted</i>
      </p>
    )}
  </Flex>
)

export default AudioMessage
