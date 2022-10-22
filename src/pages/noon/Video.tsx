import React, { useEffect, useState } from 'react'
import { Avatar, Flex, Text, Image, Button } from '@chakra-ui/react'

import {
  getActiveConversation,
  getActiveConversee,
  getShouldPauseCheckHasMore,
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'

const Video = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)

  return (
    <Flex
      // overflowY="auto"
      flexDirection="column-reverse"
      className="w-full top-0 py-3 px-5 relative"
      style={{ height: '80vh' }}
    >
      video should be here
    </Flex>
  )
}

export default Video
