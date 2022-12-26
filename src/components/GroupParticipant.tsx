import React, { useState } from 'react'

import { Flex } from '@chakra-ui/react'

import {  useDispatch } from 'react-redux'

// import { getLoggedInUser } from '../../store/users'
// import { getSocket } from '../../store/sockets'

import { addParticipants, removeParticipants } from '../store/groups'

const GroupParticipant = ({ participant }) => {
  // const dispatch = useDispatch()
  // const socket = useSelector(getSocket)
  const dispatch = useDispatch()

  // const [active, setActive] = useState(false)
  const [participantsColor, setParticipantsColor] = useState('')

  return (
    <Flex
      className="p-2 cursor:pointer hover:text-black text-white cursor-pointer"
      style={{ backgroundColor: participantsColor }}
      onClick={() => {
        if (participantsColor === '') {
          setParticipantsColor('green')
          dispatch(addParticipants(participant.uuid))
        } else {
          setParticipantsColor('')
          dispatch(removeParticipants(participant.uuid))
        }
      }}
    >
      {participant.username}
    </Flex>
  )
}

export default GroupParticipant
