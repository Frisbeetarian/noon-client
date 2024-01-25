import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'

import { getSocketConnected } from '../../store/sockets'

export default function SocketConnector() {
  const socketConnected = useSelector(getSocketConnected)

  return (
    <Box className="flex mt-0.5">
      {socketConnected ? (
        <div className="w-2 h-2 bg-green-500 rounded ml-2"></div>
      ) : (
        <div className="w-2 h-2 bg-red-500 rounded ml-2"></div>
      )}
    </Box>
  )
}
